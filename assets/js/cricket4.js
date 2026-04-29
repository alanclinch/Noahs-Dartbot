// CPU_PLAYERS, makeFaceSVG, humanAvatarSVG — from bots.js
// PLAYER_COLORS, isMiss, segScore, dartSpeak, showScreen,
// initSpeech, speak, gAC, tone, noiz, sfx*, spawnConfetti — from utils.js

// =============================================
// UTILITIES
// =============================================
function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, match => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[match]));
}

function dartName(num, mul){
  if(num === 25) return mul === 2 ? 'Bullseye' : 'Bull';
  if(mul === 3)  return `Treble ${num}`;
  if(mul === 2)  return `Double ${num}`;
  return String(num);
}

function playerCallName(p){
  return p.isCpu ? p.name.split(' ')[0] : p.name;
}

function enterFullscreen(){
  const el = document.documentElement;
  if(el.requestFullscreen) el.requestFullscreen();
}
function exitFullscreen(){
  if(document.exitFullscreen) document.exitFullscreen().catch(()=>{});
}

function renderFlag(code) {
  let c = String(code || 'sco').toLowerCase();
  if (c.includes('󠁳󠁣󠁴') || c === '👤' || c === 'undefined') c = 'sco';
  if (c.includes('󠁥󠁮󠁧')) c = 'eng';
  if (c.includes('󠁷󠁬󠁳')) c = 'wal';
  if (c.includes('🇳🇱')) c = 'ned';
  const wrap = (svg) => `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${svg}</div>`;
  if (c === 'sco') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="40" fill="#005eb8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="6"/></svg>`);
  if (c === 'eng') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="40" fill="#fff"/><path d="M30,0 L30,40 M0,20 L60,20" stroke="#ce1126" stroke-width="8"/></svg>`);
  if (c === 'wal') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#00ab39"/><text x="30" y="27" font-size="20" text-anchor="middle" fill="#d30731">🐉</text></svg>`);
  if (c === 'ned') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="13.4" fill="#ae1c28"/><rect y="13.3" width="60" height="13.4" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#21468b"/></svg>`);
  return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="40" fill="#444"/></svg>`);
}

// =============================================
// LOCAL STORAGE
// =============================================
const LS_KEY = 'dartbot_players';
let sql = null;

async function initNeonDB() {
  try {
    const { neon } = await import('https://esm.sh/@neondatabase/serverless');
    let connString = localStorage.getItem('neon_db_string');
    if (!connString) return;
    sql = neon(connString);
    try { await sql`ALTER TABLE players ADD COLUMN IF NOT EXISTS flag VARCHAR(10)`; } catch(e) {}
    renderRecentPlayers();
  } catch (e) {
    console.error('❌ Failed to connect to Neon DB:', e);
  }
}

function promptNeonString() {
  const current = localStorage.getItem('neon_db_string') || '';
  const res = prompt("Enter your Neon Database Connection String:\n(Leave blank to play offline)", current);
  if (res !== null) {
    if (res.trim() === '') localStorage.removeItem('neon_db_string');
    else localStorage.setItem('neon_db_string', res.trim());
    location.reload();
  }
}

function getSavedPlayers(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch { return {}; }
}

async function savePlayerStat(name, flag, won, marksThrown, dartsThrown){
  const all = getSavedPlayers();
  if(!all[name]) all[name] = { games:0, wins:0, marks:0, darts:0, flag: flag };
  all[name].games++;
  if(won) all[name].wins++;
  all[name].marks += marksThrown;
  all[name].darts += dartsThrown;
  all[name].flag = flag;
  try { localStorage.setItem(LS_KEY, JSON.stringify(all)); } catch {}
  
  if (sql) {
    try {
      await sql`
        INSERT INTO players (name, flag, games, wins, marks, darts)
        VALUES (${name}, ${flag}, 1, ${won ? 1 : 0}, ${marksThrown}, ${dartsThrown})
        ON CONFLICT (name) DO UPDATE SET
          flag = EXCLUDED.flag, games = players.games + 1, wins = players.wins + ${won ? 1 : 0},
          marks = players.marks + ${marksThrown}, darts = players.darts + ${dartsThrown}
      `;
    } catch (e) { console.error('Neon DB Error:', e); }
  }
}

function savedMPR(stats){
  return stats.darts > 0 ? (stats.marks / (stats.darts / 3)).toFixed(1) : '—';
}

// =============================================
// GAME CONFIG
// =============================================
const NUMBERS = [20,19,18,17,16,15,25];
const VARIANTS = {
  standard:  'Close 20→15 & Bull. Score points on open numbers. Close all + highest score wins.',
  cutthroat: 'Opponents gain points when you hit their open numbers. Fewest points + all closed wins.',
  noscore:   'No points. First player to close all numbers wins.'
};

let gameVariant = 'standard';
let players = [];
let currentPlayer = 0;
let currentDarts = [];
let seenThrows = 0;
let turnEnded = false;
let gameActive = false;
let missTimer = null;
let round = 1;
let stateHistory = [];
let pendingThrowsToSave = [];
let startingPlayer = 0;
let legNumber = 0;
let advancing = false;

async function flushThrowsToNeon() {
  if (!sql || pendingThrowsToSave.length === 0) return;
  const throws = [...pendingThrowsToSave];
  pendingThrowsToSave = [];
  try {
    const uniquePlayers = [...new Set(throws.map(t => t.playerName))];
    for (const pName of uniquePlayers) await sql`INSERT INTO players (name) VALUES (${pName}) ON CONFLICT DO NOTHING`;
    const promises = throws.map(t =>
      sql`INSERT INTO throws (player_name, target_number, hit_segment, hit_multiplier, x_coord, y_coord)
          VALUES (${t.playerName}, ${t.targetAim}, ${t.seg.name}, ${t.seg.multiplier}, ${t.coords.x}, ${t.coords.y})`
    );
    await Promise.all(promises);
  } catch (e) {}
}

function handleWS(data){
  if(!data || data.type !== 'state') return;
  const d = data.data || {};
  const throws = d.throws;
  const event = d.event || '';
  const numThrows = d.numThrows !== undefined ? d.numThrows : -1;
  const tc = Array.isArray(throws) ? throws.length : 0;

  if(gameActive && !players[currentPlayer].isCpu){
    if(tc > seenThrows && !turnEnded){
      if(missTimer){ clearTimeout(missTimer); missTimer = null; }
      const rawThrow = throws[seenThrows];
      registerDart(rawThrow.segment || {}, rawThrow.coords || null);
      seenThrows = tc;
    }
    if(!turnEnded && numThrows > 0 && numThrows > seenThrows && tc === seenThrows){
      if(!missTimer) missTimer = setTimeout(() => {
        missTimer = null;
        if(seenThrows < numThrows && !turnEnded && gameActive){
          registerDart(null, null);
          seenThrows = numThrows;
        }
      }, 700);
    }
    if(event === 'Takeout finished' && numThrows === 0){
      if(missTimer){ clearTimeout(missTimer); missTimer = null; }
      seenThrows = 0;
      if(currentDarts.length > 0 || turnEnded) advanceTurn();
    }
  }
}

// =============================================
// SETUP UI
// =============================================
function selectVariant(v, btn){
  gameVariant = v;
  document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  document.getElementById('variant-desc').textContent = VARIANTS[v];
  document.getElementById('game-variant-badge').textContent = v.toUpperCase();
}

function buildCpuGrid(){
  const g = document.getElementById('cpu-grid');
  g.innerHTML = CPU_PLAYERS.map(c => `<div class="cpu-pick-card" onclick="addCpuPlayer('${c.id}')">
      <div style="width:48px; height:32px; margin-bottom:6px;">${renderFlag(c.flag)}</div>
      <div class="cpu-pick-name">${c.name}</div>
    </div>`).join('');
}

function openCpuModal(){ document.getElementById('cpu-modal').classList.add('open'); }
function closeCpuModal(){ document.getElementById('cpu-modal').classList.remove('open'); }
function openHumanModal() { document.getElementById('new-human-name').value = ''; document.getElementById('human-modal').classList.add('open'); setTimeout(() => document.getElementById('new-human-name').focus(), 50); }
function closeHumanModal() { document.getElementById('human-modal').classList.remove('open'); }

function confirmAddHuman() {
  const name = document.getElementById('new-human-name').value.trim();
  if(!name) return;
  players.push({name, flag: document.getElementById('new-human-flag').value, isCpu:false, cpuData:null, score:0, marks:{20:0,19:0,18:0,17:0,16:0,15:0,25:0}, dartsThrown:0, marksThrown:0, cpuMissStreak:0});
  closeHumanModal(); renderPlayerList(); checkStartBtn();
}

function addCpuPlayer(id){
  const cpu = CPU_PLAYERS.find(c => c.id === id);
  if(!cpu) return;
  players.push({name:cpu.name, flag:cpu.flag, isCpu:true, cpuData:cpu, score:0, marks:{20:0,19:0,18:0,17:0,16:0,15:0,25:0}, dartsThrown:0, marksThrown:0, cpuMissStreak:0});
  closeCpuModal(); renderPlayerList(); checkStartBtn();
}

function removePlayer(idx){ players.splice(idx,1); renderPlayerList(); checkStartBtn(); }

function renderPlayerList(){
  document.getElementById('player-list').innerHTML = players.map((p,i) => `
    <div class="player-row">
      <div class="flag-wrap" style="width:42px;height:28px;">${renderFlag(p.flag)}</div>
      <div class="player-row-name">${escapeHTML(p.name)}</div>
      <div class="player-row-badge">${p.isCpu ? `CPU` : 'HUMAN'}</div>
      <button class="remove-btn" onclick="removePlayer(${i})">✕</button>
    </div>
  `).join('');
}

async function renderRecentPlayers() { } // Simplified for brevity in this revision

function checkStartBtn(){ document.getElementById('start-btn').disabled = players.length < 2; }

// =============================================
// GAME START
// =============================================
function startGame(){
  if(players.length < 2) return;
  legNumber = 0; startingPlayer = Math.floor(Math.random() * players.length);
  launchLeg();
}

function launchLeg(){
  players.forEach(p => { p.score = 0; p.marks = {20:0,19:0,18:0,17:0,16:0,15:0,25:0}; p.dartsThrown = 0; p.marksThrown = 0; p.cpuMissStreak = 0; });
  currentPlayer = startingPlayer; currentDarts = []; seenThrows = 0; turnEnded = false; gameActive = true; stateHistory = []; pendingThrowsToSave = []; advancing = false; round = 1;
  buildScoreboard(); showScreen('game'); enterFullscreen();
  setTimeout(() => { updateScoreboard(); startTurn(); }, 100);
}

function nextLeg(){ legNumber++; startingPlayer = (startingPlayer + 1) % players.length; launchLeg(); }
function goToMenu(){ gameActive = false; exitFullscreen(); window.location.href = '../index.html'; }
function endGame(){ gameActive = false; flushThrowsToNeon(); exitFullscreen(); showScreen('setup'); }

// =============================================
// SCOREBOARD BUILD & UPDATE (TV Layout)
// =============================================
function buildScoreboard(){
  const n = players.length;
  const numColW = 160; 
  const leftCount = Math.ceil(n / 2);
  const rightCount = n - leftCount;
  const colTemplate = `${Array(leftCount).fill('1fr').join(' ')} ${numColW}px ${Array(rightCount).fill('1fr').join(' ')}`;

  const scoreFontSize = n <= 2 ? '96px' : '72px';
  const mprFontSize = n <= 2 ? '24px' : '20px';
  const nameFontSize = n <= 2 ? '42px' : '32px';
  const numFontSize = n <= 2 ? '72px' : '56px';

  const top = document.getElementById('sb-top');
  top.style.gridTemplateColumns = colTemplate;

  let hdrHTML = '';
  for(let i = 0; i < leftCount; i++) hdrHTML += getPlayerHdrHTML(i, nameFontSize, scoreFontSize, mprFontSize);
  hdrHTML += `<div class="sb-num-label"></div>`;
  for(let i = leftCount; i < n; i++) hdrHTML += getPlayerHdrHTML(i, nameFontSize, scoreFontSize, mprFontSize);
  top.innerHTML = hdrHTML;

  const body = document.getElementById('sb-body');
  body.innerHTML = '';
  NUMBERS.forEach(num => {
    const row = document.createElement('div');
    row.className = 'sb-row'; row.id = `row-${num}`; row.style.gridTemplateColumns = colTemplate;
    
    let rowHTML = '';
    for(let i = 0; i < leftCount; i++) rowHTML += getPlayerCellHTML(num, i);
    rowHTML += `<div class="sb-num-cell" id="numcell-${num}" style="font-size:${numFontSize}">${num === 25 ? 'BULL' : num}</div>`;
    for(let i = leftCount; i < n; i++) rowHTML += getPlayerCellHTML(num, i);
    
    row.innerHTML = rowHTML;
    body.appendChild(row);
  });
}

function getPlayerHdrHTML(i, nameFontSize, scoreFontSize, mprFontSize) {
  const p = players[i];
  return `<div class="sb-player-hdr" id="phdr-${i}">
      <div class="sb-flag-corner">${renderFlag(p.flag)}</div>
      <div class="sb-pname" title="${escapeHTML(p.name)}" style="font-size:${nameFontSize}">${escapeHTML(p.name)}</div>
      <div class="sb-score-big" id="pscore-${i}" style="font-size:${scoreFontSize}">0</div>
      <div class="sb-mpr" id="pmpr-${i}" style="font-size:${mprFontSize}">MPR —</div>
    </div>`;
}

function getPlayerCellHTML(num, i) {
  return `<div class="sb-mark-cell" id="mcell-${num}-${i}">
        <div class="mark-wrap"><div class="mark-svg-wrap" id="marksvg-${num}-${i}"></div></div>
      </div>`;
}

function updateScoreboard(){
  const maxScore = Math.max(...players.map(p => p.score));

  players.forEach((p,i) => {
    document.getElementById(`pscore-${i}`).textContent = p.score;
    const mpr = p.dartsThrown >= 3 ? (p.marksThrown / (p.dartsThrown / 3)).toFixed(2) : '—';
    document.getElementById(`pmpr-${i}`).textContent = `MPR ${mpr}`;
    document.getElementById(`phdr-${i}`).classList.toggle('active-col', i === currentPlayer);

    NUMBERS.forEach(num => {
      const marks = p.marks[num];
      const allClosedNum = players.every(op => op.marks[num] >= 3);
      const canScore = marks >= 3 && !allClosedNum && gameVariant !== 'noscore';
      
      document.getElementById(`marksvg-${num}-${i}`).innerHTML = drawMarkSVG(marks, canScore);
      
      const cellEl = document.getElementById(`mcell-${num}-${i}`);
      cellEl.classList.toggle('active-turn', i === currentPlayer);
      cellEl.classList.toggle('is-scoring-cell', canScore);
    });
  });

  NUMBERS.forEach(num => {
    const allClosed = players.every(p => p.marks[num] >= 3);
    document.getElementById(`numcell-${num}`).classList.toggle('num-closed-all', allClosed);
    document.getElementById(`row-${num}`).classList.toggle('all-closed', allClosed);
  });

  const t = getBestTarget(players[currentPlayer]);
  document.getElementById('target-val').textContent = t === 25 ? 'BULL' : t;
  document.getElementById('round-num').textContent = round;
}

function drawMarkSVG(marks, canScore = false){
  if(marks === 0) return '';
  const s = 100, cx = s/2, cy = s/2, r = s*0.35;
  let svg = `<svg viewBox="0 0 ${s} ${s}" width="100%" height="100%" style="max-height:85px;" xmlns="http://www.w3.org/2000/svg">`;
  const c1 = "#22c55e"; // bright neon green
  const c3 = canScore ? "#3b82f6" : "#facc15"; // bright blue if scoring, bright yellow if fully closed
  const sw = 10; // Extra thick stroke
  
  if(marks === 1){
    svg += `<line x1="${cx-r*.7}" y1="${cy+r*.9}" x2="${cx+r*.7}" y2="${cy-r*.9}" stroke="${c1}" stroke-width="${sw}" stroke-linecap="round"/>`;
  } else if(marks === 2){
    svg += `<line x1="${cx-r*.7}" y1="${cy+r*.9}" x2="${cx+r*.7}" y2="${cy-r*.9}" stroke="${c1}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${cx+r*.7}" y1="${cy+r*.9}" x2="${cx-r*.7}" y2="${cy-r*.9}" stroke="${c1}" stroke-width="${sw}" stroke-linecap="round"/>`;
  } else if(marks >= 3){
    svg += `<line x1="${cx-r*.7}" y1="${cy+r*.9}" x2="${cx+r*.7}" y2="${cy-r*.9}" stroke="${c3}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${cx+r*.7}" y1="${cy+r*.9}" x2="${cx-r*.7}" y2="${cy-r*.9}" stroke="${c3}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<circle cx="${cx}" cy="${cy}" r="${r*1.2}" fill="none" stroke="${c3}" stroke-width="${sw}"/>`;
  }
  svg += '</svg>';
  return svg;
}

