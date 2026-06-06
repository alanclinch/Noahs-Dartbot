// CPU_PLAYERS, makeFaceSVG, humanAvatarSVG, generateCpuThrow — from bots.js
// PLAYER_COLORS, showScreen, speak, sfxMiss, gAC, tone, noiz,
// spawnConfetti, initSpeech — from utils.js

// =============================================
// POKEMON ROSTER
// =============================================
const POKEMON_ROSTER = [
  {id:1,  name:'Pikachu',    vname:'Pee-kah-choo',       types:['Electric'],       cls:'Sniper',  baseHp:150, sid:25,  msid:26,   maxStage:2, mname:'Raichu',    mtypes:['Electric']},
  {id:2,  name:'Vulpix',     vname:'Vul-pix',            types:['Fire'],           cls:'Brawler', baseHp:150, sid:37,  msid:38,   maxStage:2, mname:'Ninetales', mtypes:['Fire']},
  {id:3,  name:'Charmander', vname:'Char-man-der',       types:['Fire'],           cls:'Brawler', baseHp:150, sid:4,   msid:5,   fsid:6,   mname:'Charmeleon', fname:'Charizard', ftypes:['Fire','Flying'],
    megaEvolutions:[
      {name:'Mega Charizard X', sid:10034, types:['Fire','Dragon']},
      {name:'Mega Charizard Y', sid:10035, types:['Fire','Flying']},
    ]},
  {id:4,  name:'Magikarp',   vname:'Maj-ee-karp',        types:['Water'],          cls:'Sniper',  baseHp:150, sid:129, msid:130,  maxStage:2, mname:'Gyarados',  mtypes:['Water','Flying'],
    megaEvolutions:[{name:'Mega Gyarados', sid:10041, types:['Water','Dark']}]},
  {id:5,  name:'Psyduck',    vname:'Sy-duk',             types:['Water'],          cls:'Status',  baseHp:150, sid:54,  msid:55,   maxStage:2, mname:'Golduck',   mtypes:['Water']},
  {id:6,  name:'Ralts',      vname:'Ralts',              types:['Psychic','Fairy'],cls:'Status',  baseHp:150, sid:280, msid:281, fsid:282, mname:'Kirlia',    fname:'Gardevoir', ftypes:['Psychic','Fairy'],
    finalEvolutions:[
      {name:'Gardevoir', sid:282, types:['Psychic','Fairy'], megaEvolution:{name:'Mega Gardevoir', sid:10051, types:['Psychic','Fairy']}},
      {name:'Gallade',   sid:475, types:['Psychic','Fighting'], megaEvolution:{name:'Mega Gallade', sid:10068, types:['Psychic','Fighting']}},
    ]},
  {id:7,  name:'Riolu',      vname:'Ree-oh-loo',         types:['Fighting'],       cls:'Brawler', baseHp:150, sid:447, msid:448,  maxStage:2, mname:'Lucario',   mtypes:['Fighting','Steel']},
  {id:8,  name:'Axew',       vname:'Ax-oo',              types:['Dragon'],         cls:'Brawler', baseHp:150, sid:610, msid:611, fsid:612, mname:'Fraxure',   fname:'Haxorus'},
  {id:9,  name:'Rayquaza',   vname:'Ray-quay-zah',       types:['Dragon','Flying'],cls:'Brawler', baseHp:150, sid:384, msid:10079, maxStage:2, mname:'Mega Rayquaza', mtypes:['Dragon','Flying'], megaEvolution:true},
  {id:10, name:'Scyther',    vname:'Sih-ther',           types:['Bug','Flying'],   cls:'Sniper',  baseHp:150, sid:123, msid:212,  maxStage:2, mname:'Scizor',    mtypes:['Bug','Steel'],
    megaEvolutions:[{name:'Mega Scizor', sid:10046, types:['Bug','Steel']}]},
  {id:11, name:'Frigibax',   vname:'Frij-ih-bax',        types:['Dragon','Ice'],   cls:'Brawler', baseHp:150, sid:996, msid:997, fsid:998, mname:'Arctibax',   fname:'Baxcalibur'},
  {id:12, name:'Wooper',     vname:'Woo-per',            types:['Water','Ground'], cls:'Tank',    baseHp:150, sid:194, msid:195,  maxStage:2, mname:'Quagsire',  mtypes:['Water','Ground']},
  {id:13, name:'Mudkip',     vname:'Mud-kip',            types:['Water'],          cls:'Sniper',  baseHp:150, sid:258, msid:259, fsid:260, mname:'Marshtomp',  fname:'Swampert',  ftypes:['Water','Ground']},
  {id:14, name:'Dreepy',     vname:'Dree-pee',           types:['Dragon','Ghost'], cls:'Status',  baseHp:150, sid:885, msid:886, fsid:887, mname:'Drakloak',   fname:'Dragapult'},
  {id:15, name:'Dratini',    vname:'Dra-tee-nee',        types:['Dragon'],         cls:'Tank',    baseHp:150, sid:147, msid:148, fsid:149, mname:'Dragonair',  fname:'Dragonite', ftypes:['Dragon','Flying']},
  {id:16, name:'Charcadet',  vname:'Char-ka-det',        types:['Fire'],           cls:'Brawler', baseHp:150, sid:935, msid:936, maxStage:2, mname:'Armarouge',  mtypes:['Fire','Psychic'], branchAtStage:2,
    finalEvolutions:[
      {name:'Armarouge', sid:936, types:['Fire','Psychic']},
      {name:'Ceruledge', sid:937, types:['Fire','Ghost']},
    ]},
  {id:17, name:'Goomy',      vname:'Goo-mee',            types:['Dragon'],         cls:'Tank',    baseHp:150, sid:704, msid:705, fsid:706, mname:'Sliggoo',   fname:'Goodra'},
  {id:18, name:'Rowlet',     vname:'Row-let',            types:['Grass','Flying'], cls:'Tank',    baseHp:150, sid:722, msid:723, fsid:724, mname:'Dartrix',    fname:'Decidueye', ftypes:['Grass','Ghost']},
  {id:19, name:'Applin',     vname:'Ap-lin',             types:['Grass','Dragon'], cls:'Tank',    baseHp:150, sid:840, msid:1011, fsid:1019, mname:'Dipplin',   fname:'Hydrapple'},
  {id:20, name:'Cetoddle',   vname:'Seh-tod-ul',         types:['Ice'],            cls:'Tank',    baseHp:150, sid:974, msid:975,  maxStage:2, mname:'Cetitan',   mtypes:['Ice']},
];

const SECRET_POKEMON = {
  bull: {id:150, name:'Mewtwo', vname:'Mew-two', types:['Psychic'], cls:'Status', baseHp:300, sid:150, maxStage:1,
    megaEvolutions:[
      {name:'Mega Mewtwo X', sid:10043, types:['Psychic','Fighting']},
      {name:'Mega Mewtwo Y', sid:10044, types:['Psychic']},
    ]},
  dbull: {id:493, name:'Arceus', vname:'Ar-key-us', types:['Normal'], cls:'Tank', baseHp:325, sid:493, maxStage:1, randomType:true},
};

