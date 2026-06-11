// CPU_PLAYERS, makeFaceSVG, humanAvatarSVG, generateCpuThrow — from bots.js
// PLAYER_COLORS, showScreen, speak, sfxMiss, gAC, tone, noiz,
// spawnConfetti, initSpeech — from utils.js

// =============================================
// POKEMON ROSTER
// =============================================
const GEN1_POKEMON_DATA = [
  [1,'Bulbasaur','BULB-uh-sore',['Grass','Poison']],[2,'Ivysaur','EYE-vee-sore',['Grass','Poison']],[3,'Venusaur','VEE-nuh-sore',['Grass','Poison']],
  [4,'Charmander','CHAR-man-der',['Fire']],[5,'Charmeleon','char-MEEL-ee-un',['Fire']],[6,'Charizard','CHAR-ih-zard',['Fire','Flying']],
  [7,'Squirtle','SKWER-tul',['Water']],[8,'Wartortle','WAR-tor-tul',['Water']],[9,'Blastoise','BLASS-toys',['Water']],
  [10,'Caterpie','KAT-er-pee',['Bug']],[11,'Metapod','MET-uh-pod',['Bug']],[12,'Butterfree','BUT-er-free',['Bug','Flying']],
  [13,'Weedle','WEE-dul',['Bug','Poison']],[14,'Kakuna','kuh-KOO-nuh',['Bug','Poison']],[15,'Beedrill','BEE-dril',['Bug','Poison']],
  [16,'Pidgey','PIH-jee',['Normal','Flying']],[17,'Pidgeotto','pih-jee-AH-toe',['Normal','Flying']],[18,'Pidgeot','PIH-jit',['Normal','Flying']],
  [19,'Rattata','rat-TAT-uh',['Normal']],[20,'Raticate','RAT-ih-kayt',['Normal']],
  [21,'Spearow','SPEER-oh',['Normal','Flying']],[22,'Fearow','FEER-oh',['Normal','Flying']],
  [23,'Ekans','EK-uns',['Poison']],[24,'Arbok','AR-bok',['Poison']],
  [25,'Pikachu','PEE-kuh-choo',['Electric']],[26,'Raichu','RYE-choo',['Electric']],
  [27,'Sandshrew','SAND-shroo',['Ground']],[28,'Sandslash','SAND-slash',['Ground']],
  [29,'Nidoran Female','NEE-doh-ran FEM-ale',['Poison']],[30,'Nidorina','nee-doh-REE-nuh',['Poison']],[31,'Nidoqueen','NEE-doh-kween',['Poison','Ground']],
  [32,'Nidoran Male','NEE-doh-ran MALE',['Poison']],[33,'Nidorino','nee-doh-REE-noh',['Poison']],[34,'Nidoking','NEE-doh-king',['Poison','Ground']],
  [35,'Clefairy','kluh-FAIR-ee',['Fairy']],[36,'Clefable','kluh-FAY-bul',['Fairy']],
  [37,'Vulpix','VUL-piks',['Fire']],[38,'Ninetales','NINE-taylz',['Fire']],
  [39,'Jigglypuff','JIG-lee-puf',['Normal','Fairy']],[40,'Wigglytuff','WIG-lee-tuf',['Normal','Fairy']],
  [41,'Zubat','ZOO-bat',['Poison','Flying']],[42,'Golbat','GOHL-bat',['Poison','Flying']],
  [43,'Oddish','AHD-ish',['Grass','Poison']],[44,'Gloom','GLOOM',['Grass','Poison']],[45,'Vileplume','VILE-ploom',['Grass','Poison']],
  [46,'Paras','PAIR-us',['Bug','Grass']],[47,'Parasect','PAIR-uh-sekt',['Bug','Grass']],
  [48,'Venonat','VEN-oh-nat',['Bug','Poison']],[49,'Venomoth','VEN-oh-moth',['Bug','Poison']],
  [50,'Diglett','DIG-let',['Ground']],[51,'Dugtrio','dug-TREE-oh',['Ground']],
  [52,'Meowth','mee-OWTH',['Normal']],[53,'Persian','PER-zhun',['Normal']],
  [54,'Psyduck','SY-duk',['Water']],[55,'Golduck','GOHL-duk',['Water']],
  [56,'Mankey','MAN-kee',['Fighting']],[57,'Primeape','PRY-mayp',['Fighting']],
  [58,'Growlithe','GROW-lith',['Fire']],[59,'Arcanine','AR-kuh-nine',['Fire']],
  [60,'Poliwag','PAHL-ee-wag',['Water']],[61,'Poliwhirl','PAHL-ee-wherl',['Water']],[62,'Poliwrath','PAHL-ee-rath',['Water','Fighting']],
  [63,'Abra','AB-ruh',['Psychic']],[64,'Kadabra','kuh-DAB-ruh',['Psychic']],[65,'Alakazam','al-uh-kuh-ZAM',['Psychic']],
  [66,'Machop','muh-CHOP',['Fighting']],[67,'Machoke','muh-CHOHK',['Fighting']],[68,'Machamp','muh-CHAMP',['Fighting']],
  [69,'Bellsprout','BEL-sprowt',['Grass','Poison']],[70,'Weepinbell','WEE-pin-bel',['Grass','Poison']],[71,'Victreebel','VIK-tree-bel',['Grass','Poison']],
  [72,'Tentacool','TEN-tuh-kool',['Water','Poison']],[73,'Tentacruel','TEN-tuh-krool',['Water','Poison']],
  [74,'Geodude','JEE-oh-dood',['Rock','Ground']],[75,'Graveler','GRAV-el-er',['Rock','Ground']],[76,'Golem','GOH-lem',['Rock','Ground']],
  [77,'Ponyta','POH-nee-tah',['Fire']],[78,'Rapidash','RAP-ih-dash',['Fire']],
  [79,'Slowpoke','SLOH-pohk',['Water','Psychic']],[80,'Slowbro','SLOH-broh',['Water','Psychic']],
  [81,'Magnemite','MAG-nuh-mite',['Electric','Steel']],[82,'Magneton','MAG-nuh-ton',['Electric','Steel']],
  [83,"Farfetch'd",'far-FETCHT',['Normal','Flying']],
  [84,'Doduo','doh-DOO-oh',['Normal','Flying']],[85,'Dodrio','doh-DREE-oh',['Normal','Flying']],
  [86,'Seel','SEEL',['Water']],[87,'Dewgong','DOO-gong',['Water','Ice']],
  [88,'Grimer','GRY-mer',['Poison']],[89,'Muk','MUK',['Poison']],
  [90,'Shellder','SHEL-der',['Water']],[91,'Cloyster','KLOY-ster',['Water','Ice']],
  [92,'Gastly','GAST-lee',['Ghost','Poison']],[93,'Haunter','HAWN-ter',['Ghost','Poison']],[94,'Gengar','GHEN-gar',['Ghost','Poison']],
  [95,'Onix','AH-niks',['Rock','Ground']],
  [96,'Drowzee','DROW-zee',['Psychic']],[97,'Hypno','HIP-noh',['Psychic']],
  [98,'Krabby','KRAB-ee',['Water']],[99,'Kingler','KING-ler',['Water']],
  [100,'Voltorb','VOL-torb',['Electric']],[101,'Electrode','ee-LEK-trohd',['Electric']],
  [102,'Exeggcute','eg-ZEG-kyoot',['Grass','Psychic']],[103,'Exeggutor','eg-ZEG-kyoo-tor',['Grass','Psychic']],
  [104,'Cubone','KYOO-bohn',['Ground']],[105,'Marowak','MAIR-oh-wak',['Ground']],
  [106,'Hitmonlee','hit-mahn-LEE',['Fighting']],[107,'Hitmonchan','hit-mahn-CHAN',['Fighting']],
  [108,'Lickitung','LIK-ee-tung',['Normal']],
  [109,'Koffing','KAW-fing',['Poison']],[110,'Weezing','WEE-zing',['Poison']],
  [111,'Rhyhorn','RYE-horn',['Ground','Rock']],[112,'Rhydon','RYE-don',['Ground','Rock']],
  [113,'Chansey','CHAN-see',['Normal']],
  [114,'Tangela','TANG-guh-luh',['Grass']],
  [115,'Kangaskhan','kang-guss-KAHN',['Normal']],
  [116,'Horsea','HOR-see',['Water']],[117,'Seadra','SEE-druh',['Water']],
  [118,'Goldeen','gohl-DEEN',['Water']],[119,'Seaking','SEE-king',['Water']],
  [120,'Staryu','STAR-yoo',['Water']],[121,'Starmie','STAR-mee',['Water','Psychic']],
  [122,'Mr. Mime','MIS-ter MYME',['Psychic','Fairy']],
  [123,'Scyther','SY-ther',['Bug','Flying']],
  [124,'Jynx','JINKS',['Ice','Psychic']],
  [125,'Electabuzz','ee-LEK-tuh-buz',['Electric']],
  [126,'Magmar','MAG-mar',['Fire']],
  [127,'Pinsir','PIN-ser',['Bug']],
  [128,'Tauros','TORE-ohss',['Normal']],
  [129,'Magikarp','MAJ-ee-karp',['Water']],[130,'Gyarados','GAIR-uh-dohss',['Water','Flying']],
  [131,'Lapras','LAP-russ',['Water','Ice']],
  [132,'Ditto','DIT-oh',['Normal']],
  [133,'Eevee','EE-vee',['Normal']],
  [134,'Vaporeon','vay-PORE-ee-on',['Water']],
  [135,'Jolteon','JOHL-tee-on',['Electric']],
  [136,'Flareon','FLAIR-ee-on',['Fire']],
  [137,'Porygon','PORE-ee-gon',['Normal']],
  [138,'Omanyte','AHM-uh-nite',['Rock','Water']],[139,'Omastar','AHM-uh-star',['Rock','Water']],
  [140,'Kabuto','kuh-BOO-toh',['Rock','Water']],[141,'Kabutops','kuh-BOO-tops',['Rock','Water']],
  [142,'Aerodactyl','air-oh-DAK-tul',['Rock','Flying']],
  [143,'Snorlax','SNOR-laks',['Normal']],
  [144,'Articuno','ar-tih-KOO-noh',['Ice','Flying']],
  [145,'Zapdos','ZAP-dohss',['Electric','Flying']],
  [146,'Moltres','MOHL-trayss',['Fire','Flying']],
  [147,'Dratini','druh-TEE-nee',['Dragon']],[148,'Dragonair','drag-un-AIR',['Dragon']],[149,'Dragonite','DRAG-un-ite',['Dragon','Flying']],
  [150,'Mewtwo','MYOO-too',['Psychic']],
  [151,'Mew','MYOO',['Psychic']],
];