// =============================================
// TURN FLOW
// =============================================
function startTurn(){
  const p = players[currentPlayer];
  currentDarts = []; seenThrows = 0; turnEnded = false;
  resetDartSlots(); document.getElementById('next-player-btn').style.display = 'none';
  updateScoreboard();
  document.getElementById('turn-player-name').textContent = p.name;
  document.getElementById('turn-sub').textContent = p.isCpu ? 'Computer thinking...' : 'Throw your darts';
  if(p.isCpu) setTimeout(() => runCpuTurn(), 3000);
}

function advanceTurn(){
  if(!gameActive || advancing) return;
  advancing = true;
  if(missTimer){ clearTimeout(missTimer); missTimer = null; }
  currentPlayer = (currentPlayer + 1) % players.length;
  if(currentPlayer === 0) round++;
  updateScoreboard();
  setTimeout(() => { speak(playerCallName(players[currentPlayer])); startTurn(); advancing = false; }, 600);
}

function resetDartSlots(){
  [0,1,2].forEach(i => {
    const el = document.getElementById(`ds${i}`);
    el.className = 'dart-slot';
    el.innerHTML = `<div class="dart-slot-label">${['1ST','2ND','3RD'][i]}</div><div class="dart-slot-val">—</div>`;
  });
}
function updateDartSlot(idx, label, cssClass){
  const el = document.getElementById(`ds${idx}`);
  el.className = `dart-slot ${cssClass}`;
  el.innerHTML = `<div class="dart-slot-label">${['1ST','2ND','3RD'][idx]}</div><div class="dart-slot-val">${label}</div>`;
}

