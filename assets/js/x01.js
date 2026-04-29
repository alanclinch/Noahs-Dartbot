// CPU_PLAYERS, makeFaceSVG, humanAvatarSVG, generateCpuThrow — from bots.js
// PLAYER_COLORS, isMiss, segScore, dartSpeak, showScreen,
// initSpeech, speak, gAC, tone, noiz, sfx*, spawnConfetti — from utils.js

// =============================================
// UTILITIES
// =============================================
function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, match => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[match]));
}

function playerCallName(p){
  return p.isCpu ? p.name.split(' ')[0] : p.name;
}

function enterFullscreen(){
  const el = document.documentElement;
  if(el.requestFullscreen) el.requestFullscreen();
  else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if(el.mozRequestFullScreen) el.mozRequestFullScreen();
}
function exitFullscreen(){
  if(document.exitFullscreen) document.exitFullscreen().catch(()=>{});
  else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
}

function renderFlag(code) {
  let c = String(code || 'sco').toLowerCase();
  if (c.includes('󠁳󠁣󠁴') || c === '👤' || c === 'undefined') c = 'sco';
  if (c.includes('󠁥󠁮󠁧')) c = 'eng';
  if (c.includes('󠁷󠁬󠁳')) c = 'wal';
  if (c.includes('🇳🇱')) c = 'ned';
  const wrap = (svg) => `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${svg}</div>`;
  if (c === 'sco') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;box-shadow:0 0 4px rgba(0,0,0,0.5);"><rect width="60" height="40" fill="#005eb8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="6"/></svg>`);
  if (c === 'eng') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;box-shadow:0 0 4px rgba(0,0,0,0.5);"><rect width="60" height="40" fill="#fff"/><path d="M30,0 L30,40 M0,20 L60,20" stroke="#ce1126" stroke-width="8"/></svg>`);
  if (c === 'wal') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;box-shadow:0 0 4px rgba(0,0,0,0.5);"><rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#00ab39"/><text x="30" y="27" font-size="20" text-anchor="middle" fill="#d30731">🐉</text></svg>`);
  if (c === 'ned') return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;box-shadow:0 0 4px rgba(0,0,0,0.5);"><rect width="60" height="13.4" fill="#ae1c28"/><rect y="13.3" width="60" height="13.4" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#21468b"/></svg>`);
  return wrap(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;box-shadow:0 0 4px rgba(0,0,0,0.5);"><rect width="60" height="40" fill="#444"/></svg>`);
}

// =============================================
// DATABASE & PLAYER STATS
// =============================================
const LS_KEY = 'dartbot_players_x01';
let sql = null;

async function initNeonDB() {
  try {
    const { neon } = await import('https://esm.sh/@neondatabase/serverless');
    let connString = localStorage.getItem('neon_db_string');
    if (!connString) {
      console.warn('Neon DB disabled: No connection string provided.');
      return;
    }
    sql = neon(connString);
    console.log('✅ Connected to Neon PostgreSQL Database for X01!');
    try { await sql`ALTER TABLE players_x01 ADD COLUMN IF NOT EXISTS flag VARCHAR(10)`; } catch(e) {}
    renderRecentPlayers();
  } catch (e) {
    console.error('❌ Failed to connect to Neon DB:', e);
  }
}

function promptNeonString() {
  const current = localStorage.getItem('neon_db_string') || '';
  const res = prompt("Enter your Neon Database Connection String:\n(Leave blank to play offline)", current);
  if (res !== null) {
    if (res.trim() === '') {
      localStorage.removeItem('neon_db_string');
      alert("Database connection disabled. Playing offline.");
    } else {
      localStorage.setItem('neon_db_string', res.trim());
      alert("Database connection saved! Reloading to connect...");
    }
    location.reload();
  }
}

function getSavedPlayers(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
  catch { return {}; }
}