const ARCEUS_TYPES = ['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];

const POKEMON_SPRITE_VERSION = 5;

const CLASS_PASSIVES = {
  Sniper:  'Trebles deal 3.5× in Gym',
  Tank:    'Even heals +8 extra HP',
  Brawler: 'Odd attacks +5 flat bonus',
  Status:  'Bull hit inflicts burn or paralysis',
};

// =============================================
// STATE
// =============================================
let gameMode = 'wild';
let players = [];
let currentPlayer = 0;
let currentDarts = [];
let round = 1;
let gameActive = false;
let draftPhase = false;
let draftMap = {};
let draftStep = 0;
let hpAtTurnStart = [0, 0];
let xAttackBonus = 0;
let missTimer = null;
let seenThrows = 0;
let turnEnded = false;
let stateHistory = [];
let throwLog = [];
let advancing = false;
let legNumber = 0;
let startingPlayer = 0;
let keypadMod = 1;
let finishMode = false;
let finishTarget = 0;
let finishTotal = 0;

// Test/audio settings
let testMode = false;
let voiceEnabled = true;
let sfxEnabled = true;

// Audio wrappers — silence speech/sfx in test mode or when toggled off
function aSpeak(text, priority) {
  if (testMode || !voiceEnabled) return;
  speak(text, priority);
}
function aSfx(fn) {
  if (testMode || !sfxEnabled || !fn) return;
  fn();
}
// Timing helper — collapse animation/voice delays in test mode
function tDelay(ms) { return testMode ? 0 : ms; }

function resetThrowTracking() {
  if (missTimer) { clearTimeout(missTimer); missTimer = null; }
  seenThrows = 0;
  turnEnded = false;
  advancing = false;
}

function setTestMode(val) {
  testMode = val;
  if (val) cancelSpeech();
  try { localStorage.setItem('dartbot_testmode', val ? '1' : '0'); } catch {}
}
function setVoice(val) {
  voiceEnabled = val;
  if (!val) cancelSpeech();
  try { localStorage.setItem('dartbot_voice_enabled', val ? '1' : '0'); } catch {}
}
function setSfx(val) {
  sfxEnabled = val;
  try { localStorage.setItem('dartbot_sfx_enabled', val ? '1' : '0'); } catch {}
}

function showKeyHelp() {
  const m = document.getElementById('key-help-modal');
  if (m) m.style.display = 'flex';
}
function closeKeyHelp() {
  const m = document.getElementById('key-help-modal');
  if (m) m.style.display = 'none';
}

// =============================================
// UTILITIES
// =============================================
function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
}
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function voicePokemonName(poke) { return poke && (poke.vname || poke.name); }
function pokemonStageName(poke, stage = 1) {
  if (!poke) return '';
  if (stage >= 3) return poke.fname || poke.mname || poke.name;
  if (stage >= 2) return poke.mname || poke.name;
  return poke.name;
}
function pokemonStageTypes(poke, stage = 1) {
  if (!poke) return [];
  if (stage >= 3 && poke.ftypes) return poke.ftypes;
  if (stage >= 2 && poke.mtypes) return poke.mtypes;
  return poke.types || [];
}
function pokemonTypeLabel(poke, stage = 1) {
  return pokemonStageTypes(poke, stage).join(' / ') || 'Pokemon';
}
function typeClassName(type) {
  return `type-${String(type || 'pokemon').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}
function typeLabelHTML(types) {
  const list = (types || []).filter(Boolean);
  if (!list.length) return '<span class="type-pill type-pokemon">Pokemon</span>';
  return list
    .map(type => `<span class="type-pill ${typeClassName(type)}">${escapeHTML(type)}</span>`)
    .join('<span class="type-slash">/</span>');
}
function pokemonTypeHTML(poke, stage = 1) {
  return typeLabelHTML(pokemonStageTypes(poke, stage));
}
function playerEvolutionPick(player) {
  if (player && player.megaActive && player.megaPick) return player.megaPick;
  if (!player || player.stage <= 1) return null;
  return player.eeveeEvolution || player.branchEvolution || null;
}
function playerPokemonStageName(player) {
  const eeveePick = playerEvolutionPick(player);
  return eeveePick ? eeveePick.name : pokemonStageName(player.pokemon, player.stage);
}
function playerPokemonStageTypes(player) {
  if (player && player.pokemon && player.pokemon.randomType && player.arceusType) return [player.arceusType];
  const eeveePick = playerEvolutionPick(player);
  return eeveePick ? eeveePick.types : pokemonStageTypes(player.pokemon, player.stage);
}
function playerPokemonTypeLabel(player) {
  return playerPokemonStageTypes(player).join(' / ') || 'Pokemon';
}
function playerPokemonTypeHTML(player) {
  return typeLabelHTML(playerPokemonStageTypes(player));
}
function typeAdvantageMultiplier(attacker, defender) {
  const attackTypes = playerPokemonStageTypes(attacker);
  const defendTypes = playerPokemonStageTypes(defender);
  const beats = { Fire:'Grass', Grass:'Water', Water:'Fire' };
  return attackTypes.some(t => defendTypes.includes(beats[t])) ? 1.2 : 1;
}

function spriteUrl(id) {
  if (id < 10000) return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
function shinySpriteUrl(id) {
  if (id < 10000) return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
}
function localSpriteUrl(id) {
  return `../assets/sprites/pokemon/pokemon-${id}.png?v=${POKEMON_SPRITE_VERSION}`;
}
function localShinySpriteUrl(id) {
  return `../assets/sprites/pokemon/pokemon-${id}-shiny.png?v=${POKEMON_SPRITE_VERSION}`;
}

function fallbackSpriteUrl(cls) {
  const key = String(cls || 'generic').toLowerCase();
  return `../assets/sprites/pokemon/fallback-${key}.svg`;
}

function useRemotePokemonSprites() {
  return window.DARTBOT_CONFIG && window.DARTBOT_CONFIG.remotePokemonSprites === true;
}

function pokemonSpriteUrl(poke, evolved, shiny = false) {
  const stage = typeof evolved === 'number' ? evolved : (evolved ? 2 : 1);
  const id = stage >= 3 ? (poke.fsid || poke.msid || poke.sid) : (stage >= 2 ? poke.msid : poke.sid);
  if (shiny) return useRemotePokemonSprites() ? shinySpriteUrl(id) : localShinySpriteUrl(id);
  return useRemotePokemonSprites() ? spriteUrl(id) : localSpriteUrl(id);
}

function isShinyDraftPick(seg) {
  const mul = Number(seg && seg.multiplier);
  const name = String(seg && seg.name || '');
  return mul === 2 || mul === 3 || /^[DT]/i.test(name);
}

function rollDraftShiny(seg) {
  return isShinyDraftPick(seg) || Math.random() < 0.1;
}

function secretDraftPokemon(seg) {
  const num = Number(seg && seg.number);
  if (num !== 25) return null;
  return Number(seg && seg.multiplier) === 2 ? SECRET_POKEMON.dbull : SECRET_POKEMON.bull;
}

function syncShinyClass(playerIdx) {
  const p = players[playerIdx];
  const img = document.getElementById(`sprite-${playerIdx}`);
  const wrap = img ? img.closest('.poke-sprite-wrap') : null;
  [img, wrap].forEach(el => { if (el) el.classList.toggle('shiny-pokemon', !!(p && p.shiny)); });
}

function pokemonImgAttrs(poke, evolved) {
  const fallback = fallbackSpriteUrl(poke.cls);
  return `src="${pokemonSpriteUrl(poke, evolved)}" data-fallback="${fallback}" onerror="this.onerror=null;this.src=this.dataset.fallback"`;
}

function setPokemonSprite(img, poke, evolved, shiny = false) {
  if (!img || !poke) return;
  img.onerror = function() {
    this.onerror = null;
    this.src = this.dataset.fallback;
  };
  img.dataset.fallback = fallbackSpriteUrl(poke.cls);
  img.src = pokemonSpriteUrl(poke, evolved, shiny);
}

function setPlayerPokemonSprite(img, player) {
  if (!img || !player || !player.pokemon) return;
  const eeveePick = playerEvolutionPick(player);
  if (!eeveePick) {
    setPokemonSprite(img, player.pokemon, player.stage || 1, player.shiny);
    return;
  }
  img.onerror = function() {
    this.onerror = null;
    this.src = this.dataset.fallback;
  };
  img.dataset.fallback = fallbackSpriteUrl(player.pokemon.cls);
  img.src = player.shiny
    ? (useRemotePokemonSprites() ? shinySpriteUrl(eeveePick.sid) : localShinySpriteUrl(eeveePick.sid))
    : (useRemotePokemonSprites() ? spriteUrl(eeveePick.sid) : localSpriteUrl(eeveePick.sid));
}

function isMegaPokemon(player) {
  return !!(player && player.pokemon && player.pokemon.megaEvolution);
}

function pokemonCanMega(poke) {
  return !!(poke && (poke.megaEvolution || (poke.megaEvolutions && poke.megaEvolutions.length) ||
    (poke.finalEvolutions && poke.finalEvolutions.some(e => e.megaEvolution))));
}

function playerMegaOptions(player) {
  if (!player || !player.pokemon || player.megaActive) return [];
  const poke = player.pokemon;
  if (poke.megaEvolution) {
    return [{ name: poke.mname, sid: poke.msid, types: poke.mtypes || poke.types }];
  }
  const maxStage = poke.maxStage || 3;
  if ((player.stage || 1) < maxStage) return [];
  const branchMega = player.branchEvolution && player.branchEvolution.megaEvolution;
  if (branchMega) return [branchMega];
  return poke.megaEvolutions || [];
}

function megaIconHTML(poke) {
  return pokemonCanMega(poke) ? '<span class="mega-icon" aria-label="Mega Evolution" title="Mega Evolution"></span>' : '';
}

function playerPokemonNameHTML(player) {
  const name = playerPokemonStageName(player).toUpperCase();
  const megaIcon = player && (pokemonCanMega(player.pokemon) || player.megaActive) ? megaIconHTML(player.pokemon) : '';
  return `${name}${megaIcon}`;
}

function playMegaAnimation(playerIdx) {
  const img = document.getElementById(`sprite-${playerIdx}`);
  const wrap = img ? img.closest('.poke-sprite-wrap') : null;
  if (!wrap) return;
  const stone = document.createElement('div');
  stone.className = 'mega-stone';
  wrap.appendChild(stone);
  wrap.classList.add('mega-activating');
  setTimeout(() => {
    stone.remove();
    wrap.classList.remove('mega-activating');
  }, tDelay(1200));
}

function endMegaEvolution(playerIdx) {
  const p = players[playerIdx];
  if (!p || !p.megaActive) return;
  const returnName = playerPokemonStageName(p);
  p.megaActive = false;
  p.megaTurnsLeft = 0;
  p.megaJustActivated = false;
  p.stage = p.megaBaseStage || p.stage || 1;
  p.megaBaseStage = null;
  p.megaPick = null;
  p.evolved = p.stage > 1;
  p.evolvedSprite = p.stage > 1;
  p.maxHp = Math.max(1, p.maxHp - 100);
  p.hp = Math.min(p.hp, p.maxHp);
  const img = document.getElementById(`sprite-${playerIdx}`);
  if (img) {
    setPlayerPokemonSprite(img, p);
    syncShinyClass(playerIdx);
  }
  const normalName = playerPokemonStageName(p);
  flash(`${returnName.toUpperCase()} RETURNED TO ${normalName.toUpperCase()}!`, 'var(--muted)');
  aSpeak(`${returnName} returned!`);
}

function renderFlag(code) {
  let c = String(code || 'sco').toLowerCase();
  if (c.includes('󠁳󠁣󠁴') || c === '👤' || c === 'undefined') c = 'sco';
  if (c.includes('󠁥󠁮󠁧')) c = 'eng';
  if (c.includes('󠁷󠁬󠁳')) c = 'wal';
  if (c.includes('🇳🇱')) c = 'ned';
  const w = (svg) => `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${svg}</div>`;
  if (c==='sco') return w(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="40" fill="#005eb8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="6"/></svg>`);
  if (c==='eng') return w(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="40" fill="#fff"/><path d="M30,0 L30,40 M0,20 L60,20" stroke="#ce1126" stroke-width="8"/></svg>`);
  if (c==='wal') return w(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#00ab39"/><text x="30" y="27" font-size="20" text-anchor="middle" fill="#d30731">🐉</text></svg>`);
  if (c==='ned') return w(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="13.4" fill="#ae1c28"/><rect y="13.3" width="60" height="13.4" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#21468b"/></svg>`);
  return w(`<svg viewBox="0 0 60 40" style="width:100%;height:100%;border-radius:4px;"><rect width="60" height="40" fill="#444"/></svg>`);
}

// =============================================
// LOCAL STORAGE
// =============================================
const LS_KEY = 'dartbot_players_pokemon';
function getSavedPlayers() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch { return {}; }
}

async function savePlayerStat(name, flag, won, avgCp, pokemonName, mode) {
  const all = getSavedPlayers();
  if (!all[name]) all[name] = { games:0, wins:0, avg_cp:0, flag, match_pokemon:'', match_mode:'' };
  const prev = all[name];
  const prevTotal = prev.avg_cp * prev.games;
  prev.games++;
  if (won) prev.wins++;
  prev.avg_cp = (prevTotal + avgCp) / prev.games;
  prev.flag = flag;
  prev.match_pokemon = pokemonName;
  prev.match_mode = mode;
  try { localStorage.setItem(LS_KEY, JSON.stringify(all)); } catch {}
}

function savedMPR(stats) {
  return stats.avg_cp ? stats.avg_cp.toFixed(1) : '—';
}

// =============================================
// SETUP UI
// =============================================
const MODE_DESCS = {
  wild: 'Random damage/heals. Odd numbers attack, evens heal. Bulls give random items.',
  gym:  'Precise hits. Dart value = damage/heal. Trebles maximise damage, doubles score big.'
};

function selectMode(v, btn) {
  gameMode = v;
  document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  document.getElementById('variant-desc').textContent = MODE_DESCS[v];
}

function buildCpuGrid() {
  const g = document.getElementById('cpu-grid');
  if (!g) return;
  g.innerHTML = CPU_PLAYERS.map(c => {
    const barW = Math.round((c.mpr / 6.5) * 100);
    return `<div class="cpu-pick-card" onclick="addCpuPlayer('${c.id}')">
      <div style="width:48px;height:32px;margin-bottom:6px;">${renderFlag(c.flag)}</div>
      <div class="cpu-pick-name">${c.name}</div>
      <div class="cpu-pick-mpr">MPR ${c.mpr.toFixed(1)}</div>
      <div class="cpu-mpr-bar"><div class="cpu-mpr-fill" style="width:${barW}%"></div></div>
    </div>`;
  }).join('');
}

function openCpuModal()   { if (players.length >= 2) return; document.getElementById('cpu-modal').classList.add('open'); }
function closeCpuModal()  { document.getElementById('cpu-modal').classList.remove('open'); }
function openHumanModal() {
  if (players.length >= 2) return;
  document.getElementById('new-human-name').value = '';
  document.getElementById('human-modal').classList.add('open');
  setTimeout(() => document.getElementById('new-human-name').focus(), 50);
}
function closeHumanModal() { document.getElementById('human-modal').classList.remove('open'); }

function confirmAddHuman() {
  const name = document.getElementById('new-human-name').value.trim();
  if (!name) { alert('Please enter a name'); return; }
  const flag = document.getElementById('new-human-flag').value;
  const color = PLAYER_COLORS[players.length % 6];
  players.push(makePlayer(name, color, flag, false, null));
  closeHumanModal();
  renderPlayerList();
  checkStartBtn();
}

function addCpuPlayer(id) {
  if (players.length >= 2) return;
  const cpu = CPU_PLAYERS.find(c => c.id === id);
  if (!cpu) return;
  const color = PLAYER_COLORS[players.length % 6];
  players.push(makePlayer(cpu.name, color, cpu.flag, true, cpu));
  closeCpuModal();
  renderPlayerList();
  checkStartBtn();
}