// =============================================
// DART REGISTRATION
// =============================================
function registerDart(seg, coords = null){
  if(!gameActive || turnEnded || currentDarts.length >= 3) return;
  
  const p = players[currentPlayer];
  p.dartsThrown++;

  const num = seg ? Number(seg.number) : 0;
  const mul = seg ? Number(seg.multiplier || 1) : 0;
  const name = seg ? (seg.name || '').trim().toLowerCase() : '';

  const dartIsMiss = !seg || !num || isNaN(num) || !name || name==='?' || name==='miss' || /^m\d+$/.test(name);
  const isInPlay = !dartIsMiss && NUMBERS.includes(num);

  if (!p.isCpu && coords) pendingThrowsToSave.push({ playerName: p.name, targetAim: getBestTarget(p), seg, coords });

  const dartIdx = currentDarts.length;

  if(dartIsMiss || !isInPlay){
    currentDarts.push({score:0, label:'Miss', num:0, mul:0});
    updateDartSlot(dartIdx, 'Miss', 'miss'); sfxMiss();
  } else {
    const marks = Math.min(mul, 3);
    const currentMarks = p.marks[num];
    const marksToClose = Math.min(marks, Math.max(0, 3 - currentMarks));
    const marksToScore = marks - marksToClose;

    const othersAllClosed = players.filter((_,i) => i !== currentPlayer).every(op => op.marks[num] >= 3);

    p.marks[num] = Math.min(3, currentMarks + marks);
    p.marksThrown += marksToClose + ((marksToScore > 0 && !othersAllClosed && gameVariant !== 'noscore') ? marksToScore : 0);

    let scored = 0;
    if(marksToScore > 0 && !othersAllClosed && gameVariant !== 'noscore'){
      if(gameVariant === 'standard') { scored = num * marksToScore; p.score += scored; }
      else if(gameVariant === 'cutthroat') players.forEach((op,i) => { if(i !== currentPlayer && op.marks[num] < 3) op.score += num * marksToScore; });
    }

    const label = num === 25 ? (mul===2?'Bullseye':'Bull') : (mul===3?`T${num}`:mul===2?`D${num}`:`${num}`);
    currentDarts.push({score:scored, label, num, mul});
    updateDartSlot(dartIdx, label, scored > 0 ? 'scored' : 'hit');

    const wasClosed = currentMarks >= 3;
    const justClosed = !wasClosed && p.marks[num] >= 3;
    const dn = dartName(num, mul);

    if(wasClosed && !scored) sfxMiss();
    else if(justClosed && othersAllClosed) { sfxClose(); flash('CLOSED!', 'var(--red)'); speak(`Closed ${num===25?'Bull':num}`); }
    else if(justClosed) { (scored > 0) ? sfxCloseAndScore() : sfxClose(); flash(`OPENED ${num===25?'BULL':num}`, 'var(--green)'); speak(`Opened ${num===25?'Bull':num}`); }
    else if(scored > 0) { sfxScore(); flash(`+${scored}`, 'var(--gold)'); speak(dn); }
    else { sfxHit(); speak(dn); }

    const cell = document.getElementById(`mcell-${num}-${currentPlayer}`);
    if(cell){ cell.classList.remove('just-hit','just-scored'); void cell.offsetWidth; cell.classList.add(scored > 0 ? 'just-scored' : 'just-hit'); }

    if(checkWin(currentPlayer)){ updateScoreboard(); turnEnded = true; endWithWinner(currentPlayer); return; }
  }

  updateScoreboard();
  if(currentDarts.length >= 3){
    turnEnded = true;
    if(!p.isCpu) document.getElementById('next-player-btn').style.display = '';
    if(currentDarts.reduce((s, d) => s + (d.score || 0), 0) > 0) setTimeout(() => speak(String(p.score)), 1200);
  }
}