const GEN1_EVOLUTIONS = {
  1:[2,3], 2:[3], 4:[5,6], 5:[6], 7:[8,9], 8:[9], 10:[11,12], 11:[12], 13:[14,15], 14:[15],
  16:[17,18], 17:[18], 19:[20], 21:[22], 23:[24], 25:[26], 27:[28], 29:[30,31], 30:[31],
  32:[33,34], 33:[34], 35:[36], 37:[38], 39:[40], 41:[42], 43:[44,45], 44:[45], 46:[47],
  48:[49], 50:[51], 52:[53], 54:[55], 56:[57], 58:[59], 60:[61,62], 61:[62], 63:[64,65],
  64:[65], 66:[67,68], 67:[68], 69:[70,71], 70:[71], 72:[73], 74:[75,76], 75:[76], 77:[78],
  79:[80], 81:[82], 84:[85], 86:[87], 88:[89], 90:[91], 92:[93,94], 93:[94], 96:[97],
  98:[99], 100:[101], 102:[103], 104:[105], 109:[110], 111:[112], 116:[117], 118:[119],
  120:[121], 129:[130], 133:[134,135,136], 138:[139], 140:[141], 147:[148,149], 148:[149],
};

const GEN1_MEGA_EVOLUTIONS = {
  3:[{name:'Mega Venusaur', sid:10033, types:['Grass','Poison']}],
  6:[
    {name:'Mega Charizard X', sid:10034, types:['Fire','Dragon']},
    {name:'Mega Charizard Y', sid:10035, types:['Fire','Flying']},
  ],
  9:[{name:'Mega Blastoise', sid:10036, types:['Water']}],
  15:[{name:'Mega Beedrill', sid:10090, types:['Bug','Poison']}],
  18:[{name:'Mega Pidgeot', sid:10073, types:['Normal','Flying']}],
  65:[{name:'Mega Alakazam', sid:10037, types:['Psychic']}],
  80:[{name:'Mega Slowbro', sid:10071, types:['Water','Psychic']}],
  94:[{name:'Mega Gengar', sid:10038, types:['Ghost','Poison']}],
  115:[{name:'Mega Kangaskhan', sid:10039, types:['Normal']}],
  127:[{name:'Mega Pinsir', sid:10040, types:['Bug','Flying']}],
  130:[{name:'Mega Gyarados', sid:10041, types:['Water','Dark']}],
  142:[{name:'Mega Aerodactyl', sid:10042, types:['Rock','Flying']}],
  150:[
    {name:'Mega Mewtwo X', sid:10043, types:['Psychic','Fighting']},
    {name:'Mega Mewtwo Y', sid:10044, types:['Psychic']},
  ],
};