function makePlayer(name, color, flag, isCpu, cpuData) {
  return {
    name, color, flag, isCpu, cpuData,
    pokemon: null, hp: 0, maxHp: 0, stage: 1, eeveeEvolution: null,
    branchEvolution: null,
    megaActive: false, megaTurnsLeft: 0, megaJustActivated: false, megaPick: null, megaBaseStage: null,
    arceusType: null,
    evoScoreOffset: 0,
    shiny: false,
    dmgBoost: 0, evolved: false, evolvedSprite: false,
    status: null, statusDurtn: 0, dartLostNext: false,
    totalDmg: 0, totalHeal: 0, cpTurns: 0,
    dartsThrown: 0,
  };
}

function removePlayer(idx) {
  players.splice(idx, 1);
  if (startingPlayer >= players.length) startingPlayer = 0;
  renderPlayerList();
  renderRecentPlayers();
  checkStartBtn();
}

function renderPlayerList() {
  const html = players.map((p, i) => `
    <div class="player-row">
      <div class="flag-wrap">${renderFlag(p.flag)}</div>
      <div class="player-row-name">${escapeHTML(p.name)}</div>
      <div class="player-row-badge ${p.isCpu ? 'badge-cpu' : 'badge-human'}">${p.isCpu ? `CPU ${p.cpuData.mpr.toFixed(1)}` : 'HUMAN'}</div>
      <button class="remove-btn" onclick="removePlayer(${i})">✕</button>
    </div>`).join('');
  ['player-list','player-list-winner'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
  const maxed = players.length >= 2;
  document.querySelectorAll('.add-human-btn').forEach(b => b.disabled = maxed);
  document.querySelectorAll('.add-cpu-btn').forEach(b => b.disabled = maxed);
  renderRecentPlayers();
}

async function renderRecentPlayers() {
  let saved = getSavedPlayers();
  const usedNames = new Set(players.filter(p => !p.isCpu).map(p => p.name));
  const suggestions = Object.keys(saved).filter(n => !usedNames.has(n)).slice(0, 5);
  const html = suggestions.length ? '<span class="recent-label">Recent:</span>' +
    suggestions.map(n => {
      const s = saved[n];
      const cp = savedMPR(s);
      const flag = s.flag || 'sco';
      return `<button class="recent-chip" onclick="addSavedPlayer('${escapeHTML(n).replace(/'/g,"\\'")}','${flag}')">
        <div style="width:24px;height:16px;margin-right:6px;">${renderFlag(flag)}</div>
        ${escapeHTML(n)}<span class="chip-stat">${cp} CP</span>
      </button>`;
    }).join('') : '';
  ['recent-players','recent-players-winner'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

function addSavedPlayer(name, flag = 'sco') {
  if (players.length >= 2) return;
  const color = PLAYER_COLORS[players.length % 6];
  players.push(makePlayer(name, color, flag, false, null));
  renderPlayerList();
  checkStartBtn();
}

function checkStartBtn() {
  const valid = players.length === 2;
  const sb = document.getElementById('start-btn');
  if (sb) sb.disabled = !valid;
  const nb = document.getElementById('next-leg-btn');
  if (nb) nb.disabled = !valid;
}

function showStatsModal() {
  const all = getSavedPlayers();
  const modal = document.getElementById('stats-modal');
  const el = document.getElementById('stats-content');
  const entries = Object.entries(all).sort((a,b) => (b[1].avg_cp||0) - (a[1].avg_cp||0));
  if (!entries.length) {
    el.innerHTML = '<div class="stats-empty">No data yet. Play a game to start tracking.</div>';
  } else {
    const rows = entries.map(([name, s], rank) => {
      const cp = s.avg_cp ? s.avg_cp.toFixed(1) : '—';
      const winPct = s.games > 0 ? Math.round((s.wins/s.games)*100) : 0;
      return `<tr>
        <td class="stats-rank">${rank+1}</td>
        <td>${escapeHTML(name)}</td>
        <td>${s.games}</td><td>${s.wins}</td><td>${winPct}%</td>
        <td class="stats-mpr">${cp}</td>
        <td style="font-size:12px;color:var(--muted)">${escapeHTML(s.match_pokemon||'—')}</td>
      </tr>`;
    }).join('');
    el.innerHTML = `<table class="stats-table">
      <thead><tr><th>#</th><th>Player</th><th>Games</th><th>Wins</th><th>Win%</th><th>Avg CP</th><th>Last Pokémon</th></tr></thead>
      <tbody>${rows}</tbody></table>`;
  }
  modal.style.display = 'flex';
}
function closeStatsModal() { document.getElementById('stats-modal').style.display = 'none'; }

// =============================================
// GAME START / LEG FLOW
// =============================================
function startGame() {
  if (players.length !== 2) return;
  legNumber = 0;
  startingPlayer = rand(0, 1);
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  launchLeg();
}

function launchLeg() {
  document.getElementById('confetti').innerHTML = '';
  ensureDraftKeypadModifiers();
  // Build draft map: keep the roster in dartboard number order (1-20)
  draftMap = {};
  POKEMON_ROSTER.forEach((poke, i) => { draftMap[i + 1] = poke; });

  // Reset player state (keep name/flag/color/isCpu/cpuData)
  players.forEach(p => {
    p.pokemon = null; p.hp = 0; p.maxHp = 0; p.stage = 1; p.eeveeEvolution = null; p.branchEvolution = null;
    p.megaActive = false; p.megaTurnsLeft = 0; p.megaJustActivated = false; p.megaPick = null; p.megaBaseStage = null; p.arceusType = null; p.evoScoreOffset = 0; p.shiny = false;
    p.dmgBoost = 0; p.evolved = false; p.evolvedSprite = false;
    p.status = null; p.statusDurtn = 0; p.dartLostNext = false;
    p.totalDmg = 0; p.totalHeal = 0; p.cpTurns = 0;
    p.dartsThrown = 0;
  });

  draftPhase = true;
  draftStep = 0;
  advancing = false;
  stateHistory = [];
  throwLog = [];
  seenThrows = 0;
  turnEnded = false;
  currentDarts = [];
  finishMode = false;
  finishTarget = 0;
  finishTotal = 0;

  buildDraftGrid();
  showScreen('draft');
  updateDraftInstruction();
}

function updateDraftInstruction() {
  const el = document.getElementById('draft-instruction');
  if (!el) return;
  if (draftStep === 0) {
    el.textContent = `${players[0].name} — throw a dart to pick your Pokémon! (numbers 1–20)`;
  } else {
    el.textContent = `${players[1].name} — throw a dart to pick your Pokémon!`;
  }
}

function ensureDraftKeypadModifiers() {
  const keypad = document.querySelector('#draft .keypad-wrap');
  if (!keypad || keypad.querySelector('.draft-mod-row')) return;
  const row = document.createElement('div');
  row.className = 'keypad-row draft-mod-row';
  row.innerHTML = `
    <button class="kp-btn kp-mod" data-mod="2" onclick="toggleKeypadMod(2)">DOUBLE</button>
    <button class="kp-btn kp-mod" data-mod="3" onclick="toggleKeypadMod(3)">TREBLE</button>`;
  keypad.appendChild(row);
}

function buildDraftGrid() {
  const grid = document.getElementById('draft-grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let n = 1; n <= 20; n++) {
    const poke = draftMap[n];
    const card = document.createElement('div');
    card.className = 'draft-card';
    card.id = `dcard-${n}`;
    card.innerHTML = `
      <div class="draft-num">${n}</div>
      <img class="draft-sprite" ${pokemonImgAttrs(poke, false)} alt="${escapeHTML(poke.name)}" loading="lazy">
      <div class="draft-pname">${escapeHTML(poke.name)}${megaIconHTML(poke)}</div>
      <div class="draft-type-badge">${pokemonTypeHTML(poke)}</div>`;
    grid.appendChild(card);
  }
}

function registerDraftThrow(seg) {
  if (!draftPhase) return;
  const num = seg ? Number(seg.number) : 0;
  const secretPoke = secretDraftPokemon(seg);
  if (!secretPoke && (!num || num < 1 || num > 20)) {
    aSfx(sfxMiss);
    flash('Miss! Try again.', 'var(--muted)');
    return;
  }
  const poke = secretPoke || draftMap[num];
  if (!poke) return;

  // Check not already picked
  if (players.some(p => p.pokemon && p.pokemon.id === poke.id)) return;

  const card = secretPoke ? null : document.getElementById(`dcard-${num}`);
  if (card) {
    card.classList.add(draftStep === 0 ? 'selected-p1' : 'selected-p2');
  }

  players[draftStep].pokemon = poke;
  players[draftStep].shiny = rollDraftShiny(seg);
  if (card && players[draftStep].shiny) card.classList.add('shiny-draft-pick');
  if (secretPoke) flash('SECRET POKEMON!', 'var(--poke-yellow)');
  aSpeak(`${players[draftStep].shiny ? 'Shiny ' : ''}${voicePokemonName(poke)}, I choose you!`);

  if (draftStep === 0) {
    draftStep = 1;
    updateDraftInstruction();
    // Mark all already-picked cards unavailable — just mark p1's pick
    if (players[1].isCpu) {
      // CPU auto-picks after delay
      setTimeout(() => {
        const remaining = [];
        for (let n = 1; n <= 20; n++) {
          if (!players.some(p => p.pokemon && p.pokemon.id === draftMap[n].id)) remaining.push(n);
        }
        const pick = remaining[rand(0, remaining.length - 1)];
        registerDraftThrow({ number: pick, multiplier: 1, name: 'S' + pick });
      }, tDelay(900));
    }
  } else {
    // Both picked
    setTimeout(() => completeDraft(), tDelay(800));
  }
}

function completeDraft() {
  draftPhase = false;
  buildVSScreen();
  showScreen('vs-screen');
  setTimeout(() => {
    showScreen('game');
    startBattle();
  }, tDelay(2500));
}

function buildVSScreen() {
  const p0 = players[0], p1 = players[1];
  const vsFirst = startingPlayer === 0 ? p0.name : p1.name;

  const p1El = document.getElementById('vs-p1');
  if (p1El) {
    p1El.classList.toggle('shiny-pokemon', !!p0.shiny);
    p1El.innerHTML = `
    <img class="vs-sprite${p0.shiny ? ' shiny-pokemon' : ''}" src="${pokemonSpriteUrl(p0.pokemon, 1, p0.shiny)}" data-fallback="${fallbackSpriteUrl(p0.pokemon.cls)}" onerror="this.onerror=null;this.src=this.dataset.fallback" alt="${escapeHTML(p0.pokemon.name)}">
    <div class="vs-pname">${escapeHTML(p0.pokemon.name)}</div>
    <div class="vs-player-name">${escapeHTML(p0.name)}</div>`;
  }

  const p2El = document.getElementById('vs-p2');
  if (p2El) {
    p2El.classList.toggle('shiny-pokemon', !!p1.shiny);
    p2El.innerHTML = `
    <img class="vs-sprite${p1.shiny ? ' shiny-pokemon' : ''}" src="${pokemonSpriteUrl(p1.pokemon, 1, p1.shiny)}" data-fallback="${fallbackSpriteUrl(p1.pokemon.cls)}" onerror="this.onerror=null;this.src=this.dataset.fallback" alt="${escapeHTML(p1.pokemon.name)}" style="transform:scaleX(-1)">
    <div class="vs-pname">${escapeHTML(p1.pokemon.name)}</div>
    <div class="vs-player-name">${escapeHTML(p1.name)}</div>`;
  }

  const gfEl = document.getElementById('vs-goes-first');
  if (gfEl) gfEl.textContent = `${vsFirst.toUpperCase()} GOES FIRST!`;
}

function startBattle() {
  gameActive = true;
  currentPlayer = startingPlayer;
  round = 1;
  xAttackBonus = 0;
  seenThrows = 0;

  // Init HP
  players.forEach(p => {
    p.maxHp = p.pokemon.baseHp;
    p.hp = p.pokemon.baseHp;
    p.dmgBoost = 0;
  });

  buildBattleUI();
  updateBattleField();
  startTurn();
}

function buildBattleUI() {
  players.forEach((p, i) => {
    const sideEl = document.getElementById(`poke-side-${i}`);
    if (!sideEl) return;
    sideEl.querySelector('.poke-player-tag').textContent = p.name.toUpperCase();
    sideEl.querySelector('.poke-name-tag').innerHTML = playerPokemonNameHTML(p);
    const evNameEl = sideEl.querySelector('.poke-evolved-name');
    if (evNameEl) evNameEl.textContent = '';
    const ptEl = sideEl.querySelector('.passive-tag');
    if (ptEl) ptEl.innerHTML = playerPokemonTypeHTML(p);
    const img = document.getElementById(`sprite-${i}`);
    setPlayerPokemonSprite(img, p);
    syncShinyClass(i);
    const badge = document.getElementById(`evolved-badge-${i}`);
    if (badge) badge.classList.remove('visible');
    const statusBadge = document.getElementById(`status-badge-${i}`);
    if (statusBadge) { statusBadge.classList.remove('visible', 'status-burn', 'status-paralyse'); }
  });
  resetDartSlots();
  const nextBtn = document.getElementById('next-player-btn');
  if (nextBtn) nextBtn.style.display = 'none';
}

// =============================================
// TURN FLOW
// =============================================
function startTurn() {
  const p = players[currentPlayer];
  hpAtTurnStart = [players[0].hp, players[1].hp];
  xAttackBonus = 0;
  currentDarts = [];
  p.evoScoreOffset = 0;
  seenThrows = 0;
  turnEnded = false;
  p._maxDartsThisTurn = 3;

  if (p.pokemon && p.pokemon.randomType) {
    p.arceusType = ARCEUS_TYPES[rand(0, ARCEUS_TYPES.length - 1)];
    flash(`ARCEUS ${p.arceusType.toUpperCase()} TYPE!`, 'var(--poke-yellow)');
    aSpeak(`Arceus ${p.arceusType} type!`);
  }

  const nextBtn = document.getElementById('next-player-btn');
  if (nextBtn) nextBtn.style.display = 'none';

  // Burn damage at turn start (bypasses endure)
  if (p.status === 'burn') {
    p.hp = Math.max(0, p.hp - 20);
    flash('BURN DAMAGE! -20 HP', 'var(--poke-red)');
    aSpeak('Burn damage!');
    aSfx(sfxStatus);
    updateBattleField();
    if (p.hp <= 0) {
      turnEnded = true;
      setTimeout(() => endWithWinner(1 - currentPlayer), tDelay(600));
      return;
    }
  }

  // Paralyse: 2 darts only
  if (p.status === 'paralyse') {
    p._maxDartsThisTurn = 2;
    aSpeak('Paralysed! 2 darts only.');
    flash('PARALYSED! 2 DARTS', 'var(--amber)');
  }

  // Decrement status duration
  if (p.status) {
    p.statusDurtn--;
    if (p.statusDurtn <= 0) {
      p.status = null;
      p.statusDurtn = 0;
    }
  }

  // Dart lost from previous bull steal
  if (p.dartLostNext) {
    p._maxDartsThisTurn = Math.max(1, p._maxDartsThisTurn - 1);
    p.dartLostNext = false;
    flash('DART STOLEN! Fewer darts this turn.', '#a78bfa');
    aSpeak('A dart was stolen!');
  }

  // Finish mode: opponent has ≤ 20 HP — must hit exactly
  finishMode = false;
  finishTotal = 0;
  finishTarget = 0;
  const oppForFinish = players[1 - currentPlayer];
  if (oppForFinish.hp > 0 && oppForFinish.hp <= 20) {
    finishMode = true;
    finishTarget = oppForFinish.hp;
    aSfx(sfxFinishMode);
    flash(`FINISH! Hit ${finishTarget} exactly!`, 'var(--poke-yellow)');
  }

  resetDartSlots();
  const nameEl = document.getElementById('turn-player-name');
  if (nameEl) { nameEl.textContent = p.name; nameEl.classList.toggle('cpu-turn', p.isCpu); }
  const subEl = document.getElementById('turn-sub');
  if (subEl) subEl.textContent = p.isCpu ? 'Computer thinking...' : (finishMode ? `Hit ${finishTarget} EXACTLY` : 'Throw your darts');
  applyTurnIndicator();

  updateBattleField();
  updateScoringGuide();
  if (p.isCpu) setTimeout(() => runCpuTurn(), tDelay(finishMode ? 1500 : 2000));
}

function advanceTurn() {
  if (!gameActive || advancing) return;
  advancing = true;
  if (missTimer) { clearTimeout(missTimer); missTimer = null; }

  // Track CP for the player who just finished
  const prev = players[currentPlayer];
  if (currentDarts.length > 0) {
    prev.cpTurns++;
    checkEvolution(currentPlayer);
  }
  if (prev.megaActive) {
    if (prev.megaJustActivated) {
      prev.megaJustActivated = false;
    } else {
      prev.megaTurnsLeft--;
      if (prev.megaTurnsLeft <= 0) endMegaEvolution(currentPlayer);
    }
  }

  let next = (currentPlayer + 1) % 2;
  if (next === 0) round++;
  currentPlayer = next;

  updateBattleField();
  const guide = document.getElementById('scoring-guide');
  if (guide) guide.classList.remove('visible');
  setTimeout(() => {
    const callName = players[currentPlayer].isCpu ? players[currentPlayer].name.split(' ')[0] : players[currentPlayer].name;
    aSpeak(callName);
    startTurn();
    advancing = false;
  }, tDelay(600));
}

function resetDartSlots() {
  [0, 1, 2].forEach(i => {
    const el = document.getElementById(`ds${i}`);
    if (!el) return;
    el.className = 'dart-slot';
    el.innerHTML = `<div class="dart-slot-label">${['1ST','2ND','3RD'][i]}</div><div class="dart-slot-val">—</div>`;
  });
}

function updateDartSlot(idx, label, cssClass) {
  const el = document.getElementById(`ds${idx}`);
  if (!el) return;
  el.className = `dart-slot ${cssClass}`;
  el.innerHTML = `<div class="dart-slot-label">${['1ST','2ND','3RD'][idx]}</div><div class="dart-slot-val">${label}</div>`;
}

// =============================================
// DART REGISTRATION
// =============================================
function registerDart(seg) {
  if (!gameActive || turnEnded) return;
  const p = players[currentPlayer];
  if (currentDarts.length >= p._maxDartsThisTurn) return;

  saveState();
  p.dartsThrown++;
  const dartIdx = currentDarts.length;

  // ── FINISH MODE ──────────────────────────────────────
  if (finishMode) {
    const num = seg ? Number(seg.number) : 0;
    const mul = seg ? Number(seg.multiplier || 1) : 0;

    // Bull or Bullseye heals in finish mode
    if (num === 25) {
      const healAmt = mul === 2 ? 50 : 25;
      p.hp = Math.min(p.maxHp, p.hp + healAmt);
      p.totalHeal += healAmt;
      aSfx(sfxPokeHeal);
      flash(`+${healAmt} HP (${mul === 2 ? 'Bullseye' : 'Bull'} Heal!)`, 'var(--hp-green)');
      aSpeak(`${healAmt} healed!`);
      currentDarts.push({ label: `+${healAmt}HP`, type: 'heal', amount: healAmt, score: num * mul, mul });
      updateDartSlot(dartIdx, `+${healAmt}HP`, 'heal');
      updateBattleField();
    } else if (!num || num === 0) {
      aSfx(sfxMiss);
      flash('Miss!', 'var(--muted)');
      currentDarts.push({ label: 'Miss', type: 'miss', amount: 0, score: 0, mul: 0 });
      updateDartSlot(dartIdx, 'Miss', 'miss');
    } else {
      // Face value only — multiplier ignored
      finishTotal += num;
      if (finishTotal > finishTarget) {
        // Bust
        aSfx(sfxBust);
        flash('BUST! No finish!', 'var(--poke-red)');
        aSpeak('Bust!');
        currentDarts.push({ label: 'BUST!', type: 'miss', amount: 0, score: 0, mul });
        updateDartSlot(dartIdx, 'BUST!', 'miss');
        endFinishTurn();
        return;
      } else if (finishTotal === finishTarget) {
        // Win!
        players[1 - currentPlayer].hp = 0;
        aSfx(sfxPokeDamage);
        flash(`FINISH! ${finishTarget} EXACTLY! 🎯`, 'var(--gold)');
        aSpeak('Finish!');
        currentDarts.push({ label: `${num}✓`, type: 'crit', amount: num, score: num * mul, mul });
        updateDartSlot(dartIdx, `${num}✓`, 'scored');
        updateBattleField();
        turnEnded = true;
        setTimeout(() => endWithWinner(currentPlayer), tDelay(800));
        return;
      } else {
        aSfx(sfxPokeDamage);
        const rem = finishTarget - finishTotal;
        flash(`${num} hit — need ${rem} more`, 'var(--amber)');
        currentDarts.push({ label: `${num} (${finishTotal})`, type: 'hit', amount: num, score: num * mul, mul });
        updateDartSlot(dartIdx, `${num}`, 'hit');
        updateBattleField();
      }
    }

    if (currentDarts.length >= p._maxDartsThisTurn) {
      flash('No finish this turn', 'var(--muted)');
      endFinishTurn();
    }
    return;
  }

  // ── NORMAL MODE ──────────────────────────────────────
  const result = calcEffect(seg, p, players[1 - currentPlayer]);
  applyTypeAdvantage(result, p, players[1 - currentPlayer]);
  const wasEndured = applyEffect(result, currentPlayer);

  const label = result.label || (result.type === 'miss' ? 'Miss' : String(result.amount));
  let slotClass = 'hit';
  if (result.type === 'miss') slotClass = 'miss';
  else if (result.type === 'heal') slotClass = 'heal';
  else if (result.type === 'status') slotClass = 'status';
  else if (result.type === 'crit') slotClass = 'scored';

  currentDarts.push({ label, type: result.type, amount: result.amount, score: result.score || 0, mul: result.mul || 0 });
  updateDartSlot(dartIdx, label, slotClass);

  if (result.type !== 'miss') checkEvolution(currentPlayer);
  if (checkWin()) { turnEnded = true; return; }
  updateBattleField();

  const maxed = currentDarts.length >= p._maxDartsThisTurn;
  if (maxed || wasEndured) {
    turnEnded = true;
    checkEvolution(currentPlayer);
    if (!p.isCpu) {
      const nextBtn = document.getElementById('next-player-btn');
      if (nextBtn) nextBtn.style.display = '';
    } else {
      setTimeout(() => advanceTurn(), tDelay(800));
    }
  }
}

function endFinishTurn() {
  turnEnded = true;
  const p = players[currentPlayer];
  if (!p.isCpu) {
    const nextBtn = document.getElementById('next-player-btn');
    if (nextBtn) nextBtn.style.display = '';
  } else {
    setTimeout(() => advanceTurn(), tDelay(800));
  }
}

// =============================================
// CALC EFFECT
// =============================================
function calcEffect(seg, attacker, defender) {
  const miss = !seg || !seg.number || seg.number === 0;
  if (miss) return { type:'miss', amount:0, score:0, label:'Miss', mul:0 };

  const num = Number(seg.number);
  const mul = Number(seg.multiplier || 1);
  const score = num * mul;
  const isSniper  = attacker.pokemon.cls === 'Sniper';
  const isTank    = attacker.pokemon.cls === 'Tank';
  const isBrawler = attacker.pokemon.cls === 'Brawler';
  const isStatus  = attacker.pokemon.cls === 'Status';
  const boost = attacker.dmgBoost + xAttackBonus;

  // Bullseye (D25)
  if (num === 25 && mul === 2) {
    const dmg = 80 + boost;
    const si = isStatus ? (Math.random() < .5 ? 'burn' : 'paralyse') : null;
    return { type:'crit', amount:dmg, score, label:`D25 CRIT!`, mul:2,
      msg:`CRITICAL HIT! ${dmg} DMG!`, statusInflict: si };
  }

  // Bull (B25)
  if (num === 25 && mul === 1) {
    const items = ['potion','xattack','statuscure'];
    const item = items[rand(0, items.length - 1)];
    const si = isStatus ? (Math.random() < .5 ? 'burn' : 'paralyse') : null;
    if (gameMode === 'gym') {
      const dmg = 25 + boost;
      return { type:'bull', amount:dmg, score, label:`B25 +item`, mul:1,
        msg:`Bull! ${dmg} DMG + ${item}`, item, statusInflict: si };
    }
    return { type:'bull', amount:0, score, label:`B25 ${item}`, mul:1,
      msg:`Poké Ball! Item: ${item}`, item, statusInflict: si };
  }

  // Regular numbers
  const isOdd  = num % 2 !== 0;
  const isEven = !isOdd;
  const brawlerBonus = isBrawler && isOdd ? 5 : 0;
  const tankHealBonus = 0;

  if (gameMode === 'wild') {
    if (mul === 1 && isOdd) {
      const dmg = rand(10, 20) + boost + brawlerBonus;
      return { type:'damage', amount:dmg, score, label:`S${num} -${dmg}`, mul:1 };
    }
    if (mul === 1 && isEven) {
      const heal = rand(10, 15) + tankHealBonus;
      return { type:'heal', amount:heal, score, label:`S${num} +${heal}HP`, mul:1 };
    }
    if (mul === 2) {
      const dmg = rand(25, 40) + boost + brawlerBonus;
      return { type:'damage', amount:dmg, score, label:`D${num} -${dmg}`, mul:2 };
    }
    if (mul === 3) {
      const lo = isSniper ? 52 : 45, hi = isSniper ? 70 : 60;
      const dmg = rand(lo, hi) + boost + brawlerBonus;
      return { type:'damage', amount:dmg, score, label:`T${num} -${dmg}`, mul:3 };
    }
  } else {
    // gym mode
    if (mul === 1 && isOdd) {
      const dmg = num + boost + brawlerBonus;
      return { type:'damage', amount:dmg, score, label:`S${num} -${dmg}`, mul:1 };
    }
    if (mul === 1 && isEven) {
      const heal = num + tankHealBonus;
      return { type:'heal', amount:heal, score, label:`S${num} +${heal}HP`, mul:1 };
    }
    if (mul === 2) {
      const dmg = num * 2 + boost + brawlerBonus;
      return { type:'damage', amount:dmg, score, label:`D${num} -${dmg}`, mul:2 };
    }
    if (mul === 3) {
      const mult = isSniper ? 3.5 : 3;
      const dmg = Math.round(num * mult) + boost + brawlerBonus;
      return { type:'damage', amount:dmg, score, label:`T${num} -${dmg}`, mul:3 };
    }
  }

  return { type:'miss', amount:0, score:0, label:'Miss', mul:0 };
}

function applyTypeAdvantage(result, attacker, defender) {
  const canBoost = ['damage', 'crit', 'bull'].includes(result.type) && result.amount > 0;
  if (!canBoost || typeAdvantageMultiplier(attacker, defender) === 1) return;
  result.amount = Math.round(result.amount * 1.2);
  result.typeBonus = true;
  if (result.type === 'damage') result.label = `${result.label.split(' ')[0]} -${result.amount} ADV`;
  if (result.type === 'crit') result.label = 'D25 ADV!';
  if (result.type === 'bull') result.label = 'B25 ADV';
}

// =============================================
// APPLY EFFECT
// =============================================
function applyEffect(result, attackerIdx) {
  const pi = attackerIdx, oi = 1 - attackerIdx;
  const attacker = players[pi], opp = players[oi];
  let wasEndured = false;

  if (result.type === 'damage') {
    wasEndured = checkEndure(pi, result.amount);
    if (!wasEndured) {
      opp.hp = Math.max(0, opp.hp - result.amount);
      attacker.totalDmg += result.amount;
    }
    aSfx(sfxPokeDamage);
    flash(`${result.typeBonus ? 'TYPE ADVANTAGE! ' : ''}-${result.amount} HP`, 'var(--poke-red)');
    aSpeak(`${result.amount} damage${result.typeBonus ? ', type advantage!' : '!'}`);
  } else if (result.type === 'heal') {
    const healed = Math.min(attacker.maxHp - attacker.hp, result.amount);
    attacker.hp = Math.min(attacker.maxHp, attacker.hp + result.amount);
    attacker.totalHeal += healed;
    aSfx(sfxPokeHeal);
    flash(`+${result.amount} HP`, 'var(--hp-green)');
    aSpeak(`Healed ${result.amount}!`);
  } else if (result.type === 'crit') {
    wasEndured = checkEndure(pi, result.amount);
    if (!wasEndured) {
      opp.hp = Math.max(0, opp.hp - result.amount);
      attacker.totalDmg += result.amount;
    }
    aSfx(sfxPokeCrit);
    flash(`${result.typeBonus ? 'TYPE ADVANTAGE! ' : ''}CRITICAL HIT! -${result.amount}`, '#ff4444');
    aSpeak(`Critical hit! ${result.amount} damage${result.typeBonus ? ', type advantage!' : '!'}`);
    if (result.statusInflict) {
      setTimeout(() => applyStatus(oi, result.statusInflict), tDelay(400));
    }
  } else if (result.type === 'bull') {
    if (result.item) applyItem(result.item, attacker);
    if (gameMode === 'gym' && result.amount > 0) {
      wasEndured = checkEndure(pi, result.amount);
      if (!wasEndured) {
        opp.hp = Math.max(0, opp.hp - result.amount);
        attacker.totalDmg += result.amount;
      }
      if (result.typeBonus) flash(`TYPE ADVANTAGE! -${result.amount} HP`, 'var(--poke-red)');
    }
    aSfx(sfxBull);
    if (result.statusInflict) {
      setTimeout(() => applyStatus(oi, result.statusInflict), tDelay(600));
    }
  } else if (result.type === 'miss') {
    aSfx(sfxMiss);
    flash('Miss!', 'var(--muted)');
  }

  if (result.statusInflict === 'dartsteal') {
    opp.dartLostNext = true;
    flash('DART STOLEN!', '#a78bfa');
  }

  return wasEndured;
}

function applyItem(item, player) {
  if (item === 'potion') {
    player.hp = Math.min(player.maxHp, player.hp + 60);
    player.totalHeal += 60;
    flash('+60 HP (Potion!)', 'var(--hp-green)');
    aSpeak('Potion!');
    aSfx(sfxPokeHeal);
  } else if (item === 'xattack') {
    xAttackBonus = 15;
    flash('X-Attack! +15 DMG', 'var(--amber)');
    aSpeak('X Attack!');
  } else if (item === 'statuscure') {
    player.status = null;
    player.statusDurtn = 0;
    flash('Status Cured!', 'var(--green)');
    aSpeak('Status Cure!');
  }
}

function checkEndure(attackerIdx, damage) {
  const oi = 1 - attackerIdx;
  const opp = players[oi];
  if (opp.hp - damage < 0 && opp.hp > 0) {
    opp.hp = 1;
    flash('ENDURE!', 'var(--poke-red)');
    aSpeak('Endures the hit!');
    aSfx(sfxMiss);
    return true;
  }
  return false;
}

function applyStatus(victimIdx, statusType) {
  const victim = players[victimIdx];
  victim.status = statusType;
  victim.statusDurtn = 1;
  const label = statusType === 'burn' ? 'BURNED!' : 'PARALYSED!';
  const color = statusType === 'burn' ? 'var(--poke-red)' : 'var(--amber)';
  flash(label, color);
  aSpeak(statusType === 'burn' ? 'Burned!' : 'Paralysed!');
  aSfx(sfxStatus);
  updateBattleField();
}

// =============================================
// EVOLUTION
// =============================================
function currentTurnEvolutionScore() {
  return currentDarts
    .filter(d => d.type !== 'miss' && !d.evoUsed)
    .reduce((total, d) => total + (Number(d.score) || 0), 0);
}

function markCurrentEvolutionScoreUsed() {
  currentDarts.forEach(d => {
    if (d.type !== 'miss') d.evoUsed = true;
  });
}

function checkEvolution(playerIdx) {
  const p = players[playerIdx];
  if (p.pokemon.name === 'Eevee' && p.stage > 1) return;
  if (p.megaActive) return;
  const maxStage = p.pokemon.maxStage || 3;
  const turnScore = currentTurnEvolutionScore();
  if (playerMegaOptions(p).length && turnScore >= 50) {
    triggerMegaEvolution(playerIdx);
    return;
  }
  if ((p.stage || 1) >= maxStage || p.pokemon.megaEvolution) return;
  let targetStage = p.stage;
  if (p.stage < 2 && turnScore >= 30) targetStage = 2;
  else if (p.stage === 2 && turnScore >= 45) targetStage = 3;
  targetStage = Math.min(targetStage, maxStage);
  if (targetStage > p.stage) triggerEvolution(playerIdx, targetStage);
}

function triggerMegaEvolution(playerIdx) {
  const p = players[playerIdx];
  const options = playerMegaOptions(p);
  if (!options.length) return;
  p.megaBaseStage = p.stage || 1;
  p.megaPick = options[rand(0, options.length - 1)];
  p.megaActive = true;
  p.megaTurnsLeft = 2;
  p.megaJustActivated = true;
  p.evolved = true;
  p.stage = p.pokemon.maxStage || p.stage || 1;
  p.maxHp += 100;
  p.hp = Math.min(p.hp + 100, p.maxHp);
  p.evoScoreOffset = 0;
  markCurrentEvolutionScoreUsed();

  const img = document.getElementById(`sprite-${playerIdx}`);
  if (img) {
    setPlayerPokemonSprite(img, p);
    syncShinyClass(playerIdx);
    playMegaAnimation(playerIdx);
    img.classList.add('evolving');
    setTimeout(() => img.classList.remove('evolving'), tDelay(850));
  }

  const newName = playerPokemonStageName(p);
  flash(`${newName.toUpperCase()}! +100 HP`, 'var(--poke-yellow)');
  aSpeak(`${newName}!`);
  aSfx(sfxEvolution);
  const sideEl = document.getElementById(`poke-side-${playerIdx}`);
  if (sideEl) {
    const nameEl = sideEl.querySelector('.poke-name-tag');
    const ptEl = sideEl.querySelector('.passive-tag');
    const enEl = sideEl.querySelector('.poke-evolved-name');
    if (nameEl) nameEl.innerHTML = playerPokemonNameHTML(p);
    if (ptEl) ptEl.innerHTML = playerPokemonTypeHTML(p);
    if (enEl) enEl.textContent = newName;
  }
}

function triggerEvolution(playerIdx, targetStage = 2) {
  const p = players[playerIdx];
  const oldStage = p.stage || 1;
  const stageGain = targetStage - oldStage;
  if (p.pokemon.name === 'Eevee' && !p.eeveeEvolution && p.pokemon.eeveelutions) {
    p.eeveeEvolution = p.pokemon.eeveelutions[rand(0, p.pokemon.eeveelutions.length - 1)];
  }
  const branchAtStage = p.pokemon.branchAtStage || 3;
  if (targetStage >= branchAtStage && !p.branchEvolution && p.pokemon.finalEvolutions) {
    p.branchEvolution = p.pokemon.finalEvolutions[rand(0, p.pokemon.finalEvolutions.length - 1)];
  }
  p.evolved = true;
  p.stage = targetStage;
  const newName = playerPokemonStageName(p);
  const hpGain = 50 * stageGain;
  p.maxHp += hpGain;
  p.hp = Math.min(p.hp + hpGain, p.maxHp);
  p.dmgBoost += 5 * stageGain;
  p.evoScoreOffset = 0;
  markCurrentEvolutionScoreUsed();

  const img = document.getElementById(`sprite-${playerIdx}`);
  if (img) {
    setPlayerPokemonSprite(img, p);
    syncShinyClass(playerIdx);
    img.classList.add('evolving');
    setTimeout(() => img.classList.remove('evolving'), tDelay(850));
  }

  // No new sprite (msid === sid): add gold glow class
  const pickedEvolution = playerEvolutionPick(p);
  const evolvedSpriteId = pickedEvolution ? pickedEvolution.sid : (targetStage >= 3 ? p.pokemon.fsid : p.pokemon.msid);
  if (evolvedSpriteId === p.pokemon.sid) {
    if (img) img.classList.add('glow-evolved');
  }
  p.evolvedSprite = evolvedSpriteId !== p.pokemon.sid;

  const badge = document.getElementById(`evolved-badge-${playerIdx}`);
  if (badge) { badge.textContent = newName; badge.classList.add('visible'); }

  const sideEl = document.getElementById(`poke-side-${playerIdx}`);
  if (sideEl) {
    const nameEl = sideEl.querySelector('.poke-name-tag');
    const ptEl = sideEl.querySelector('.passive-tag');
    const enEl = sideEl.querySelector('.poke-evolved-name');
    if (nameEl) nameEl.innerHTML = playerPokemonNameHTML(p);
    if (ptEl) ptEl.innerHTML = playerPokemonTypeHTML(p);
    if (enEl) enEl.textContent = newName;
  }

  flash(`${isMega ? 'MEGA EVOLUTION' : 'EVOLUTION'}! ${newName}!`, 'var(--gold)');
  aSpeak(`${voicePokemonName(p.pokemon)} ${isMega ? 'mega evolved into' : 'evolved into'} ${newName}!`);
  aSfx(sfxEvolution);
}

// =============================================
// WIN CHECK
// =============================================
function checkWin() {
  const opp = players[1 - currentPlayer];
  if (opp.hp <= 0) {
    opp.hp = 0;
    updateBattleField();
    setTimeout(() => endWithWinner(currentPlayer), tDelay(600));
    return true;
  }
  return false;
}

function playWinMusic() {
  const ctx = gAC(), t = ctx.currentTime;
  const melody = [
    [392, 0], [523, .12], [659, .24], [784, .36],
    [1047, .56], [784, .72], [1047, .88], [1319, 1.08],
  ];
  melody.forEach(([f, w]) => {
    tone(f, 'triangle', t + w, .28, .18, ctx);
    tone(f * 1.5, 'sine', t + w + .03, .18, .08, ctx);
  });
  noiz(t + .52, .18, .05, 2200, ctx);
}
function stopWinMusic() {
}

async function endWithWinner(idx) {
  gameActive = false;
  const winner = players[idx], loser = players[1 - idx];
  if (!testMode && sfxEnabled) playWinMusic();
  aSpeak(`${winner.name} wins!`, true);

  const avgCp = p => p.cpTurns > 0 ? Math.round((p.totalDmg + p.totalHeal) / p.cpTurns) : 0;
  const winnerCp = avgCp(winner);
  const loserCp  = avgCp(loser);

  const legStr = legNumber > 0 ? `Leg ${legNumber + 1} · ` : '';
  document.getElementById('win-name').textContent = winner.name;
  document.getElementById('win-details').innerHTML =
    `${legStr}${winner.pokemon.name} · ${gameMode.toUpperCase()}<br>` +
    `<span style="font-size:14px;color:var(--muted)">Avg CP: ${winnerCp} · Dealt: ${winner.totalDmg} DMG · Healed: ${winner.totalHeal} HP</span>`;

  const othersEl = document.getElementById('win-others');
  if (othersEl) othersEl.innerHTML = `<div class="win-other-card">
    <div class="win-other-name">${escapeHTML(loser.name)}</div>
    <div class="win-other-score">${escapeHTML(loser.pokemon.name)}</div>
    <div class="win-other-score">Avg CP: ${loserCp} · Dealt: ${loser.totalDmg}</div>
  </div>`;

  players.forEach((p, i) => {
    if (!p.isCpu) savePlayerStat(p.name, p.flag, i === idx, avgCp(p), p.pokemon.name, gameMode);
  });

  if (!testMode) spawnConfetti();
  showScreen('winner');
}

function nextLeg() {
  if (players.length !== 2) return;
  stopWinMusic();
  legNumber++;
  startingPlayer = (startingPlayer + 1) % 2;
  launchLeg();
}

function goToMenu() {
  gameActive = false;
  resetThrowTracking();
  stopWinMusic();
  document.getElementById('confetti').innerHTML = '';
  window.location.href = '../index.html';
}

function endGame() {
  gameActive = false;
  draftPhase = false;
  resetThrowTracking();
  stopWinMusic();
  document.getElementById('confetti').innerHTML = '';
  showScreen('setup');
}

// =============================================
// UPDATE BATTLE UI
// =============================================
function updateBattleField() {
  players.forEach((p, i) => {
    const pct = Math.max(0, Math.round((p.hp / Math.max(1, p.maxHp)) * 100));
    const fillEl = document.getElementById(`hp-fill-${i}`);
    if (fillEl) {
      fillEl.style.width = pct + '%';
      fillEl.classList.remove('hp-mid', 'hp-low');
      if (pct < 25) fillEl.classList.add('hp-low');
      else if (pct < 50) fillEl.classList.add('hp-mid');
    }
    const valEl = document.getElementById(`hp-val-${i}`);
    if (valEl) valEl.textContent = `${Math.max(0,p.hp)} / ${p.maxHp} HP`;

    const img = document.getElementById(`sprite-${i}`);
    if (img) {
      setPlayerPokemonSprite(img, p);
      syncShinyClass(i);
      img.classList.toggle('active-turn', i === currentPlayer && gameActive);
      if (p.evolved && !p.evolvedSprite) img.classList.add('glow-evolved');
    }
    const sideEl = document.getElementById(`poke-side-${i}`);
    if (sideEl && p.pokemon) {
      const nameEl = sideEl.querySelector('.poke-name-tag');
      const typeEl = sideEl.querySelector('.passive-tag');
      const evolvedNameEl = sideEl.querySelector('.poke-evolved-name');
      const badge = document.getElementById(`evolved-badge-${i}`);
      if (nameEl) nameEl.innerHTML = playerPokemonNameHTML(p);
      if (typeEl) typeEl.innerHTML = playerPokemonTypeHTML(p);
      if (evolvedNameEl) evolvedNameEl.textContent = p.stage > 1 ? playerPokemonStageName(p) : '';
      if (badge) {
        badge.classList.toggle('visible', p.stage > 1);
        badge.textContent = p.stage > 1 ? playerPokemonStageName(p) : '';
      }
    }

    const statusBadge = document.getElementById(`status-badge-${i}`);
    if (statusBadge) {
      statusBadge.classList.toggle('visible', !!p.status);
      statusBadge.classList.remove('status-burn','status-paralyse');
      if (p.status) {
        statusBadge.classList.add(`status-${p.status}`);
        statusBadge.textContent = p.status === 'burn' ? '🔥 BURN' : '⚡ PARA';
      }
    }
  });

  const roundEl = document.getElementById('battle-round-num');
  if (roundEl) roundEl.textContent = round;

  if (gameActive) {
    const p = players[currentPlayer];
    const hint = getTargetSuggestion(p);
    const subText = p.isCpu ? 'CPU is thinking...' : (finishMode ? `Hit ${finishTarget - finishTotal} exactly` : 'Throw your darts');
    setActionZone(hint, subText);
    const az = document.querySelector('.action-zone');
    if (az) az.classList.toggle('finish-mode', finishMode);
  }
  applyTurnIndicator();
  updateEvolutionTarget();
}

function applyTurnIndicator() {
  // Color-code the active player banner and battle side
  const info = document.querySelector('#poke-panel .turn-info');
  if (info) {
    info.classList.remove('turn-p0', 'turn-p1');
    if (gameActive) info.classList.add('turn-p' + currentPlayer);
    if (players[0]) info.style.setProperty('--p1-color', players[0].color);
    if (players[1]) info.style.setProperty('--p2-color', players[1].color);
  }
  [0, 1].forEach(i => {
    const side = document.getElementById(`poke-side-${i}`);
    if (!side) return;
    side.classList.remove('active-side-p0', 'active-side-p1');
    if (gameActive && i === currentPlayer) side.classList.add('active-side-p' + i);
    if (players[i]) side.style.setProperty(i === 0 ? '--p1-color' : '--p2-color', players[i].color);
  });
}

function setActionZone(main, sub) {
  const mainEl = document.getElementById('action-main');
  const subEl  = document.getElementById('action-sub');
  if (mainEl) mainEl.textContent = main;
  if (subEl)  subEl.textContent  = sub;
}

function updateEvolutionTarget() {
  const el = document.getElementById('evo-target');
  if (!el) return;
  const p = players[currentPlayer];
  if (!gameActive || !p || !p.pokemon) {
    el.textContent = '';
    el.classList.remove('mega-target');
    return;
  }
  const turnScore = currentTurnEvolutionScore();
  el.classList.toggle('mega-target', p.megaActive || playerMegaOptions(p).length > 0);
  if (p.megaActive) {
    el.textContent = `Mega Active: ${p.megaTurnsLeft} turns left`;
  } else if (playerMegaOptions(p).length) {
    el.textContent = `Mega Evolution: ${turnScore}/50 total this turn`;
  } else if ((p.stage || 1) < 2) {
    el.textContent = `Evolution: ${turnScore}/30 total this turn`;
  } else if ((p.stage || 1) < (p.pokemon.maxStage || 3)) {
    el.textContent = `Final Evolution: ${turnScore}/45 total this turn`;
  } else {
    el.textContent = 'Fully evolved';
  }
}

function updateScoringGuide() {
  const guide = document.getElementById('scoring-guide');
  const grid  = document.getElementById('sg-grid');
  const passiveEl = document.getElementById('sg-passive');
  if (!guide || !grid) return;

  const p = players[currentPlayer];
  if (!p || p.isCpu || !gameActive || !p.pokemon) {
    guide.classList.remove('visible');
    return;
  }
  guide.classList.add('visible');

  if (finishMode) {
    const remaining = finishTarget - finishTotal;
    grid.innerHTML = `
      <div class="sg-item sg-mega" style="grid-column:1/-1;padding:16px;">
        <div class="sg-type" style="font-size:13px;letter-spacing:3px;">⚡ FINISH MODE ⚡</div>
        <div class="sg-value gold" style="font-size:28px;margin:6px 0;">${remaining} HP TO GO</div>
        <div class="sg-label" style="color:var(--text);font-size:12px;">Face value only · Doubles &amp; Trebles = Single · Bull/Bullseye Heals you</div>
      </div>`;
    if (passiveEl) passiveEl.textContent = `Hit ${finishTarget} exactly to win! Total so far: ${finishTotal}`;
    return;
  }

  const cls    = p.pokemon.cls;
  const isWild = gameMode === 'wild';
  const boost  = p.dmgBoost + xAttackBonus;
  const bStr   = boost > 0 ? ` +${boost}` : '';
  const isSni  = cls === 'Sniper';
  const isTank = cls === 'Tank';
  const isBraw = cls === 'Brawler';
  const isStat = cls === 'Status';

  const rows = [
    {
      type: 'SINGLE ODD',
      value: isWild ? `${10+boost}–${20+boost}` : `FACE VAL${bStr}${isBraw?' +10':''}`,
      label: 'DAMAGE' + (isBraw ? ' (+10 BONUS)' : ''),
      valCls: 'dmg', itemCls: 'sg-dmg',
    },
    {
      type: 'SINGLE EVEN',
      value: isWild ? '10–15' : 'FACE VAL',
      label: 'HEAL',
      valCls: 'heal', itemCls: 'sg-heal',
    },
    {
      type: 'DOUBLE',
      value: isWild ? `${25+boost}–${40+boost}` : `FACE ×2${bStr}`,
      label: 'DAMAGE',
      valCls: 'dmg', itemCls: 'sg-dmg',
    },
    {
      type: 'TREBLE',
      value: isWild
        ? `${(isSni?52:45)+boost}–${(isSni?70:60)+boost}`
        : `FACE ×${isSni?'3.5':'3'}${bStr}`,
      label: 'DAMAGE' + (isSni ? ' (SNIPER ×3.5)' : ''),
      valCls: 'dmg', itemCls: 'sg-dmg',
    },
    {
      type: 'BULL',
      value: isWild ? 'ITEM' : `25${bStr}`,
      label: isWild
        ? 'RANDOM ITEM' + (isStat ? ' + STATUS' : '')
        : 'DMG + ITEM' + (isStat ? ' + STATUS' : ''),
      valCls: isWild ? 'amber' : 'dmg',
      itemCls: isWild ? 'sg-item-type' : 'sg-dmg',
    },
    {
      type: 'BULLSEYE',
      value: `${80+boost}`,
      label: 'CRITICAL HIT' + (isStat ? ' + STATUS' : ''),
      valCls: 'gold', itemCls: 'sg-mega',
    },
  ];

  grid.innerHTML = rows.map(it => `
    <div class="sg-item ${it.itemCls}">
      <div class="sg-type">${it.type}</div>
      <div class="sg-value ${it.valCls}">${it.value}</div>
      <div class="sg-label ${it.valCls}">${it.label}</div>
    </div>`).join('');

  if (passiveEl) {
    const typeLabel = playerPokemonTypeLabel(p);
    passiveEl.textContent = `Type: ${typeLabel}${boost > 0 ? `  ·  Current DMG Boost: +${boost}` : ''}${p.megaActive ? `  ·  Mega turns left: ${p.megaTurnsLeft}` : ''}  ·  Advantage: Fire beats Grass, Grass beats Water, Water beats Fire (1.2x)`;
  }
}

function getTargetSuggestion(p) {
  if (finishMode) {
    const remaining = finishTarget - finishTotal;
    return `⚡ FINISH! HIT ${remaining} EXACTLY`;
  }
  const cls = p.pokemon ? p.pokemon.cls : '';
  if (cls === 'Sniper') return 'AIM FOR TREBLES';
  if (cls === 'Tank' && gameMode === 'wild') return 'HIT EVENS TO HEAL';
  if (cls === 'Tank' && gameMode === 'gym')  return 'HIGH EVENS TO HEAL';
  if (cls === 'Brawler' && gameMode === 'wild') return 'HIT ODDS FOR +10 BONUS';
  if (cls === 'Brawler' && gameMode === 'gym')  return 'HIGH ODDS FOR BONUS';
  if (cls === 'Status') return 'HIT BULL FOR STATUS EFFECT';
  return 'THROW YOUR DARTS';
}

// =============================================
// CPU TURN
// =============================================
function runCpuTurn() {
  if (!gameActive) return;
  const p   = players[currentPlayer];
  const cpu = p.cpuData;
  let prevSeg = null;
  const tier = (typeof BOT_TIERS !== 'undefined' && cpu && BOT_TIERS[cpu.id]) ? BOT_TIERS[cpu.id] : null;
  const sigmaOverride = tier ? tier.sigma : undefined;

  function cpuPickTarget() {
    const opp = players[1 - currentPlayer];
    const hpPct = p.hp / p.maxHp;
    const oppPct = opp.hp / opp.maxHp;
    const highTier = sigmaOverride !== undefined && sigmaOverride <= 18;
    const wantsHeal = hpPct < 0.38 && oppPct > 0.22;

    // Finish mode: aim for exactly the remaining amount
    if (finishMode) {
      const remaining = finishTarget - finishTotal;
      return remaining >= 1 && remaining <= 20 ? remaining : 20;
    }

    if (gameMode === 'gym') {
      const evens = [2,4,6,8,10,12,14,16,18,20];
      const odds = [1,3,5,7,9,11,13,15,17,19];
      if (wantsHeal) return highTier ? 20 : (cpu.mpr >= 1.5 ? 18 : evens[rand(0, evens.length - 1)]);
      if (p.pokemon.cls === 'Status' && Math.random() < .2) return 25;
      if (p.pokemon.cls === 'Sniper') return highTier ? 19 : 17;
      return cpu.mpr >= 1.5 ? (Math.random() < .65 ? 19 : 17) : odds[rand(0, odds.length - 1)];
    }

    if (wantsHeal && highTier && Math.random() < .45) return 25;

    // Status class: aim for bull to inflict status
    if (p.pokemon.cls === 'Status' && Math.random() < .3) return 25;
    // Sniper: treble of high number
    if (p.pokemon.cls === 'Sniper') return cpu.mpr >= 2 ? 19 : 17;
    // Wild: any odd for damage
    const odds = [1,3,5,7,9,11,13,15,17,19];
    return cpu.mpr >= 1.5 ? (Math.random() < .6 ? 19 : 17) : odds[rand(0, odds.length-1)];
  }

  function doThrow(dartN, cb) {
    if (!gameActive || turnEnded) { cb && cb(); return; }
    const target = cpuPickTarget();
    const seg = generateCpuThrow(target, cpu.mpr, {
      prevSeg,
      dartsThrown: p.dartsThrown,
      sigmaOverride,
      cricketAim: gameMode === 'gym',
    });
    prevSeg = seg;
    registerDart(seg);
    cb && cb();
  }

  doThrow(0, () => {
    if (!gameActive || turnEnded) return;
    setTimeout(() => doThrow(1, () => {
      if (!gameActive || turnEnded) return;
      setTimeout(() => doThrow(2, () => {
        if (gameActive && !turnEnded) {
          turnEnded = true;
          checkEvolution(currentPlayer);
          setTimeout(() => advanceTurn(), tDelay(800));
        }
      }), tDelay(1000));
    }), tDelay(1000));
  });
}

// =============================================
// UNDO
// =============================================
function saveState() {
  stateHistory.push({
    players: players.map(p => ({
      hp: p.hp, maxHp: p.maxHp, stage: p.stage, eeveeEvolution: p.eeveeEvolution, dmgBoost: p.dmgBoost,
      evolved: p.evolved, evolvedSprite: p.evolvedSprite, shiny: p.shiny, branchEvolution: p.branchEvolution,
      megaActive: p.megaActive, megaTurnsLeft: p.megaTurnsLeft, megaJustActivated: p.megaJustActivated,
      megaPick: p.megaPick || null, megaBaseStage: p.megaBaseStage || null,
      arceusType: p.arceusType || null,
      evoScoreOffset: p.evoScoreOffset || 0,
      status: p.status, statusDurtn: p.statusDurtn,
      dartLostNext: p.dartLostNext, totalDmg: p.totalDmg,
      totalHeal: p.totalHeal, cpTurns: p.cpTurns, dartsThrown: p.dartsThrown,
    })),
    currentPlayer, currentDarts: [...currentDarts],
    seenThrows, turnEnded, round, xAttackBonus,
    finishMode, finishTotal, finishTarget,
  });
}

function undoLastDart() {
  if (!gameActive || stateHistory.length === 0) return;
  let last = stateHistory.pop();
  while (stateHistory.length > 0 && players[last.currentPlayer].isCpu) {
    last = stateHistory.pop();
  }
  currentPlayer  = last.currentPlayer;
  currentDarts   = last.currentDarts;
  seenThrows     = last.seenThrows;
  turnEnded      = last.turnEnded;
  round          = last.round;
  xAttackBonus   = last.xAttackBonus;
  finishMode     = last.finishMode;
  finishTotal    = last.finishTotal;
  finishTarget   = last.finishTarget;
  last.players.forEach((saved, i) => {
    const p = players[i];
    p.hp = saved.hp; p.maxHp = saved.maxHp; p.stage = saved.stage || 1; p.eeveeEvolution = saved.eeveeEvolution || null; p.branchEvolution = saved.branchEvolution || null;
    p.megaActive = !!saved.megaActive; p.megaTurnsLeft = saved.megaTurnsLeft || 0; p.megaJustActivated = !!saved.megaJustActivated;
    p.megaPick = saved.megaPick || null; p.megaBaseStage = saved.megaBaseStage || null;
    p.arceusType = saved.arceusType || null;
    p.evoScoreOffset = saved.evoScoreOffset || 0;
    p.dmgBoost = saved.dmgBoost; p.evolved = saved.evolved;
    p.evolvedSprite = saved.evolvedSprite; p.shiny = !!saved.shiny;
    p.status = saved.status; p.statusDurtn = saved.statusDurtn;
    p.dartLostNext = saved.dartLostNext;
    p.totalDmg = saved.totalDmg; p.totalHeal = saved.totalHeal;
    p.cpTurns = saved.cpTurns; p.dartsThrown = saved.dartsThrown;
  });
  if (missTimer) { clearTimeout(missTimer); missTimer = null; }
  resetDartSlots();
  currentDarts.forEach((d, idx) => {
    let cls = 'hit';
    if (d.type === 'miss') cls = 'miss';
    else if (d.type === 'heal') cls = 'heal';
    else if (d.type === 'status') cls = 'status';
    else if (d.type === 'crit') cls = 'scored';
    updateDartSlot(idx, d.label, cls);
  });
  updateBattleField();
  updateScoringGuide();
  const nameEl = document.getElementById('turn-player-name');
  if (nameEl) { nameEl.textContent = players[currentPlayer].name; nameEl.classList.toggle('cpu-turn', players[currentPlayer].isCpu); }
  const nextBtn = document.getElementById('next-player-btn');
  if (nextBtn) nextBtn.style.display = turnEnded && !players[currentPlayer].isCpu ? '' : 'none';
}

// =============================================
// MANUAL INPUT
// =============================================
function toggleKeypadMod(mod) {
  keypadMod = (keypadMod === mod) ? 1 : mod;
  document.querySelectorAll('#mod-double, .kp-mod[data-mod="2"]').forEach(el => el.classList.toggle('active', keypadMod === 2));
  document.querySelectorAll('#mod-treble, .kp-mod[data-mod="3"]').forEach(el => el.classList.toggle('active', keypadMod === 3));
}

function manualDraft(num) {
  if (!draftPhase || draftStep > 1) return;
  if (draftStep === 1 && players[1].isCpu) return;
  if (num < 1 || num > 20) return;
  let mul = keypadMod;
  const nameMap = { 1:'S', 2:'D', 3:'T' };
  const seg = { number: num, multiplier: mul, name: `${nameMap[mul]}${num}` };
  throwLog.push({ segment: seg, source: 'manual', phase: 'draft', player: draftStep, ts: Date.now() });
  registerDraftThrow(seg);
  if (keypadMod !== 1) toggleKeypadMod(keypadMod);
}

function manualDart(num) {
  if (draftPhase) {
    if (num >= 1 && num <= 20) manualDraft(num);
    return;
  }
  if (!gameActive || turnEnded || players[currentPlayer].isCpu) {
    if (keypadMod !== 1) toggleKeypadMod(keypadMod);
    return;
  }
  if (num === 0) {
    throwLog.push({ segment: null, source: 'manual', phase: 'battle', player: currentPlayer, ts: Date.now() });
    registerDart(null);
  } else {
    let mul = keypadMod;
    if (num === 25 && mul === 3) mul = 1;
    const nameMap = { 1:'S', 2:'D', 3:'T' };
    const seg = {
      number: num, multiplier: mul,
      name: num === 25 ? (mul === 2 ? 'D25' : 'B25') : `${nameMap[mul]}${num}`,
      bed: num === 25 ? 'Single' : (mul === 2 ? 'Double' : mul === 3 ? 'Triple' : 'SingleOuter'),
    };
    throwLog.push({ segment: seg, source: 'manual', phase: 'battle', player: currentPlayer, ts: Date.now() });
    registerDart(seg);
  }
  if (keypadMod !== 1) toggleKeypadMod(keypadMod);
}

function draftSegmentFromThrow(rawThrow) {
  const seg = rawThrow && rawThrow.segment ? rawThrow.segment : {};
  const number = Number(seg.number || (rawThrow && (rawThrow.number || rawThrow.segmentNumber || rawThrow.targetNumber)) || 0);
  if (!number) return seg;
  const multiplier = Number(seg.multiplier || (rawThrow && rawThrow.multiplier) || 1);
  const prefix = multiplier === 3 ? 'T' : multiplier === 2 ? 'D' : 'S';
  return {
    ...seg,
    number,
    multiplier,
    name: seg.name || (rawThrow && rawThrow.name) || `${prefix}${number}`,
  };
}

// =============================================
// WS HANDLER
// =============================================
function handleWS(data) {
  if (!data || data.type !== 'state') return;
  const d = data.data || {};
  const throws  = d.throws;
  const event   = d.event || '';
  const numThrows = d.numThrows !== undefined ? d.numThrows : -1;
  const tc = Array.isArray(throws) ? throws.length : 0;

  // Draft phase
  if (draftPhase && !players[draftStep].isCpu) {
    // Reset on takeout so the next player's dart is detected
    if (event === 'Takeout finished' || (tc === 0 && seenThrows > 0)) {
      seenThrows = 0;
      return;
    }
    if (tc > seenThrows) {
      const rawThrow = throws[seenThrows];
      const seg = draftSegmentFromThrow(rawThrow);
      throwLog.push(rawThrow);
      registerDraftThrow(seg);
      seenThrows = tc;
    }
    return;
  }

  // Game phase
  if (gameActive && !players[currentPlayer].isCpu) {
    if (tc > seenThrows && !turnEnded) {
      throwLog.push(throws[seenThrows]);
      if (missTimer) { clearTimeout(missTimer); missTimer = null; }
      const rawThrow = throws[seenThrows];
      const seg = rawThrow.segment || {};
      registerDart(seg);
      seenThrows = tc;
    }
    if (!turnEnded && numThrows > 0 && numThrows > seenThrows && tc === seenThrows) {
      if (!missTimer) missTimer = setTimeout(() => {
        missTimer = null;
        if (seenThrows < numThrows && !turnEnded && gameActive) {
          registerDart(null);
          seenThrows = numThrows;
        }
      }, tDelay(700));
    }
    if (event === 'Takeout finished' && numThrows === 0) {
      if (missTimer) { clearTimeout(missTimer); missTimer = null; }
      seenThrows = 0;
      if (currentDarts.length > 0 || turnEnded) advanceTurn();
    }
  }
}

// =============================================
// LOG MODAL
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
  if (o) { o.select(); document.execCommand('copy'); alert('Copied ' + throwLog.length + ' throws!'); }
}

// =============================================
// FLASH
// =============================================
function flash(text, color = 'var(--gold)') {
  const el = document.getElementById('announce');
  if (!el) return;
  el.textContent = text;
  el.style.color = color;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(flash._timer);
  flash._timer = setTimeout(() => el.classList.remove('show'), tDelay(1400));
}

// =============================================
// LOCAL SOUND EFFECTS
// =============================================
function sfxEvolution() {
  const ctx = gAC(), t = ctx.currentTime;
  [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, 'sine', t + i * .08, .22, .2, ctx));
  noiz(t + .3, .2, .12, 2400, ctx);
}
function sfxBull() {
  const ctx = gAC(), t = ctx.currentTime;
  [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, 'triangle', t + i * .06, .22, .18, ctx));
  noiz(t + .05, .1, .05, 1800, ctx);
}
function sfxStatus() {
  const ctx = gAC(), t = ctx.currentTime;
  tone(330, 'sawtooth', t, .18, .12, ctx);
  tone(247, 'sawtooth', t + .08, .15, .1, ctx);
  tone(185, 'sawtooth', t + .16, .12, .1, ctx);
}
function sfxPokeDamage() {
  const ctx = gAC(), t = ctx.currentTime;
  noiz(t, .25, .06, 3000, ctx);
  tone(110, 'sawtooth', t + .02, .2, .1, ctx);
  tone(80, 'square', t + .05, .15, .08, ctx);
}
function sfxPokeHeal() {
  const ctx = gAC(), t = ctx.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 'sine', t + i * .06, .16, .14, ctx));
  tone(1319, 'sine', t + .28, .12, .18, ctx);
}
function sfxPokeCrit() {
  const ctx = gAC(), t = ctx.currentTime;
  noiz(t, .3, .04, 4000, ctx);
  [220, 330, 440, 660, 880].forEach((f, i) => tone(f, 'square', t + i * .04, .18, .08, ctx));
}
function sfxFinishMode() {
  const ctx = gAC(), t = ctx.currentTime;
  [262, 330, 392, 523, 659, 784].forEach((f, i) => tone(f, 'triangle', t + i * .07, .2, .15, ctx));
  noiz(t + .35, .15, .08, 1500, ctx);
}
function sfxBust() {
  const ctx = gAC(), t = ctx.currentTime;
  [440, 330, 220, 147].forEach((f, i) => tone(f, 'sawtooth', t + i * .08, .2, .12, ctx));
  noiz(t + .1, .2, .1, 200, ctx);
}