async function savePlayerStat(p, won){
  const name = p.name;
  const flag = p.flag;
  const darts = p.dartsThrown;
  const score = p.startScore;

  // LocalStorage fallback
  const all = getSavedPlayers();
  if(!all[name]) all[name] = { games:0, wins:0, darts:0, best_leg:99, flag: flag };
  all[name].games++;
  all[name].darts += darts;
  if(won) {
    all[name].wins++;
    all[name].best_leg = Math.min(all[name].best_leg, darts);
  }
  all[name].flag = flag;
  try { localStorage.setItem(LS_KEY, JSON.stringify(all)); } catch {}

  // Sync to Neon DB
  if (sql) {
    try {
      await sql`
        INSERT INTO players_x01 (name, flag, games, wins, darts, best_leg)
        VALUES (${name}, ${flag}, 1, ${won ? 1 : 0}, ${darts}, ${won ? darts : 99})
        ON CONFLICT (name) DO UPDATE SET
          flag = EXCLUDED.flag,
          games = players_x01.games + 1,
          wins = players_x01.wins + ${won ? 1 : 0},
          darts = players_x01.darts + ${darts},
          best_leg = LEAST(players_x01.best_leg, ${won ? darts : 99})
      `;
    } catch (e) { console.error('Neon DB Error (Players):', e); }
  }
}

// =============================================
// GAME CONFIG & STATE
// =============================================
let gameVariant = 501;
let checkoutMode = 'double';
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
let throwLog = [];
let startingPlayer = 0;
let legNumber = 0;