const GEN1_BY_ID = Object.fromEntries(GEN1_POKEMON_DATA.map(([id, name, vname, types]) => [id, {id, name, vname, types}]));

function classForGen1Pokemon(types, id) {
  if (types.includes('Psychic') || types.includes('Ghost') || types.includes('Poison')) return 'Status';
  if (types.includes('Rock') || types.includes('Ground') || types.includes('Ice') || id === 143 || id === 131) return 'Tank';
  if (types.includes('Electric') || types.includes('Flying') || types.includes('Bug')) return 'Sniper';
  return 'Brawler';
}

function buildGen1Pokemon(entry) {
  const [id, name, vname, types] = entry;
  const evo = GEN1_EVOLUTIONS[id] || [];
  const poke = {
    id,
    name,
    vname,
    types,
    cls: classForGen1Pokemon(types, id),
    baseHp: 150,
    sid: id,
    maxStage: evo.length ? evo.length + 1 : 1,
  };
  if (id === 133) {
    poke.maxStage = 2;
    poke.eeveelutions = evo.map(eid => ({ name: GEN1_BY_ID[eid].name, sid: eid, types: GEN1_BY_ID[eid].types }));
    return poke;
  }
  if (evo[0]) {
    const mid = GEN1_BY_ID[evo[0]];
    poke.msid = mid.id;
    poke.mname = mid.name;
    poke.mtypes = mid.types;
  }
  if (evo[1]) {
    const fin = GEN1_BY_ID[evo[1]];
    poke.fsid = fin.id;
    poke.fname = fin.name;
    poke.ftypes = fin.types;
  }
  const mega = GEN1_MEGA_EVOLUTIONS[id] || (evo.length ? GEN1_MEGA_EVOLUTIONS[evo[evo.length - 1]] : null);
  if (mega) poke.megaEvolutions = mega;
  return poke;
}