// =============================================
// KEYBOARD SHORTCUTS
// =============================================
// Map letter keys (Q-P row) to dart numbers 11–20
const LETTER_TO_NUM = { q:11, w:12, e:13, r:14, t:15, y:16, u:17, i:18, o:19, p:20 };

function _throwManual(num, mul) {
  if (num === 0) {
    if (draftPhase) return;
    manualDart(0);
    return;
  }
  if (draftPhase) {
    if ((num >= 1 && num <= 20) || num === 25) {
      const savedMod = keypadMod;
      if (mul) keypadMod = mul;
      if (num === 25) {
        registerDraftThrow({ number: 25, multiplier: keypadMod, name: keypadMod === 2 ? 'D-BULL' : 'BULL' });
      } else {
        manualDraft(num);
      }
      keypadMod = savedMod;
      document.querySelectorAll('#mod-double, .kp-mod[data-mod="2"]').forEach(el => el.classList.toggle('active', keypadMod === 2));
      document.querySelectorAll('#mod-treble, .kp-mod[data-mod="3"]').forEach(el => el.classList.toggle('active', keypadMod === 3));
    }
    return;
  }
  if (!gameActive || turnEnded || players[currentPlayer].isCpu) return;
  // Use transient mul if provided; otherwise fall through to manualDart (respects sticky keypadMod)
  if (mul && mul !== 1) {
    const savedMod = keypadMod;
    keypadMod = mul;
    manualDart(num);
    keypadMod = savedMod;
    // Reset the on-screen toggle indicator (manualDart only resets if it was non-1)
    document.querySelectorAll('#mod-double, .kp-mod[data-mod="2"]').forEach(el => el.classList.toggle('active', keypadMod === 2));
    document.querySelectorAll('#mod-treble, .kp-mod[data-mod="3"]').forEach(el => el.classList.toggle('active', keypadMod === 3));
  } else {
    manualDart(num);
  }
}