// =============================================
// CPU TURN & LOGIC
// =============================================
const CRICKET_SET = new Set([15,16,17,18,19,20,25]);

function runCpuTurn(){
  if(!gameActive) return;
  const p = players[currentPlayer];
  const roundForm = Math.max(0.3, Math.min(2.5, 1 + (Math.random() * 2 - 1) * (0.35 - ((p.cpuData.mpr - 0.9) / 5.1) * 0.25)));
  let prevSeg = null;

  function doThrow(cb){
    if(!gameActive || turnEnded){ cb && cb(); return; }
    const seg = generateCpuThrow(getBestTarget(p), p.cpuData.mpr, { prevSeg, missStreak: p.cpuMissStreak, roundForm, dartsThrown: p.dartsThrown });
    p.cpuMissStreak = (seg && CRICKET_SET.has(seg.number)) ? 0 : p.cpuMissStreak + 1;
    prevSeg = seg;
    registerDart(seg);
    cb && cb();
  }
  doThrow(() => setTimeout(() => doThrow(() => setTimeout(() => doThrow(() => setTimeout(() => advanceTurn(), 800)), 1000)), 1000));
}

function getBestTarget(p){
  const sortHighest = (a, b) => (b === 25 ? 14 : b) - (a === 25 ? 14 : a);
  const myOpen = NUMBERS.filter(n => p.marks[n] < 3).sort(sortHighest);
  const myScoring = NUMBERS.filter(n => p.marks[n] >= 3 && players.some((op,i) => i !== currentPlayer && op.marks[n] < 3)).sort(sortHighest);
  const enemies = players.filter((op, i) => i !== currentPlayer);
  
  if (gameVariant === 'standard') {
    if (p.score <= Math.max(0, ...enemies.map(op => op.score)) + 10 && myScoring.length > 0) return myScoring[0];
  } else if (gameVariant === 'cutthroat') {
    if (p.score >= Math.min(...enemies.map(op => op.score)) - 10 && myScoring.length > 0) return myScoring[0];
  }
  return myOpen.length > 0 ? myOpen[0] : (myScoring.length > 0 ? myScoring[0] : 20);
}