const POKEMON_ROSTER = GEN1_POKEMON_DATA.map(buildGen1Pokemon);

const SECRET_POKEMON = {};

const POKEMON_SPRITE_VERSION = 5;

const CLASS_PASSIVES = {
  Sniper:  'Type only',
  Tank:    'Type only',
  Brawler: 'Type only',
  Status:  'Type only',
};

// =============================================
// STATE
// =============================================
let gameMode = 'wild';
let startingHp = 301;
let players = [];
let currentPlayer = 0;
let currentDarts = [];
let round = 1;
let gameActive = false;
let draftPhase = false;
let draftMap = {};
let draftPage = 0;
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
  return attackTypes.some(t => (TYPE_ADVANTAGES[t] || []).some(beaten => defendTypes.includes(beaten))) ? 1.2 : 1;
}

const TYPE_ADVANTAGES = {
  Normal: [],
  Fire: ['Grass', 'Ice', 'Bug', 'Steel'],
  Water: ['Fire', 'Ground', 'Rock'],
  Electric: ['Water', 'Flying'],
  Grass: ['Water', 'Ground', 'Rock'],
  Ice: ['Grass', 'Ground', 'Flying', 'Dragon'],
  Fighting: ['Normal', 'Ice', 'Rock', 'Dark', 'Steel'],
  Poison: ['Grass', 'Fairy'],
  Ground: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'],
  Flying: ['Grass', 'Fighting', 'Bug'],
  Psychic: ['Fighting', 'Poison'],
  Bug: ['Grass', 'Psychic', 'Dark'],
  Rock: ['Fire', 'Ice', 'Flying', 'Bug'],
  Ghost: ['Psychic', 'Ghost'],
  Dragon: ['Dragon'],
  Dark: ['Psychic', 'Ghost'],
  Steel: ['Ice', 'Rock', 'Fairy'],
  Fairy: ['Fighting', 'Dragon', 'Dark'],
};