async function flushThrowsToNeon() {
  if (!sql || pendingThrowsToSave.length === 0) return;
  const throws = [...pendingThrowsToSave];
  pendingThrowsToSave = [];
  try {
    const uniquePlayers = [...new Set(throws.map(t => t.playerName))];
    for (const pName of uniquePlayers) {
      await sql`INSERT INTO players (name) VALUES (${pName}) ON CONFLICT DO NOTHING`;
    }
    const promises = throws.map(t =>
      sql`INSERT INTO throws (player_name, target_number, hit_segment, hit_multiplier, x_coord, y_coord)
          VALUES (${t.playerName}, ${t.targetAim}, ${t.seg.name}, ${t.seg.multiplier}, ${t.coords.x}, ${t.coords.y})`
    );
    await Promise.all(promises);
    console.log(`✅ Synced ${throws.length} throws to Neon DB.`);
  } catch (e) { console.error('Neon DB Error (Batch Throws):', e); }
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
      throwLog.push(throws[seenThrows]);
      if(missTimer){ clearTimeout(missTimer); missTimer = null; }
      const rawThrow = throws[seenThrows];
      const seg = rawThrow.segment || {};
      const coords = rawThrow.coords || null;
      registerDart(seg, coords);
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

// DEBUG LOGGER
// =============================================
function showLog() {
  const m = document.getElementById('log-modal');
  const o = document.getElementById('log-output');
  if (m && o) { o.value = JSON.stringify(throwLog, null, 2); m.style.display = 'flex'; }
}
function closeLog() {
  const m = document.getElementById('log-modal');
  if (m) m.style.display = 'none';
}
function copyLog() {
  const o = document.getElementById('log-output');
  if (o) { o.select(); document.execCommand('copy'); alert('Copied ' + throwLog.length + ' throws to clipboard!'); }
}

// =============================================
// SETUP UI
// =============================================
function selectVariant(v, btn){
  gameVariant = v;
  document.querySelectorAll('.variant-btn[data-v]').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  updateVariantDesc();
}

function selectCheckout(co, btn){
  checkoutMode = co;
  document.querySelectorAll('.variant-btn[data-co]').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  updateVariantDesc();
}

function updateVariantDesc() {
  const desc = `Score from ${gameVariant} to 0. ${checkoutMode === 'double' ? 'Finish by hitting a double.' : 'Finish on any number.'}`;
  document.getElementById('variant-desc').textContent = desc;
  document.getElementById('game-variant-badge').textContent = `${gameVariant} ${checkoutMode.toUpperCase()} OUT`;
}

function buildCpuGrid(){
  const g = document.getElementById('cpu-grid');
  g.innerHTML = CPU_PLAYERS.map(c => {
    const barW = Math.round((c.mpr / 6.5) * 100);
    return `<div class="cpu-pick-card" onclick="addCpuPlayer('${c.id}')">
      <div style="width:48px; height:32px; margin-bottom:6px;">${renderFlag(c.flag)}</div>
      <div class="cpu-pick-name">${c.name}</div>
      <div class="cpu-pick-mpr">MPR ${c.mpr.toFixed(1)}</div>
      <div class="cpu-mpr-bar"><div class="cpu-mpr-fill" style="width:${barW}%"></div></div>
    </div>`;
  }).join('');
}

function openCpuModal(){
  if(players.length >= 4) return;
  document.getElementById('cpu-modal').classList.add('open');
}
function closeCpuModal(){
  document.getElementById('cpu-modal').classList.remove('open');
}

function openHumanModal() {
  if(players.length >= 4) return;
  document.getElementById('new-human-name').value = '';
  document.getElementById('human-modal').classList.add('open');
  setTimeout(() => document.getElementById('new-human-name').focus(), 50);
}
function closeHumanModal() {
  document.getElementById('human-modal').classList.remove('open');
}

function createPlayerObject(name, flag, isCpu, cpuData) {
    const color = PLAYER_COLORS[players.length % 6];
    return {
        name, flag, color, isCpu, cpuData,
        startScore: gameVariant,
        score: gameVariant,
        dartsThrown: 0,
        turnHistory: [],
        turnScoreStart: gameVariant,
        cpuMissStreak: 0,
    };
}

function confirmAddHuman() {
  const name = document.getElementById('new-human-name').value.trim();
  if(!name) { alert('Please enter a name'); return; }
  const flag = document.getElementById('new-human-flag').value;
  players.push(createPlayerObject(name, flag, false, null));
  closeHumanModal();
  renderPlayerList();
  checkStartBtn();
}

function addCpuPlayer(id){
  if(players.length >= 4) return;
  const cpu = CPU_PLAYERS.find(c => c.id === id);
  if(!cpu) return;
  players.push(createPlayerObject(cpu.name, cpu.flag, true, cpu));
  closeCpuModal();
  renderPlayerList();
  checkStartBtn();
}

function removePlayer(idx){
  players.splice(idx,1);
  if (startingPlayer >= players.length) startingPlayer = 0;
  renderPlayerList();
  renderRecentPlayers();
  checkStartBtn();
}

function renderPlayerList(){
  const html = players.map((p,i) => `
    <div class="player-row">
      <div class="flag-wrap">${renderFlag(p.flag)}</div>
      <div class="player-row-name">${escapeHTML(p.name)}</div>
      <div class="player-row-badge ${p.isCpu ? 'badge-cpu' : 'badge-human'}">${p.isCpu ? `CPU ${p.cpuData.mpr.toFixed(1)}` : 'HUMAN'}</div>
      <button class="remove-btn" onclick="removePlayer(${i})">✕</button>
    </div>
  `).join('');
  const list1 = document.getElementById('player-list');
  const list2 = document.getElementById('player-list-winner');
  if(list1) list1.innerHTML = html;
  if(list2) list2.innerHTML = html;
  const maxed = players.length >= 4;
  document.querySelectorAll('.add-human-btn').forEach(b => b.disabled = maxed);
  document.querySelectorAll('.add-cpu-btn').forEach(b => b.disabled = maxed);
  renderRecentPlayers();
}

async function renderRecentPlayers(){
  let saved = {};
  if (sql) {
    try {
      const rows = await sql`SELECT name, flag, games, wins, darts, best_leg FROM players_x01 ORDER BY games DESC LIMIT 10`;
      rows.forEach(r => saved[r.name] = r);
    } catch (e) { console.error(e); saved = getSavedPlayers(); }
  } else {
    saved = getSavedPlayers();
  }
  const usedNames = new Set(players.filter(p => !p.isCpu).map(p => p.name));
  const suggestions = Object.keys(saved).filter(n => !usedNames.has(n)).slice(0, 5);
  const html = suggestions.length ? '<span class="recent-label">Recent:</span>' +
    suggestions.map(n => {
      const s = saved[n];
      const avg = s.darts > 0 ? ((s.games * gameVariant) / s.darts * 3).toFixed(1) : '—';
      const flag = s.flag || 'sco';
      return `<button class="recent-chip" onclick="addSavedPlayer(this, '${escapeHTML(n).replace(/'/g,"\\'")}', '${flag}')">
        <div style="width:24px;height:16px;margin-right:6px;">${renderFlag(flag)}</div> ${escapeHTML(n)}<span class="chip-stat">${avg} Avg</span>
      </button>`;
    }).join('') : '';
  const el1 = document.getElementById('recent-players');
  const el2 = document.getElementById('recent-players-winner');
  if(el1) el1.innerHTML = html;
  if(el2) el2.innerHTML = html;
}

function addSavedPlayer(btn, name, flag = 'sco'){
  if(players.length >= 4) return;
  players.push(createPlayerObject(name, flag, false, null));
  renderPlayerList();
  renderRecentPlayers();
  checkStartBtn();
}

function checkStartBtn(){
  const valid = players.length >= 1;
  const sb = document.getElementById('start-btn');
  if(sb) sb.disabled = !valid;
  const nb = document.getElementById('next-leg-btn');
  if(nb) nb.disabled = !valid;
}

// =============================================
// GAME START / LEG NAVIGATION
// =============================================
function startGame(){
  if(players.length < 1) return;
  legNumber = 0;
  startingPlayer = Math.floor(Math.random() * players.length);
  launchLeg();
}

function launchLeg(){
  document.getElementById('confetti').innerHTML = '';
  players.forEach(p => {
    p.startScore = gameVariant;
    p.score = gameVariant;
    p.dartsThrown = 0;
    p.turnHistory = [];
    p.cpuMissStreak = 0;
  });
  currentPlayer = startingPlayer;
  currentDarts = [];
  seenThrows = 0;
  turnEnded = false;
  gameActive = true;
  stateHistory = [];
  pendingThrowsToSave = [];
  round = 1;
  buildScoreboard();
  showScreen('game');
  enterFullscreen();
  setTimeout(() => { updateScoreboard(); startTurn(); }, 100);
}

function nextLeg(){
  if(players.length < 1) return;
  legNumber++;
  startingPlayer = (startingPlayer + 1) % players.length;
  launchLeg();
}

function goToMenu(){
  gameActive = false;
  exitFullscreen();
  document.getElementById('confetti').innerHTML = '';
  window.location.href = '../index.html';
}

// =============================================
// SCOREBOARD & UI
// =============================================
function buildScoreboard(){
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = players.map((p, i) => `
    <div class="x01-player-card" id="pcard-${i}">
      <div class="x01-header">
        <div class="sb-flag-wrap">${renderFlag(p.flag)}</div>
        <div class="x01-name">${escapeHTML(p.name)}</div>
      </div>
      <div class="x01-score" id="pscore-${i}">${p.score}</div>
      <div class="x01-footer">
        <div id="pavg-${i}">Avg: 0.0</div>
        <div id="plast-${i}"></div>
      </div>
    </div>
  `).join('');
}

function updateScoreboard(){
  players.forEach((p,i) => {
    const card = document.getElementById(`pcard-${i}`);
    if(card) card.classList.toggle('active', i === currentPlayer);

    const scoreEl = document.getElementById(`pscore-${i}`);
    if(scoreEl) {
        scoreEl.textContent = p.score;
        const hasCo = checkoutMode === 'double' && p.score <= 170 && p.score !== 169 && p.score !== 168 && p.score !== 166 && p.score !== 165 && p.score !== 163 && p.score !== 162 && p.score !== 159;
        scoreEl.classList.toggle('has-checkout', hasCo);
    }

    const avgEl = document.getElementById(`pavg-${i}`);
    if(avgEl) {
        const avg = p.dartsThrown > 0 ? ((p.startScore - p.score) / p.dartsThrown * 3).toFixed(1) : '0.0';
        avgEl.textContent = `Avg: ${avg}`;
    }

    const lastEl = document.getElementById(`plast-${i}`);
    if(lastEl) {
        const lastTurn = p.turnHistory[p.turnHistory.length - 1];
        lastEl.textContent = lastTurn ? `Last: ${lastTurn}` : '';
    }
  });

  // Checkout suggestion
  const p = players[currentPlayer];
  const checkout = getCheckout(p.score);
  const checkoutEl = document.getElementById('checkout-val');
  const checkoutBox = checkoutEl.closest('.checkout-box');
  checkoutEl.textContent = checkout || '—';
  checkoutBox.classList.toggle('has-checkout', !!checkout);

  // Round
  document.getElementById('round-num').textContent = round;
}

// =============================================
// TURN FLOW
// =============================================
function startTurn(){
  const p = players[currentPlayer];
  p.turnScoreStart = p.score;
  currentDarts = [];
  seenThrows = 0;
  turnEnded = false;
  resetDartSlots();
  updateScoreboard();
  const nameEl = document.getElementById('turn-player-name');
  nameEl.textContent = p.name;
  nameEl.classList.toggle('cpu-turn', p.isCpu);
  document.getElementById('turn-sub').textContent = p.isCpu ? 'Computer thinking...' : 'Throw your darts';
  if(p.isCpu){
    setTimeout(() => runCpuTurn(), 1500);
  }
}

function advanceTurn(){
  if(!gameActive) return;
  if(missTimer){ clearTimeout(missTimer); missTimer = null; }

  const p = players[currentPlayer];
  const turnScore = p.turnScoreStart - p.score;
  if (turnScore > 0 || currentDarts.length > 0) {
      p.turnHistory.push(turnScore);
  }

  let next = (currentPlayer + 1) % players.length;
  if(next === startingPlayer) round++;
  currentPlayer = next;
  updateScoreboard();
  setTimeout(() => { speak(playerCallName(players[currentPlayer])); startTurn(); }, 800);
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
  if(!el) return;
  el.className = `dart-slot ${cssClass}`;
  el.innerHTML = `<div class="dart-slot-label">${['1ST','2ND','3RD'][idx]}</div><div class="dart-slot-val">${label}</div>`;
}

// =============================================
// DART REGISTRATION
// =============================================
function registerDart(seg, coords = null){
  if(!gameActive || turnEnded || currentDarts.length >= 3) return;
  saveState();

  const p = players[currentPlayer];
  p.dartsThrown++;
  const dartIdx = currentDarts.length;
  const score = segScore(seg);
  const newScore = p.score - score;
  const mul = seg ? seg.multiplier : 1;
  const name = seg ? seg.name : 'Miss';

  currentDarts.push({score, name});

  if (!p.isCpu && coords) {
    const targetAim = getBestTarget(p);
    pendingThrowsToSave.push({ playerName: p.name, targetAim, seg, coords });
  }

  // --- WIN CONDITION ---
  const isWinningDart = (newScore === 0 && (checkoutMode === 'straight' || mul === 2));
  if (isWinningDart) {
    p.score = 0;
    updateDartSlot(dartIdx, name, 'hit');
    sfxHit();
    speak(dartSpeak(seg));
    updateScoreboard();
    endWithWinner(currentPlayer);
    return;
  }

  // --- BUST CONDITION ---
  const isBust = newScore < (checkoutMode === 'double' ? 2 : 0);
  if (isBust) {
    p.score = p.turnScoreStart; // Revert score
    p.dartsThrown -= (dartIdx + 1); // Don't count darts from a bust turn
    updateDartSlot(dartIdx, 'BUST', 'bust');
    sfxBust();
    speak('Bust', true);
    turnEnded = true;
    updateScoreboard();
    setTimeout(() => advanceTurn(), 1200);
    return;
  }

  // --- REGULAR HIT ---
  p.score = newScore;
  updateDartSlot(dartIdx, name, score > 0 ? 'hit' : 'miss');
  if (score > 0) sfxHit(); else sfxMiss();
  speak(dartSpeak(seg));
  updateScoreboard();

  if(currentDarts.length >= 3){
    turnEnded = true;
    const turnTotal = p.turnScoreStart - p.score;
    setTimeout(() => {
        speak(String(turnTotal));
    }, 800);
  }
}

// =============================================
// UNDO & MANUAL KEYPAD
// =============================================
function saveState() {
  const copy = players.map(p => ({ ...p, turnHistory: [...p.turnHistory] }));
  stateHistory.push({
    players: copy,
    currentPlayer,
    currentDarts: [...currentDarts],
    seenThrows,
    turnEnded,
    round
  });
}

function undoLastDart() {
  if (!gameActive || stateHistory.length === 0) return;
  let last = stateHistory.pop();
  while (stateHistory.length > 0 && players[last.currentPlayer].isCpu) {
    last = stateHistory.pop();
  }
  if (!last) return;

  players = last.players.map(p => ({ ...p, turnHistory: [...p.turnHistory] }));
  currentPlayer = last.currentPlayer;
  currentDarts = last.currentDarts;
  seenThrows = last.seenThrows;
  turnEnded = last.turnEnded;
  round = last.round;

  if (missTimer) { clearTimeout(missTimer); missTimer = null; }
  resetDartSlots();
  currentDarts.forEach((d, idx) => {
    updateDartSlot(idx, d.name, d.score > 0 ? 'hit' : 'miss');
  });
  updateScoreboard();
  const p = players[currentPlayer];
  const nameEl = document.getElementById('turn-player-name');
  nameEl.textContent = p.name;
  nameEl.classList.toggle('cpu-turn', p.isCpu);
  document.getElementById('turn-sub').textContent = p.isCpu ? 'Computer thinking...' : 'Throw your darts';
}

let keypadMod = 1;
function toggleKeypadMod(mod) {
  keypadMod = (keypadMod === mod) ? 1 : mod;
  document.getElementById('mod-double').classList.toggle('active', keypadMod === 2);
  document.getElementById('mod-treble').classList.toggle('active', keypadMod === 3);
}

function manualDart(num) {
  if (!gameActive || turnEnded || players[currentPlayer].isCpu) {
    if (keypadMod !== 1) toggleKeypadMod(keypadMod);
    return;
  }
  if (num === 0) {
    registerDart(null);
  } else {
    let mul = keypadMod;
    if (num === 25 && mul === 3) mul = 1;
    const nameMap = { 1: 'S', 2: 'D', 3: 'T' };
    const bedMap = { 1: 'SingleOuter', 2: 'Double', 3: 'Triple' };
    registerDart({
      number: num,
      multiplier: mul,
      name: num === 25 ? (mul === 2 ? 'D25' : 'B25') : `${nameMap[mul]}${num}`,
      bed: num === 25 ? 'Single' : bedMap[mul]
    });
  }
  if (keypadMod !== 1) toggleKeypadMod(keypadMod);
}

// =============================================
// CPU & CHECKOUT LOGIC
// =============================================
function runCpuTurn(){
  if(!gameActive) return;
  const p = players[currentPlayer];
  const cpu = p.cpuData;
  const formRange = 0.35 - ((cpu.mpr - 0.9) / 5.1) * 0.25;
  const roundForm = Math.max(0.3, Math.min(2.5, 1 + (Math.random() * 2 - 1) * formRange));
  let prevSeg = null;

  function doThrow(cb){
    if(!gameActive || turnEnded){ cb && cb(); return; }
    const target = getBestTarget(p);
    const seg = generateCpuThrow(target, cpu.mpr, {
      prevSeg,
      missStreak: p.cpuMissStreak,
      roundForm,
      dartsThrown: p.dartsThrown
    });
    p.cpuMissStreak = isMiss(seg) ? p.cpuMissStreak + 1 : 0;
    prevSeg = seg;
    registerDart(seg);
    cb && cb();
  }

  doThrow(() => {
    setTimeout(() => doThrow(() => {
      setTimeout(() => doThrow(() => {
        if (!turnEnded) setTimeout(() => advanceTurn(), 800);
      }), 1200);
    }), 1200);
  });
}

function getBestTarget(p) {
    const score = p.score;
    const checkoutPath = getCheckout(score);

    if (checkoutPath) {
        const darts = checkoutPath.split(' ');
        const thrownInTurn = currentDarts.length;
        const targetDart = darts[thrownInTurn];

        if (targetDart) {
            if (targetDart.includes('Bull')) return 25;
            return parseInt(targetDart.replace(/[TDS]/, ''));
        }
    }

    // Setup logic
    if (score > 100) return 20; // Maximize score
    if (score > 40 && score % 2 !== 0) {
        // Find an odd number to hit to leave a double
        for (let i = 19; i > 0; i -= 2) {
            if (score - i > 1) return i;
        }
    }
    return 20; // Default to 20 if no other logic applies
}

const CHECKOUTS = {
    170: "T20 T20 Bull", 167: "T20 T19 Bull", 164: "T20 T18 Bull", 161: "T20 T17 Bull", 160: "T20 T20 D20",
    158: "T20 T20 D19", 157: "T20 T19 D20", 156: "T20 T20 D18", 155: "T20 T19 D19", 154: "T20 T18 D20",
    153: "T20 T19 D18", 152: "T20 T20 D16", 151: "T20 T17 D20", 150: "T20 T18 D18", 149: "T20 T19 D16",
    148: "T20 T16 D20", 147: "T20 T17 D18", 146: "T20 T18 D16", 145: "T20 T15 D20", 144: "T20 T20 D12",
    143: "T20 T17 D16", 142: "T20 T14 D20", 141: "T20 T19 D12", 140: "T20 T20 D10", 139: "T19 T14 D20",
    138: "T20 T18 D12", 137: "T19 T16 D16", 136: "T20 T20 D8", 135: "T20 T17 D12", 134: "T20 T14 D16",
    133: "T20 T19 D8", 132: "T20 T16 D12", 131: "T20 T13 D16", 130: "T20 T20 D5", 129: "T19 T16 D12",
    128: "T18 T14 D16", 127: "T20 T17 D8", 126: "T19 T19 D6", 125: "Bull T17 D12", 124: "T20 T16 D8",
    123: "T19 T16 D9", 122: "T18 T18 D7", 121: "T20 T15 D8", 120: "T20 S20 D20", 119: "T19 T14 D10",
    118: "T20 S18 D20", 117: "T20 S17 D20", 116: "T20 S16 D20", 115: "T20 S15 D20", 114: "T20 S14 D20",
    113: "T20 S13 D20", 112: "T20 S12 D20", 111: "T20 S11 D20", 110: "T20 Bull", 109: "T19 S12 D20",
    108: "T20 S8 D20", 107: "T19 S10 D20", 106: "T20 S6 D20", 105: "T20 S5 D20", 104: "T18 S14 D20",
    103: "T19 S6 D20", 102: "T20 S2 D20", 101: "T17 S10 D20", 100: "T20 D20", 99: "T19 S10 D16",
    98: "T20 D19", 97: "T19 D20", 96: "T20 D18", 95: "T19 D19", 94: "T18 D20", 93: "T19 D18", 92: "T20 D16",
    91: "T17 D20", 90: "T20 D15", 89: "T19 D16", 88: "T20 D14", 87: "T17 D18", 86: "T18 D16", 85: "T19 D14",
    84: "T20 D12", 83: "T17 D16", 82: "T14 D20", 81: "T19 D12", 80: "T20 D10", 79: "T19 D11", 78: "T18 D12",
    77: "T19 D10", 76: "T20 D8", 75: "T17 D12", 74: "T14 D16", 73: "T19 D8", 72: "T16 D12", 71: "T13 D16",
    70: "T20 D5", 69: "T19 D6", 68: "T20 D4", 67: "T17 D8", 66: "T10 D18", 65: "T19 D4", 64: "T16 D8",
    63: "T13 D12", 62: "T10 D16", 61: "T15 D8", 60: "S20 D20", 59: "S19 D20", 58: "S18 D20", 57: "S17 D20",
    56: "S16 D20", 55: "S15 D20", 54: "S14 D20", 53: "S13 D20", 52: "S12 D20", 51: "S11 D20", 50: "S10 D20",
    49: "S9 D20", 48: "S8 D20", 47: "S7 D20", 46: "S6 D20", 45: "S5 D20", 44: "S4 D20", 43: "S3 D20",
    42: "S2 D20", 41: "S1 D20", 40: "D20", 39: "S7 D16", 38: "D19", 37: "S5 D16", 36: "D18", 35: "S3 D16",
    34: "D17", 33: "S1 D16", 32: "D16", 31: "S15 D8", 30: "D15", 29: "S13 D8", 28: "D14", 27: "S11 D8",
    26: "D13", 25: "S9 D8", 24: "D12", 23: "S7 D8", 22: "D11", 21: "S5 D8", 20: "D10", 19: "S3 D8",
    18: "D9", 17: "S1 D8", 16: "D8", 15: "S7 D4", 14: "D7", 13: "S5 D4", 12: "D6", 11: "S3 D4", 10: "D5",
    9: "S1 D4", 8: "D4", 7: "S3 D2", 6: "D3", 5: "S1 D2", 4: "D2", 3: "S1 D1", 2: "D1"
};

function getCheckout(score) {
    if (checkoutMode !== 'double') return null;
    return CHECKOUTS[score] || null;
}

// =============================================
// WINNER
// =============================================
function endWithWinner(idx){
  gameActive = false;
  const winner = players[idx];
  sfxCheckout();
  speak(`${playerCallName(winner)} wins!`, true);

  const darts = winner.dartsThrown;
  const avg = ((winner.startScore) / darts * 3).toFixed(2);

  document.getElementById('win-name').textContent = winner.name;
  document.getElementById('win-details').textContent = `Won in ${darts} darts · Avg: ${avg}`;

  const othersEl = document.getElementById('win-others');
  if (othersEl) othersEl.innerHTML = players
    .filter((_,i) => i !== idx)
    .map(p => `<div class="win-other-card">
      <div class="win-other-name">${escapeHTML(p.name)}</div>
      <div class="win-other-score">${p.score} remaining</div>
    </div>`)
    .join('');

  players.forEach((p, i) => {
    if(!p.isCpu) savePlayerStat(p, i === idx);
  });
  flushThrowsToNeon();
  spawnConfetti();
  showScreen('winner');
}

function endGame(){
  gameActive = false;
  flushThrowsToNeon();
  exitFullscreen();
  document.getElementById('confetti').innerHTML = '';
  showScreen('setup');
}

// =============================================
// KEYBOARD TESTING
// =============================================
document.addEventListener('keydown', e => {
  if(!gameActive || (players[currentPlayer] && players[currentPlayer].isCpu)) return;
  if(e.key===' '||e.key==='Enter'){
    if(turnEnded||currentDarts.length>0) advanceTurn();
    return;
  }
  if(e.key==='Backspace') undoLastDart();
});

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initNeonDB();
  buildCpuGrid();
  renderRecentPlayers();
  initSpeech();
  initAutodarts(handleWS);
  checkStartBtn();
  window.addEventListener('resize', () => { if(gameActive) buildScoreboard(); updateScoreboard(); });
});