document.addEventListener('keydown', e => {
  // Ignore when typing into inputs/textareas (name field, log textarea, etc.)
  const tgt = e.target;
  if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable)) return;

  // Modals open? Close on Escape.
  if (e.key === 'Escape') {
    closeLog();
    closeKeyHelp();
    return;
  }

  const key = e.key;
  const lower = key.toLowerCase();

  // Enter / Space → advance turn (only when applicable)
  if (key === 'Enter' || key === ' ') {
    if (draftPhase) return;
    if (gameActive && !players[currentPlayer].isCpu && (turnEnded || currentDarts.length > 0)) {
      e.preventDefault();
      advanceTurn();
    }
    return;
  }

  // Backspace → undo
  if (key === 'Backspace') {
    if (gameActive) { e.preventDefault(); undoLastDart(); }
    return;
  }

  // Miss
  if (lower === 'm') { e.preventDefault(); _throwManual(0); return; }

  // Bull / Bullseye
  if (lower === 'b') {
    e.preventDefault();
    _throwManual(25, e.shiftKey ? 2 : 1);
    return;
  }

  // Number row 1–9, 0 → 1–10
  if (/^[0-9]$/.test(key)) {
    const num = key === '0' ? 10 : Number(key);
    const mul = e.ctrlKey ? 3 : (e.shiftKey ? 2 : 1);
    e.preventDefault();
    _throwManual(num, mul);
    return;
  }

  // Letter row → 11–20
  if (lower in LETTER_TO_NUM) {
    const num = LETTER_TO_NUM[lower];
    const mul = e.ctrlKey ? 3 : (e.shiftKey ? 2 : 1);
    e.preventDefault();
    _throwManual(num, mul);
    return;
  }
});

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Load persisted settings before initialising audio/UI
  voiceEnabled = localStorage.getItem('dartbot_voice_enabled') !== '0';
  sfxEnabled   = localStorage.getItem('dartbot_sfx_enabled')   !== '0';
  testMode     = localStorage.getItem('dartbot_testmode') === '1';
  const vcb = document.getElementById('voice-toggle');
  const scb = document.getElementById('sfx-toggle');
  const tcb = document.getElementById('test-mode-toggle');
  if (vcb) vcb.checked = voiceEnabled;
  if (scb) scb.checked = sfxEnabled;
  if (tcb) tcb.checked = testMode;

  buildCpuGrid();
  renderRecentPlayers();
  initSpeech();
  initAutodarts(handleWS);
  // Set default mode description
  const vd = document.getElementById('variant-desc');
  if (vd) vd.textContent = MODE_DESCS[gameMode];
  window.addEventListener('resize', () => { if (gameActive) updateBattleField(); });
});