function ensureTypeGuideStyles() {
  if (document.getElementById('type-guide-styles')) return;
  const style = document.createElement('style');
  style.id = 'type-guide-styles';
  style.textContent = `
    .type-guide {
      margin-top: 12px;
    }
    .type-guide-button {
      width: 100%;
      border: 2px solid rgba(255,214,10,.75);
      border-radius: 8px;
      padding: 14px 12px;
      background: rgba(18,42,78,.86);
      box-shadow: inset 0 0 14px rgba(255,214,10,.08), 0 0 12px rgba(255,214,10,.12);
      color: var(--text);
      cursor: pointer;
      color: var(--poke-yellow);
      font-family: 'Press Start 2P', monospace;
      font-size: 11px;
      line-height: 1.45;
      text-align: center;
      user-select: none;
    }
    .type-guide-button span {
      display: block;
      margin-top: 4px;
      color: var(--muted);
      font-family: 'Share Tech Mono', monospace;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .type-guide-overlay {
      position: fixed;
      inset: 0;
      z-index: 900;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 42px;
      background: rgba(7,18,38,.82);
      backdrop-filter: blur(2px);
    }
    .type-guide-overlay.open { display: flex; }
    .type-guide-card {
      width: min(1500px, 92vw);
      max-height: 88vh;
      border: 3px solid rgba(255,214,10,.8);
      border-radius: 14px;
      padding: 24px;
      background: linear-gradient(180deg, rgba(25,58,104,.98), rgba(13,33,68,.98));
      box-shadow: 0 0 40px rgba(0,0,0,.55), inset 0 0 22px rgba(255,214,10,.1);
    }
    .type-guide-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 18px;
    }
    .type-guide-title {
      color: var(--poke-yellow);
      font-family: 'Press Start 2P', monospace;
      font-size: 22px;
      line-height: 1.2;
      letter-spacing: 1px;
    }
    .type-guide-close {
      border: 2px solid rgba(255,214,10,.8);
      border-radius: 8px;
      padding: 10px 18px;
      background: rgba(12,31,58,.85);
      color: var(--poke-yellow);
      font-family: 'Share Tech Mono', monospace;
      font-size: 18px;
      font-weight: 900;
      cursor: pointer;
    }
    .type-guide-list {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .type-guide-row {
      display: grid;
      grid-template-columns: 110px 1fr;
      align-items: center;
      gap: 10px;
      min-height: 52px;
      padding: 9px 11px;
      border: 1px solid rgba(124,170,219,.42);
      border-radius: 8px;
      background: rgba(12,31,58,.62);
      font-family: 'Share Tech Mono', monospace;
      font-size: 16px;
      line-height: 1.15;
    }
    .type-guide-row strong {
      color: var(--poke-yellow);
      font-size: 15px;
      text-transform: uppercase;
    }
    .type-guide-row span { color: #e8f3ff; }
    .type-guide-note {
      margin-top: 16px;
      color: var(--muted);
      font-family: 'Share Tech Mono', monospace;
      font-size: 16px;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}

function renderTypeAdvantageGuide() {
  return Object.entries(TYPE_ADVANTAGES).map(([type, beats]) => `
    <div class="type-guide-row">
      <strong>${escapeHTML(type)}</strong>
      <span>${beats.length ? beats.map(escapeHTML).join(', ') : 'N/A'}</span>
    </div>`).join('');
}

function openTypeGuide() {
  const overlay = document.getElementById('type-guide-overlay');
  if (overlay) overlay.classList.add('open');
}

function closeTypeGuide() {
  const overlay = document.getElementById('type-guide-overlay');
  if (overlay) overlay.classList.remove('open');
}

function ensureTypeGuidePanel() {
  return null;
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

function pokemonSpriteId(poke, evolved) {
  const stage = typeof evolved === 'number' ? evolved : (evolved ? 2 : 1);
  return stage >= 3 ? (poke.fsid || poke.msid || poke.sid) : (stage >= 2 ? (poke.msid || poke.sid) : poke.sid);
}

function pokemonSpriteUrl(poke, evolved, shiny = false) {
  const id = pokemonSpriteId(poke, evolved);
  if (shiny) return useRemotePokemonSprites() ? shinySpriteUrl(id) : localShinySpriteUrl(id);
  return useRemotePokemonSprites() ? spriteUrl(id) : localSpriteUrl(id);
}

function remotePokemonSpriteUrl(poke, evolved, shiny = false) {
  const id = pokemonSpriteId(poke, evolved);
  return shiny ? shinySpriteUrl(id) : spriteUrl(id);
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
  return null;
}

function syncShinyClass(playerIdx) {
  const p = players[playerIdx];
  const img = document.getElementById(`sprite-${playerIdx}`);
  const wrap = img ? img.closest('.poke-sprite-wrap') : null;
  [img, wrap].forEach(el => { if (el) el.classList.toggle('shiny-pokemon', !!(p && p.shiny)); });
}

function pokemonImgAttrs(poke, evolved) {
  const primary = pokemonSpriteUrl(poke, evolved);
  const remote = remotePokemonSpriteUrl(poke, evolved);
  const fallback = fallbackSpriteUrl(poke.cls);
  const firstFallback = primary === remote ? fallback : remote;
  return `src="${primary}" data-fallback="${firstFallback}" data-final-fallback="${fallback}" onerror="this.onerror=function(){this.onerror=null;this.src=this.dataset.finalFallback};this.src=this.dataset.fallback"`;
}

function setPokemonSprite(img, poke, evolved, shiny = false) {
  if (!img || !poke) return;
  const primary = pokemonSpriteUrl(poke, evolved, shiny);
  const remote = remotePokemonSpriteUrl(poke, evolved, shiny);
  const fallback = fallbackSpriteUrl(poke.cls);
  img.onerror = function() {
    this.onerror = function() {
      this.onerror = null;
      this.src = this.dataset.finalFallback;
    };
    this.src = this.dataset.fallback;
  };
  img.dataset.fallback = primary === remote ? fallback : remote;
  img.dataset.finalFallback = fallback;
  img.src = primary;
}

function setPlayerPokemonSprite(img, player) {
  if (!img || !player || !player.pokemon) return;
  const eeveePick = playerEvolutionPick(player);
  if (!eeveePick) {
    setPokemonSprite(img, player.pokemon, player.stage || 1, player.shiny);
    return;
  }
  const primary = player.shiny
    ? (useRemotePokemonSprites() ? shinySpriteUrl(eeveePick.sid) : localShinySpriteUrl(eeveePick.sid))
    : (useRemotePokemonSprites() ? spriteUrl(eeveePick.sid) : localSpriteUrl(eeveePick.sid));
  const remote = player.shiny ? shinySpriteUrl(eeveePick.sid) : spriteUrl(eeveePick.sid);
  const fallback = fallbackSpriteUrl(player.pokemon.cls);
  img.onerror = function() {
    this.onerror = function() {
      this.onerror = null;
      this.src = this.dataset.finalFallback;
    };
    this.src = this.dataset.fallback;
  };
  img.dataset.fallback = primary === remote ? fallback : remote;
  img.dataset.finalFallback = fallback;
  img.src = primary;
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
  wild: 'Every dart score is direct damage.',
  gym:  'Every dart score is direct damage.'
};

function selectMode(v, btn) {
  gameMode = v;
  document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  document.getElementById('variant-desc').textContent = MODE_DESCS[v];
}

function selectStartingHp(value, btn) {
  startingHp = Number(value) || 301;
  document.querySelectorAll('.hp-choice-btn').forEach(b => b.classList.remove('sel'));
  if (btn) btn.classList.add('sel');
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
  draftPage = 0;
  buildDraftMap();

  // Reset player state (keep name/flag/color/isCpu/cpuData)
  players.forEach(p => {
    p.pokemon = null; p.hp = 0; p.maxHp = 0; p.stage = 1; p.eeveeEvolution = null; p.branchEvolution = null;
    p.megaActive = false; p.megaTurnsLeft = 0; p.megaJustActivated = false; p.megaPick = null; p.megaBaseStage = null; p.evoScoreOffset = 0; p.shiny = false;
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

function draftPageCount() {
  return Math.ceil(POKEMON_ROSTER.length / 20);
}

function draftPageRange() {
  const start = draftPage * 20;
  const end = Math.min(start + 20, POKEMON_ROSTER.length);
  return { start, end };
}

function buildDraftMap() {
  draftMap = {};
  const { start, end } = draftPageRange();
  for (let i = start; i < end; i++) {
    draftMap[(i - start) + 1] = POKEMON_ROSTER[i];
  }
}

function changeDraftPage(delta) {
  if (!draftPhase) return;
  const pages = draftPageCount();
  draftPage = (draftPage + delta + pages) % pages;
  buildDraftMap();
  buildDraftGrid();
  updateDraftInstruction();
  flash(`PAGE ${draftPage + 1}/${pages}`, 'var(--poke-yellow)');
}

function showDraftPageForPokemon(poke) {
  const idx = POKEMON_ROSTER.findIndex(p => p.id === poke.id);
  if (idx < 0) return;
  draftPage = Math.floor(idx / 20);
  buildDraftMap();
  buildDraftGrid();
}

function updateDraftInstruction() {
  const el = document.getElementById('draft-instruction');
  if (!el) return;
  const { start, end } = draftPageRange();
  const pageText = `Page ${draftPage + 1}/${draftPageCount()} - #${start + 1}-${end}`;
  if (draftStep === 0) {
    el.textContent = `${players[0].name} - throw 1-20 to pick. ${pageText}. Bull next page, D-Bull previous.`;
  } else {
    el.textContent = `${players[1].name} - throw 1-20 to pick. ${pageText}. Bull next page, D-Bull previous.`;
  }
}