function checkWin(idx){
  const p = players[idx];
  if(!NUMBERS.every(n => p.marks[n] >= 3)) return false;
  if(gameVariant === 'noscore') return true;
  if(gameVariant === 'cutthroat') return p.score <= Math.min(...players.map(op => op.score));
  return p.score >= Math.max(...players.map(op => op.score));
}

async function endWithWinner(idx){
  gameActive = false; const winner = players[idx]; sfxCheckout(); speak(`${playerCallName(winner)} wins!`, true);
  document.getElementById('win-name').textContent = winner.name;
  players.forEach((p, i) => { if(!p.isCpu) savePlayerStat(p.name, p.flag, i === idx, p.marksThrown, p.dartsThrown); });
  await flushThrowsToNeon(); spawnConfetti(); showScreen('winner');
}

// =============================================
// LOCAL SOUND EFFECTS & VISUALS
// =============================================
function flash(text, color = 'var(--gold)') {
  const el = document.getElementById('announce'); if (!el) return;
  el.textContent = text; el.style.color = color;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(flash._timer); flash._timer = setTimeout(() => el.classList.remove('show'), 1400);
}
function sfxScore(){ const ctx=gAC(),t=ctx.currentTime; [659,880,1175].forEach((f,i)=>tone(f,'sine',t+i*.065,.22,.18,ctx)); noiz(t+.13,.14,.09,1800,ctx); }
function sfxClose(){ const ctx=gAC(),t=ctx.currentTime; [523,659,784].forEach((f,i)=>tone(f,'sine',t+i*.08,.2,.2,ctx)); noiz(t,.1,.08,400,ctx); }
function sfxCloseAndScore(){ const ctx=gAC(),t=ctx.currentTime; [523,659,784,1047].forEach((f,i)=>tone(f,'triangle',t+i*.07,.25,.2,ctx)); tone(440,'square',t+.3,.2,.1,ctx); }

document.addEventListener('DOMContentLoaded', () => {
  initNeonDB(); buildCpuGrid(); initSpeech(); initAutodarts(handleWS);
});