function ensureDraftKeypadModifiers() {
  const keypad = document.querySelector('#draft .keypad-wrap');
  if (!keypad || keypad.querySelector('.draft-mod-row')) return;
  const row = document.createElement('div');
  row.className = 'keypad-row draft-mod-row';
  row.innerHTML = `
    <button class="kp-btn kp-mod" data-mod="2" onclick="toggleKeypadMod(2)">DOUBLE</button>
    <button class="kp-btn kp-mod" data-mod="3" onclick="toggleKeypadMod(3)">TREBLE</button>
    <button class="kp-btn kp-bull" onclick="changeDraftPage(-1)">PREV</button>
    <button class="kp-btn kp-bull" onclick="changeDraftPage(1)">NEXT</button>`;
  keypad.appendChild(row);
}

function buildDraftGrid() {
  const grid = document.getElementById('draft-grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let n = 1; n <= 20; n++) {
    const poke = draftMap[n];
    const card = document.createElement('div');
    card.className = `draft-card${poke ? '' : ' unavailable'}`;
    card.id = `dcard-${n}`;
    if (!poke) {
      card.innerHTML = `
        <div class="draft-num">${n}</div>
        <div class="draft-empty">No Pokemon</div>`;
      grid.appendChild(card);
      continue;
    }
    const pickedBy = players.findIndex(p => p.pokemon && p.pokemon.id === poke.id);
    if (pickedBy === 0) card.classList.add('selected-p1');
    if (pickedBy === 1) card.classList.add('selected-p2');
    card.innerHTML = `
      <div class="draft-num">${n}<span>#${poke.id}</span></div>
      <img class="draft-sprite" ${pokemonImgAttrs(poke, false)} alt="${escapeHTML(poke.name)}" loading="lazy">
      <div class="draft-pname">${escapeHTML(poke.name)}${megaIconHTML(poke)}</div>
      <div class="draft-type-badge">${pokemonTypeHTML(poke)}</div>`;
    grid.appendChild(card);
  }
}

function registerDraftThrow(seg) {
  if (!draftPhase) return;
  const num = seg ? Number(seg.number) : 0;
  if (num === 25) {
    changeDraftPage(Number(seg && seg.multiplier) === 2 ? -1 : 1);
    return;
  }
  if (!num || num < 1 || num > 20) {
    aSfx(sfxMiss);
    flash('Miss! Try again.', 'var(--muted)');
    return;
  }
  const poke = draftMap[num];
  if (!poke) return;

  // Check not already picked
  if (players.some(p => p.pokemon && p.pokemon.id === poke.id)) return;

  const card = document.getElementById(`dcard-${num}`);
  if (card) {
    card.classList.add(draftStep === 0 ? 'selected-p1' : 'selected-p2');
  }

  players[draftStep].pokemon = poke;
  players[draftStep].shiny = rollDraftShiny(seg);
  if (card && players[draftStep].shiny) card.classList.add('shiny-draft-pick');
  aSpeak(`${players[draftStep].shiny ? 'Shiny ' : ''}${voicePokemonName(poke)}, I choose you!`);

  if (draftStep === 0) {
    draftStep = 1;
    updateDraftInstruction();
    // Mark all already-picked cards unavailable — just mark p1's pick
    if (players[1].isCpu) {
      // CPU auto-picks after delay
      setTimeout(() => {
        const remaining = POKEMON_ROSTER.filter(poke => !players.some(p => p.pokemon && p.pokemon.id === poke.id));
        const cpuPick = remaining[rand(0, remaining.length - 1)];
        showDraftPageForPokemon(cpuPick);
        const pick = Number(Object.keys(draftMap).find(n => draftMap[n] && draftMap[n].id === cpuPick.id));
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
    p.maxHp = startingHp;
    p.hp = startingHp;
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

  const nextBtn = document.getElementById('next-player-btn');
  if (nextBtn) nextBtn.style.display = 'none';

  finishMode = false;
  finishTotal = 0;
  finishTarget = 0;

  resetDartSlots();
  const nameEl = document.getElementById('turn-player-name');
  if (nameEl) { nameEl.textContent = p.name; nameEl.classList.toggle('cpu-turn', p.isCpu); }
  const subEl = document.getElementById('turn-sub');
  if (subEl) subEl.textContent = p.isCpu ? 'Computer thinking...' : 'Throw your darts';
  applyTurnIndicator();

  updateBattleField();
  updateScoringGuide();
  if (p.isCpu) setTimeout(() => runCpuTurn(), tDelay(1200));
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

function startFinishModeWithRemainingDarts() {
  const p = players[currentPlayer];
  const opp = players[1 - currentPlayer];
  if (!gameActive || !p || !opp || opp.hp <= 0 || opp.hp > 20) return false;
  if (currentDarts.length >= p._maxDartsThisTurn) return false;

  finishMode = true;
  finishTarget = opp.hp;
  finishTotal = 0;
  seenThrows = 0;
  turnEnded = false;

  const nextBtn = document.getElementById('next-player-btn');
  if (nextBtn) nextBtn.style.display = 'none';
  aSfx(sfxFinishMode);
  flash(`FINISH! Hit ${finishTarget} exactly!`, 'var(--poke-yellow)');
  const subEl = document.getElementById('turn-sub');
  if (subEl) subEl.textContent = p.isCpu ? 'Computer thinking...' : `Hit ${finishTarget} EXACTLY`;
  updateBattleField();
  updateScoringGuide();
  return true;
}

// =============================================
// DART REGISTRATION
// =============================================
function registerDart(seg) {
  if (!gameActive || turnEnded) return;
  const p = players[currentPlayer];
  const opp = players[1 - currentPlayer];
  if (currentDarts.length >= p._maxDartsThisTurn) return;

  saveState();
  p.dartsThrown++;
  const dartIdx = currentDarts.length;

  const damage = segScore(seg);
  const mul = seg ? Number(seg.multiplier || 1) : 0;
  const label = damage > 0 ? `-${damage}` : 'Miss';
  const slotClass = damage > 0 ? (mul === 3 || damage === 50 ? 'scored' : 'hit') : 'miss';

  if (damage > 0) {
    opp.hp = Math.max(0, opp.hp - damage);
    p.totalDmg += damage;
    aSfx(mul === 3 || damage === 50 ? sfxPokeCrit : sfxPokeDamage);
    flash(`-${damage} HP`, 'var(--poke-red)');
    aSpeak(`${damage} damage!`);
  } else {
    aSfx(sfxMiss);
    flash('Miss!', 'var(--muted)');
  }

  currentDarts.push({ label, type: damage > 0 ? 'damage' : 'miss', amount: damage, score: damage, mul });
  updateDartSlot(dartIdx, label, slotClass);

  if (damage > 0) checkEvolution(currentPlayer);
  if (checkWin()) { turnEnded = true; return; }
  updateBattleField();

  const maxed = currentDarts.length >= p._maxDartsThisTurn;
  if (maxed) {
    checkEvolution(currentPlayer);
    turnEnded = true;
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
    flash(`-${result.amount} HP`, 'var(--poke-red)');
    aSpeak(`${result.amount} damage!`);
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
    flash(`CRITICAL HIT! -${result.amount}`, '#ff4444');
    aSpeak(`Critical hit! ${result.amount} damage!`);
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
  flash(`${newName.toUpperCase()}!`, 'var(--poke-yellow)');
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

  flash(`EVOLUTION! ${newName}!`, 'var(--gold)');
  aSpeak(`${voicePokemonName(p.pokemon)} evolved into ${newName}!`);
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
  const shouldCountWinningTurn = gameActive && currentPlayer === idx && currentDarts.length > 0;
  gameActive = false;
  const winner = players[idx], loser = players[1 - idx];
  if (shouldCountWinningTurn) winner.cpTurns++;
  if (!testMode && sfxEnabled) playWinMusic();
  aSpeak(`${winner.name} wins!`, true);

  const avgCp = p => p.cpTurns > 0 ? Math.round((p.totalDmg + p.totalHeal) / p.cpTurns) : 0;
  const winnerCp = avgCp(winner);
  const loserCp  = avgCp(loser);

  const legStr = legNumber > 0 ? `Leg ${legNumber + 1} · ` : '';
  document.getElementById('win-name').textContent = winner.name;
  document.getElementById('win-details').innerHTML =
    `${legStr}${winner.pokemon.name} · ${startingHp} HP<br>` +
    `<span style="font-size:14px;color:var(--muted)">Avg CP: ${winnerCp} · Dealt: ${winner.totalDmg} DMG</span>`;

  const othersEl = document.getElementById('win-others');
  if (othersEl) othersEl.innerHTML = `<div class="win-other-card">
    <div class="win-other-name">${escapeHTML(loser.name)}</div>
    <div class="win-other-score">${escapeHTML(loser.pokemon.name)}</div>
    <div class="win-other-score">Avg CP: ${loserCp} · Dealt: ${loser.totalDmg}</div>
  </div>`;

  players.forEach((p, i) => {
    if (!p.isCpu) savePlayerStat(p.name, p.flag, i === idx, avgCp(p), p.pokemon.name, `${startingHp} HP`);
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
    const subText = p.isCpu ? 'CPU is thinking...' : 'Throw your darts';
    setActionZone(hint, subText);
    const az = document.querySelector('.action-zone');
    if (az) az.classList.remove('finish-mode');
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

  const rows = [
    { type: 'SINGLE', value: 'FACE', label: 'DAMAGE', valCls: 'dmg', itemCls: 'sg-dmg' },
    { type: 'DOUBLE', value: 'FACE x2', label: 'DAMAGE', valCls: 'dmg', itemCls: 'sg-dmg' },
    { type: 'TREBLE', value: 'FACE x3', label: 'DAMAGE', valCls: 'dmg', itemCls: 'sg-dmg' },
    { type: 'BULL', value: '25', label: 'DAMAGE', valCls: 'dmg', itemCls: 'sg-dmg' },
    { type: 'BULLSEYE', value: '50', label: 'DAMAGE', valCls: 'gold', itemCls: 'sg-mega' },
    { type: 'MISS', value: '0', label: 'NO DAMAGE', valCls: 'amber', itemCls: 'sg-item-type' },
  ];

  grid.innerHTML = rows.map(it => `
    <div class="sg-item ${it.itemCls}">
      <div class="sg-type">${it.type}</div>
      <div class="sg-value ${it.valCls}">${it.value}</div>
      <div class="sg-label ${it.valCls}">${it.label}</div>
    </div>`).join('');

  if (passiveEl) {
    passiveEl.textContent = `Type: ${playerPokemonTypeLabel(p)}. Every dart score is direct damage.`;
  }
}

function getTargetSuggestion(p) {
  return 'SCORE DAMAGE';
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
    if (cpu.mpr >= 3.0) return 20;
    if (cpu.mpr >= 1.5) return Math.random() < .7 ? 20 : 19;
    return [20,19,18,17,16][rand(0, 4)];
  }

  function doThrow(dartN, cb) {
    if (!gameActive || turnEnded) { cb && cb(); return; }
    const target = cpuPickTarget();
    const seg = generateCpuThrow(target, cpu.mpr, {
      prevSeg,
      dartsThrown: p.dartsThrown,
      sigmaOverride,
      cricketAim: true,
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
        if (gameActive && !turnEnded && !finishMode) {
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
  window.addEventListener('resize', () => { if (gameActive) updateBattleField(); });
});
