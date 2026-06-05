'use strict';

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 褰圭琛?// closed_han: 闂ㄦ竻鏃剁炕鏁? open_han: 鍓湶鏃剁炕鏁?(null=闂ㄦ竻闄愬畾)
// fu_fixed: 鍥哄畾绗︽暟  tsumo_only: 鑷懜闄愬畾
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
const YAKU = [
  { id: 'riichi',        name: '绔嬬洿',         closed_han: 1,  open_han: null },
  { id: 'double_riichi', name: '鍙岀珛鐩?,       closed_han: 2,  open_han: null },
  { id: 'ippatsu',       name: '涓€鍙?,         closed_han: 1,  open_han: null },
  { id: 'tsumo',         name: '闂ㄦ竻鑷懜',     closed_han: 1,  open_han: null, tsumo_only: true },
  { id: 'pinfu',         name: '骞冲拰',         closed_han: 1,  open_han: null },
  { id: 'iipeiko',       name: '涓€鏉彛',       closed_han: 1,  open_han: null },
  { id: 'ryanpeiko',     name: '浜屾澂鍙?,       closed_han: 3,  open_han: null },
  { id: 'tanyao',        name: '鏂购涔?,       closed_han: 1,  open_han: 1 },
  { id: 'haku',          name: '鐧斤紙褰圭墝锛?,   closed_han: 1,  open_han: 1 },
  { id: 'hatsu',         name: '鍙戯紙褰圭墝锛?,   closed_han: 1,  open_han: 1 },
  { id: 'chun',          name: '涓紙褰圭墝锛?,   closed_han: 1,  open_han: 1 },
  { id: 'seat_wind',     name: '闂ㄩ锛堝焦鐗岋級', closed_han: 1,  open_han: 1 },
  { id: 'round_wind',    name: '鍦洪锛堝焦鐗岋級', closed_han: 1,  open_han: 1 },
  { id: 'chiitoi',       name: '涓冨瀛?,       closed_han: 2,  open_han: null, fu_fixed: 25 },
  { id: 'toitoi',        name: '瀵瑰鍜?,       closed_han: 2,  open_han: 2 },
  { id: 'sanankou',      name: '涓夋殫鍒?,       closed_han: 2,  open_han: 2 },
  { id: 'sanshoku',      name: '涓夎壊鍚岄『',     closed_han: 2,  open_han: 1 },
  { id: 'ittsu',         name: '涓€姘旇疮閫?,     closed_han: 2,  open_han: 1 },
  { id: 'chanta',        name: '娣峰叏甯﹀购涔?,   closed_han: 2,  open_han: 1 },
  { id: 'sankantsu',     name: '涓夋潬瀛?,       closed_han: 2,  open_han: 2 },
  { id: 'shousangen',    name: '灏忎笁鍏?,       closed_han: 2,  open_han: 2 },
  { id: 'honitsu',       name: '娣蜂竴鑹?,       closed_han: 3,  open_han: 2 },
  { id: 'junchan',       name: '绾叏甯﹀购涔?,   closed_han: 3,  open_han: 2 },
  { id: 'chinitsu',      name: '娓呬竴鑹?,       closed_han: 6,  open_han: 5 },
  { id: 'rinshan',       name: '宀笂寮€鑺?,     closed_han: 1,  open_han: 1 },
  { id: 'chankan',       name: '鎶㈡潬',         closed_han: 1,  open_han: 1 },
  { id: 'haitei',        name: '娴峰簳鎹炴湀',     closed_han: 1,  open_han: 1 },
  { id: 'houtei',        name: '娌冲簳鎹為奔',     closed_han: 1,  open_han: 1 },
  { id: 'nukidora',      name: '鎷斿寳锛堜笁楹伙級', closed_han: 1,  open_han: 1 },
  // 褰规弧
  { id: 'kokushi',       name: '鍥藉＋鏃犲弻',     closed_han: 13, open_han: null },
  { id: 'suuankou',      name: '鍥涙殫鍒?,       closed_han: 13, open_han: null },
  { id: 'daisangen',     name: '澶т笁鍏?,       closed_han: 13, open_han: 13 },
  { id: 'shousuushii',   name: '灏忓洓鍠?,       closed_han: 13, open_han: 13 },
  { id: 'daisuushii',    name: '澶у洓鍠?,       closed_han: 26, open_han: 26 },
  { id: 'tsuuiisou',     name: '瀛椾竴鑹?,       closed_han: 13, open_han: 13 },
  { id: 'ryuuiisou',     name: '缁夸竴鑹?,       closed_han: 13, open_han: 13 },
  { id: 'chinroutou',    name: '娓呰€佸ご',       closed_han: 13, open_han: 13 },
  { id: 'chuuren',       name: '涔濊幉瀹濈伅',     closed_han: 13, open_han: null },
  { id: 'suukantsu',     name: '鍥涙潬瀛?,       closed_han: 13, open_han: 13 },
];

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 绗︽暟璁＄畻 鈥?闈㈠瓙瀹氫箟
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
const MELD_DEFS = [
  { key: 'seqs',   label: '椤哄瓙',           fuPer: 0  },
  { key: 'sCTri',  label: '涓紶鏆楀埢 (2-8)', fuPer: 4  },
  { key: 'sOTri',  label: '涓紶鏄庡埢 (2-8)', fuPer: 2  },
  { key: 'tCTri',  label: '骞轰節鏆楀埢',       fuPer: 8  },
  { key: 'tOTri',  label: '骞轰節鏄庡埢',       fuPer: 4  },
  { key: 'sCKan',  label: '涓紶鏆楁潬',       fuPer: 16 },
  { key: 'sOKan',  label: '涓紶鏄庢潬',       fuPer: 8  },
  { key: 'tCKan',  label: '骞轰節鏆楁潬',       fuPer: 32 },
  { key: 'tOKan',  label: '骞轰節鏄庢潬',       fuPer: 16 },
];

// 绛夊緟鏂瑰紡 鈫?绗︽暟
const WAIT_FU = { lm: 0, qz: 2, bz: 2, sp: 0, dj: 2 };
const WAIT_LABEL = { lm: '涓ら潰', qz: '宓屽紶', bz: '杈瑰紶', sp: '鍙岀', dj: '鍗曢獞' };

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 鐐规暟璁＄畻
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function roundUp100(n) { return Math.ceil(n / 100) * 100; }

function getPointEntry(han, fu) {
  if (han >= 26) return { label: '鍙屽焦婊?, dealer_ron: 96000, dealer_tsumo_each: 32000, kohai_ron: 64000, kohai_tsumo_dealer: 32000, kohai_tsumo_kohai: 16000 };
  if (han >= 13) return { label: '褰规弧',   dealer_ron: 48000, dealer_tsumo_each: 16000, kohai_ron: 32000, kohai_tsumo_dealer: 16000, kohai_tsumo_kohai: 8000 };
  if (han >= 11) return { label: '涓夊€嶆弧', dealer_ron: 36000, dealer_tsumo_each: 12000, kohai_ron: 24000, kohai_tsumo_dealer: 12000, kohai_tsumo_kohai: 6000 };
  if (han >= 8)  return { label: '鍊嶆弧',   dealer_ron: 24000, dealer_tsumo_each: 8000,  kohai_ron: 16000, kohai_tsumo_dealer: 8000,  kohai_tsumo_kohai: 4000 };
  if (han >= 6)  return { label: '璺虫弧',   dealer_ron: 18000, dealer_tsumo_each: 6000,  kohai_ron: 12000, kohai_tsumo_dealer: 6000,  kohai_tsumo_kohai: 3000 };
  const basic = fu * Math.pow(2, han + 2);
  if (han >= 5 || basic * 4 >= 8000) {
    return { label: '婊¤疮', dealer_ron: 12000, dealer_tsumo_each: 4000, kohai_ron: 8000, kohai_tsumo_dealer: 4000, kohai_tsumo_kohai: 2000 };
  }
  return {
    label: `${han}缈?{fu}绗,
    dealer_ron:          roundUp100(basic * 6),
    dealer_tsumo_each:   roundUp100(basic * 2),
    kohai_ron:           roundUp100(basic * 4),
    kohai_tsumo_dealer:  roundUp100(basic * 2),
    kohai_tsumo_kohai:   roundUp100(basic * 1),
  };
}

// 璁＄畻鏀粯缁撴瀯
// 杩斿洖 { payments: [{from, to, amount}], winnerGain, label, kyotakuBonus }
function calcWinPayment({ han, fu, isDealer, winType, winnerIdx, payerIdx, dealerIdx, honba, kyotaku }) {
  if (han <= 0) return null;
  const pt = getPointEntry(han, fu);
  const others = [0, 1, 2].filter(i => i !== winnerIdx);
  const payments = [];
  let winnerGain = kyotaku * 1000;

  if (winType === 'ron') {
    const base = isDealer ? pt.dealer_ron : pt.kohai_ron;
    const amount = base + honba * 300;
    payments.push({ from: payerIdx, to: winnerIdx, amount });
    winnerGain += amount;
  } else {
    // 涓変汉楹诲皢鑷懜锛氬彟澶栦袱浜哄悇鑷粯閽?    others.forEach(p => {
      const base = isDealer
        ? pt.dealer_tsumo_each
        : (p === dealerIdx ? pt.kohai_tsumo_dealer : pt.kohai_tsumo_kohai);
      const amount = base + honba * 100;
      payments.push({ from: p, to: winnerIdx, amount });
      winnerGain += amount;
    });
  }

  return { payments, winnerGain, label: pt.label, kyotakuBonus: kyotaku * 1000 };
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 娓告垙鐘舵€?// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
const ROUNDS = ['涓?, '鍗?, '瑗?];
const SEAT_WINDS = ['涓?, '鍗?, '瑗?];

const state = {
  players: [
    { name: '鐜╁1', score: 35000 },
    { name: '鐜╁2', score: 35000 },
    { name: '鐜╁3', score: 35000 },
  ],
  dealer: 0,
  roundWind: 0,
  roundNum: 1,
  honba: 0,
  kyotaku: 0,
  log: [],
  startScore: 35000,
};

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// UI 鐘舵€?// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
const ui = {
  winnerIdx: 0,
  winType: 'ron',
  payerIdx: 1,
  isOpen: false,
  selectedYaku: new Set(),
  dora: 0,
  ura: 0,
  fu: 30,
  fuMode: 'manual',  // 'manual' | 'detail'
  fuDetail: makeFuDetail(),
  riichiWho: 0,
  tenpaiSet: new Set(),
};

function makeFuDetail() {
  return {
    seqs: 0, sCTri: 0, sOTri: 0, tCTri: 0, tOTri: 0,
    sCKan: 0, sOKan: 0, tCKan: 0, tOKan: 0,
    pairFu: 0,
    waitType: 'lm',
    waitFu: 0,
  };
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// DOM 宸ュ叿
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
const $ = id => document.getElementById(id);
const PANELS = ['win-panel', 'riichi-panel', 'draw-panel', 'settings-panel'];

function showPanel(id) {
  PANELS.forEach(p => $(p).classList.add('hidden'));
  $('overlay').classList.remove('hidden');
  $(id).classList.remove('hidden');
  $(id).scrollTop = 0;
}
function hidePanels() {
  PANELS.forEach(p => $(p).classList.add('hidden'));
  $('overlay').classList.add('hidden');
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 娓叉煋
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function getRole(playerIdx) {
  return SEAT_WINDS[(playerIdx - state.dealer + 3) % 3];
}

function renderScoreboard(deltas) {
  state.players.forEach((p, i) => {
    $(`name-${i}`).textContent = p.name;
    $(`score-${i}`).textContent = p.score.toLocaleString();
    $(`player-${i}`).classList.toggle('dealer', i === state.dealer);
    $(`role-${i}`).textContent = getRole(i);
    const el = $(`delta-${i}`);
    const d = deltas && deltas[i];
    if (d) {
      el.textContent = (d > 0 ? '+' : '') + d.toLocaleString();
      el.className = 'player-delta ' + (d > 0 ? 'positive' : 'negative');
    } else {
      el.textContent = '';
      el.className = 'player-delta';
    }
  });
}

function renderHeader() {
  $('round-label').textContent = `${ROUNDS[state.roundWind]}${state.roundNum}灞€`;
  $('honba-label').textContent = `${state.honba}鏈満`;
  $('kyotaku-label').textContent = state.kyotaku;
}

// 鐢熸垚鐜╁閫夋嫨鎸夐挳
function buildPlayerButtons(groupId, selectedIdx, excludeIdx = -1) {
  const g = $(groupId);
  g.innerHTML = '';
  state.players.forEach((p, i) => {
    if (i === excludeIdx) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sel-btn' + (i === selectedIdx ? ' active' : '');
    btn.textContent = p.name || `鐜╁${i + 1}`;
    btn.dataset.value = i;
    g.appendChild(btn);
  });
}

function activateOne(groupId, value) {
  $(groupId).querySelectorAll('[data-value]').forEach(b =>
    b.classList.toggle('active', +b.dataset.value === value));
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 绗︽暟璁＄畻
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

// 浠庤缁嗚緭鍏ヨ绠楃鏁?function calcFuFromDetail() {
  if (ui.selectedYaku.has('chiitoi')) return 25;
  if (ui.selectedYaku.has('pinfu'))   return ui.winType === 'tsumo' ? 20 : 30;

  const fd = ui.fuDetail;
  const meldFu = MELD_DEFS.reduce((s, d) => s + fd[d.key] * d.fuPer, 0);

  // 鍜岀墝绗︼細闂ㄦ竻鑽ｅ拰+10锛岃嚜鎽?2锛堝钩鍜岃嚜鎽镐负20鍥哄畾锛屼絾涓婇潰宸插鐞嗭級
  const winFu = ui.winType === 'tsumo' ? 2 : (!ui.isOpen ? 10 : 0);

  const raw = 20 + meldFu + fd.pairFu + fd.waitFu + winFu;
  return Math.max(Math.ceil(raw / 10) * 10, 20);
}

// 褰撳墠缈绘暟/绗︽暟
function calcCurrentHanFu() {
  let han = ui.dora + ui.ura;
  let fuFixed = null;

  YAKU.forEach(y => {
    if (!ui.selectedYaku.has(y.id)) return;
    const h = ui.isOpen ? y.open_han : y.closed_han;
    if (h === null) return;
    han += h;
    if (y.fu_fixed) fuFixed = y.fu_fixed;
  });

  // 骞冲拰閿佸畾
  if (ui.selectedYaku.has('pinfu')) {
    fuFixed = ui.winType === 'tsumo' ? 20 : 30;
  }

  const fu = fuFixed !== null ? fuFixed
    : (ui.fuMode === 'detail' ? calcFuFromDetail() : ui.fu);

  return { han, fu, fuFixed };
}

// 鐢熸垚闈㈠瓙璁℃暟鍣ㄨ
function buildFuMeldGrid() {
  const grid = $('fu-meld-grid');
  grid.innerHTML = '';
  MELD_DEFS.forEach(def => {
    const row = document.createElement('div');
    row.className = 'fu-meld-row';
    row.innerHTML = `
      <span class="fu-meld-name">${def.label}</span>
      <span class="fu-per">${def.fuPer}绗?/span>
      <div class="fc-counter">
        <button type="button" class="fc-btn fc-minus" data-key="${def.key}">鈭?/button>
        <span class="fc-val" id="fc-${def.key}">0</span>
        <button type="button" class="fc-btn fc-plus" data-key="${def.key}">锛?/button>
      </div>`;
    grid.appendChild(row);
  });
}

// 鍒锋柊闈㈠瓙璁℃暟鏄剧ず & 鎬荤粍鏁?function updateMeldCountDisplay() {
  MELD_DEFS.forEach(d => {
    const el = $(`fc-${d.key}`);
    if (el) el.textContent = ui.fuDetail[d.key];
  });
  const total = MELD_DEFS.reduce((s, d) => s + ui.fuDetail[d.key], 0);
  const el = $('fu-meld-count');
  el.textContent = `${total}/4缁刞;
  el.className = 'fu-meld-count' + (total > 4 ? ' over' : '');
}

// 鏇存柊绗︽暟璁＄畻缁撴灉灞曠ず
function updateFuCalcResult() {
  const result = $('fu-calc-result');
  if (!result) return;

  if (ui.selectedYaku.has('chiitoi')) {
    result.innerHTML = '<span class="fu-lock">涓冨瀛愬浐瀹?25绗?/span>';
    return;
  }
  if (ui.selectedYaku.has('pinfu')) {
    const fu = ui.winType === 'tsumo' ? 20 : 30;
    result.innerHTML = `<span class="fu-lock">骞冲拰鍥哄畾 ${fu}绗?/span>`;
    return;
  }

  const { han } = calcCurrentHanFu();
  if (han >= 13) {
    result.innerHTML = '<span class="fu-lock">褰规弧鏃犻渶璁＄畻绗︽暟</span>';
    return;
  }
  if (han >= 5) {
    result.innerHTML = '<span class="fu-lock">5缈讳互涓婏紙婊¤疮璧凤級锛岀鏁颁笉褰卞搷鐐规暟</span>';
    return;
  }

  const fd = ui.fuDetail;
  const meldFu = MELD_DEFS.reduce((s, d) => s + fd[d.key] * d.fuPer, 0);
  const winFu  = ui.winType === 'tsumo' ? 2 : (!ui.isOpen ? 10 : 0);
  const winDesc = ui.winType === 'tsumo' ? '鑷懜+2' : (!ui.isOpen ? '闂ㄦ竻鑽ｅ拰+10' : '鍓湶鑽ｅ拰+0');
  const raw    = 20 + meldFu + fd.pairFu + fd.waitFu + winFu;
  const rounded = Math.max(Math.ceil(raw / 10) * 10, 20);

  const total = MELD_DEFS.reduce((s, d) => s + fd[d.key], 0);
  const meldWarn = total > 4
    ? `<span style="color:var(--red)"> 鈿犺秴鍑?{total}缁?/span>`
    : '';

  result.innerHTML = `
    <div>20搴?+ ${meldFu}闈㈠瓙${meldWarn} + ${fd.pairFu}闆€澶?+ ${fd.waitFu}绛夊緟锛?{WAIT_LABEL[fd.waitType]}锛?+ ${winFu}锛?{winDesc}锛?/div>
    <div class="fu-total">= 鍘熷 ${raw}绗?鈫?<strong>${rounded}绗?/strong></div>`;
}

// 鏇存柊绗︽暟鏄剧ず + 缈绘暟寰芥爣
function updateFuDisplay() {
  const { han, fu, fuFixed } = calcCurrentHanFu();
  const isYakuman = han >= 13;
  const isMangan  = han >= 5 || (han > 0 && fu * Math.pow(2, han + 2) * 4 >= 8000);
  const locked = fuFixed !== null || isMangan;

  // 濮嬬粓鏄剧ず褰撳墠绗︽暟
  $('fu-computed-val').textContent = han <= 0 ? '鈥? : `${fu}绗;

  // 鎵嬪姩 vs 璇︾粏
  const manualRow  = $('fu-manual-row');
  const calcSec    = $('fu-calc-section');

  if (ui.fuMode === 'manual') {
    manualRow.classList.remove('hidden');
    calcSec.classList.add('hidden');
    manualRow.style.opacity = locked ? '0.4' : '1';
    manualRow.style.pointerEvents = locked ? 'none' : '';
    if (fuFixed !== null) $('fu-select').value = fuFixed;
  } else {
    manualRow.classList.add('hidden');
    calcSec.classList.remove('hidden');
    calcSec.style.opacity = (locked && fuFixed !== null) ? '0.4' : '1';
    calcSec.style.pointerEvents = (locked && fuFixed !== null) ? 'none' : '';
    updateFuCalcResult();
  }

  // 缈绘暟寰芥爣
  const badge = $('han-total-badge');
  if (han <= 0) {
    badge.textContent = '0缈?;
    badge.className = 'badge zero';
  } else {
    badge.textContent = getPointEntry(han, fu).label;
    badge.className = 'badge' + (isYakuman ? ' yakuman' : isMangan ? ' mangan' : '');
  }
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 褰圭鍒楄〃
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function buildYakuList() {
  const list = $('yaku-list');
  list.innerHTML = '';
  YAKU.forEach(y => {
    const canOpen  = y.open_han !== null;
    const available = ui.isOpen ? canOpen : true;
    const matchWin  = y.tsumo_only ? (ui.winType === 'tsumo') : true;
    const hanVal    = (ui.isOpen && canOpen) ? y.open_han : y.closed_han;
    const hanLabel  = y.closed_han >= 13 ? '褰规弧'
      : `${hanVal}缈?{y.open_han === null ? '锛堥棬娓咃級' : ''}`;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'yaku-btn'
      + (ui.selectedYaku.has(y.id) ? ' active' : '')
      + ((!available || !matchWin) ? ' disabled' : '');
    btn.dataset.id = y.id;
    btn.innerHTML = `${y.name}<span class="yaku-han">${hanLabel}</span>`;

    if (!available || !matchWin) ui.selectedYaku.delete(y.id);
    list.appendChild(btn);
  });
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 鏀粯棰勮
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function updateWinPreview() {
  const preview = $('payment-preview');
  const { han, fu } = calcCurrentHanFu();

  if (han <= 0) {
    preview.innerHTML = '<div class="preview-error">鏃犲焦锛堜笉鑳藉拰鐗岋級</div>';
    return;
  }

  const isDealer = ui.winnerIdx === state.dealer;
  const result = calcWinPayment({
    han, fu, isDealer,
    winType: ui.winType,
    winnerIdx: ui.winnerIdx,
    payerIdx:  ui.payerIdx,
    dealerIdx: state.dealer,
    honba:     state.honba,
    kyotaku:   state.kyotaku,
  });

  if (!result) { preview.innerHTML = '<div class="preview-error">璁＄畻鍑洪敊</div>'; return; }

  const pt = getPointEntry(han, fu);
  let html = `<div class="preview-label">${pt.label}</div>`;

  result.payments.forEach(p => {
    const fromName = state.players[p.from].name;
    const toName   = state.players[p.to].name;
    html += `<div class="preview-row"><span>${fromName} 鈫?${toName}</span><span class="amount">${p.amount.toLocaleString()}</span></div>`;
  });

  if (state.kyotaku > 0) {
    html += `<div class="preview-row"><span>鏀朵緵鎵?/span><span class="amount">+${(state.kyotaku * 1000).toLocaleString()}</span></div>`;
  }
  if (state.honba > 0) {
    const bonus = ui.winType === 'ron'
      ? `+${(state.honba * 300).toLocaleString()}`
      : `+${(state.honba * 100).toLocaleString()} 脳 ${result.payments.length}浜篳;
    html += `<div class="preview-row"><span>鏈満濂栧姳</span><span class="amount">${bonus}</span></div>`;
  }

  html += `<div class="preview-total"><span>${state.players[ui.winnerIdx].name} 鎬绘敹鍏?/span><span>+${result.winnerGain.toLocaleString()}</span></div>`;
  preview.innerHTML = html;
}

function renderDrawPreview() {
  const tenpai = [...ui.tenpaiSet];
  const noten  = [0, 1, 2].filter(i => !tenpai.includes(i));
  const preview = $('draw-preview');

  if (tenpai.length === 0 || tenpai.length === 3) {
    preview.innerHTML = '<div style="color:var(--text-dim)">鏃犵偣鏁拌浆绉?/div>';
    return;
  }
  // 3浜猴細鎬?000鐐瑰啀鍒嗛厤
  const notenPay  = Math.round(3000 / noten.length);
  const tenpaiGet = Math.round(3000 / tenpai.length);

  let html = '';
  noten.forEach(n  => { html += `<div class="preview-row"><span>${state.players[n].name}锛堟棤鍚級</span><span class="amount" style="color:var(--red)">鈭?{notenPay.toLocaleString()}</span></div>`; });
  tenpai.forEach(t => { html += `<div class="preview-row"><span>${state.players[t].name}锛堝惉鐗岋級</span><span class="amount" style="color:var(--green)">+${tenpaiGet.toLocaleString()}</span></div>`; });
  preview.innerHTML = html;
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 瀵瑰眬璁板綍
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function addLog(desc, deltas) {
  const round = `${ROUNDS[state.roundWind]}${state.roundNum}灞€ ${state.honba}鏈満`;
  state.log.unshift({ round, desc, deltas: [...deltas] });
  renderLog();
}

function renderLog() {
  const el = $('log-entries');
  if (!state.log.length) {
    el.innerHTML = '<div class="log-empty">鏆傛棤璁板綍</div>';
    return;
  }
  el.innerHTML = state.log.slice(0, 30).map(e => {
    const dStr = e.deltas.map((d, i) => {
      if (!d) return '';
      const name = state.players[i]?.name ?? `鐜╁${i+1}`;
      return `${name}:${d > 0 ? '+' : ''}${d.toLocaleString()}`;
    }).filter(Boolean).join('  ');
    return `<div class="log-entry">
      <div class="log-round">${e.round}</div>
      <div class="log-desc">${e.desc}</div>
      <div class="log-score-change">${dStr}</div>
    </div>`;
  }).join('');
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 娓告垙鎿嶄綔
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function advanceRound(dealerWon) {
  if (dealerWon) {
    state.honba++;
  } else {
    state.dealer = (state.dealer + 1) % 3;
    state.roundNum++;
    if (state.roundNum > 3) {
      state.roundNum = 1;
      state.roundWind = (state.roundWind + 1) % 3;
    }
    state.honba = 0;
  }
}

function flashDeltas(deltas) {
  renderScoreboard(deltas);
  setTimeout(renderScoreboard, 3000);
}

function applyWin() {
  const { han, fu } = calcCurrentHanFu();
  if (han <= 0) { alert('璇烽€夋嫨褰圭'); return; }

  const isDealer = ui.winnerIdx === state.dealer;
  const result = calcWinPayment({
    han, fu, isDealer,
    winType:   ui.winType,
    winnerIdx: ui.winnerIdx,
    payerIdx:  ui.payerIdx,
    dealerIdx: state.dealer,
    honba:     state.honba,
    kyotaku:   state.kyotaku,
  });
  if (!result) return;

  const deltas = [0, 0, 0];
  result.payments.forEach(p => {
    state.players[p.from].score -= p.amount;
    deltas[p.from] -= p.amount;
  });
  state.players[ui.winnerIdx].score += result.winnerGain;
  deltas[ui.winnerIdx] += result.winnerGain;
  state.kyotaku = 0;

  const yakuNames = YAKU.filter(y => ui.selectedYaku.has(y.id)).map(y => y.name).join('路');
  const pt = getPointEntry(han, fu);
  const typeStr = ui.winType === 'ron' ? '鑽ｅ拰' : '鑷懜';
  addLog(`${state.players[ui.winnerIdx].name} ${typeStr} ${pt.label}銆?{yakuNames || '褰圭墝绛?} 瀹濈墝${ui.dora}${ui.ura > 0 ? ' 閲屽疂鐗?+ui.ura : ''}銆慲, deltas);

  advanceRound(isDealer);
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

function applyRiichi() {
  const p = ui.riichiWho;
  if (state.players[p].score < 1000) { alert('鐐规暟涓嶈冻'); return; }
  const deltas = [0, 0, 0];
  state.players[p].score -= 1000;
  deltas[p] = -1000;
  state.kyotaku++;
  addLog(`${state.players[p].name} 绔嬬洿`, deltas);
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

function applyDraw() {
  const tenpai = [...ui.tenpaiSet];
  const noten  = [0, 1, 2].filter(i => !tenpai.includes(i));
  const deltas  = [0, 0, 0];

  if (tenpai.length > 0 && tenpai.length < 3) {
    const notenPay  = Math.round(3000 / noten.length);
    const tenpaiGet = Math.round(3000 / tenpai.length);
    noten.forEach(n  => { state.players[n].score  -= notenPay;  deltas[n]  -= notenPay; });
    tenpai.forEach(t => { state.players[t].score  += tenpaiGet; deltas[t]  += tenpaiGet; });
  }

  const tStr = tenpai.length > 0
    ? '鍚墝: ' + tenpai.map(i => state.players[i].name).join('路')
    : '鍏ㄥ憳鏃犲惉';
  addLog(`娴佸眬 鈥?${tStr}`, deltas);
  state.honba++;
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 鎵撳紑鍜岀墝闈㈡澘
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function openWinPanel() {
  ui.winnerIdx   = 0;
  ui.winType     = 'ron';
  ui.payerIdx    = 1;
  ui.isOpen      = false;
  ui.selectedYaku = new Set();
  ui.dora        = 0;
  ui.ura         = 0;
  ui.fu          = 30;
  ui.fuMode      = 'manual';
  ui.fuDetail    = makeFuDetail();

  $('dora-val').textContent = '0';
  $('ura-val').textContent  = '0';
  $('fu-select').value      = '30';
  $('wt-ron').classList.add('active');
  $('wt-tsumo').classList.remove('active');
  $('mode-closed').classList.add('active');
  $('mode-open').classList.remove('active');
  $('fu-mode-manual').classList.add('active');
  $('fu-mode-calc').classList.remove('active');
  $('payer-row').classList.remove('hidden');

  buildPlayerButtons('winner-group', 0);
  buildPlayerButtons('payer-group', 1, 0);
  buildYakuList();
  buildFuMeldGrid();
  updateMeldCountDisplay();
  // Reset pair and wait buttons
  $('fu-pair-group').querySelectorAll('.sel-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  $('fu-wait-group').querySelectorAll('.sel-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  updateFuDisplay();
  updateWinPreview();
  showPanel('win-panel');
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// 鍒濆鍖?鈥?鎵€鏈変簨浠剁洃鍚彧娉ㄥ唽涓€娆?// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function init() {
  renderScoreboard();
  renderHeader();
  renderLog();

  $('overlay').addEventListener('click', hidePanels);

  // 鈹€鈹€ 鎿嶄綔鏍?鈹€鈹€
  $('btn-win').addEventListener('click', openWinPanel);

  $('btn-riichi').addEventListener('click', () => {
    ui.riichiWho = 0;
    buildPlayerButtons('riichi-group', 0);
    showPanel('riichi-panel');
  });

  $('btn-draw').addEventListener('click', () => {
    ui.tenpaiSet = new Set();
    buildPlayerButtons('tenpai-group', -1);
    renderDrawPreview();
    showPanel('draw-panel');
  });

  $('btn-settings').addEventListener('click', () => showPanel('settings-panel'));

  // 鈹€鈹€ 鍜岀墝锛氬拰鐗岃€?鈹€鈹€
  $('winner-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.winnerIdx = +btn.dataset.value;
    activateOne('winner-group', ui.winnerIdx);
    ui.payerIdx = [0, 1, 2].find(i => i !== ui.winnerIdx) ?? 1;
    buildPlayerButtons('payer-group', ui.payerIdx, ui.winnerIdx);
    buildYakuList();
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 鍜岀墝锛氱偣鐐€?鈹€鈹€
  $('payer-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.payerIdx = +btn.dataset.value;
    activateOne('payer-group', ui.payerIdx);
    updateWinPreview();
  });

  // 鈹€鈹€ 鍜岀墝鏂瑰紡 鈹€鈹€
  $('wt-ron').addEventListener('click', () => {
    ui.winType = 'ron';
    $('wt-ron').classList.add('active');
    $('wt-tsumo').classList.remove('active');
    $('payer-row').classList.remove('hidden');
    YAKU.filter(y => y.tsumo_only).forEach(y => ui.selectedYaku.delete(y.id));
    buildYakuList();
    updateFuDisplay();
    updateWinPreview();
  });

  $('wt-tsumo').addEventListener('click', () => {
    ui.winType = 'tsumo';
    $('wt-tsumo').classList.add('active');
    $('wt-ron').classList.remove('active');
    $('payer-row').classList.add('hidden');
    buildYakuList();
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 闂ㄦ竻 / 鍓湶 鈹€鈹€
  $('mode-closed').addEventListener('click', () => {
    ui.isOpen = false;
    $('mode-closed').classList.add('active');
    $('mode-open').classList.remove('active');
    buildYakuList();
    updateFuDisplay();
    updateWinPreview();
  });

  $('mode-open').addEventListener('click', () => {
    ui.isOpen = true;
    $('mode-open').classList.add('active');
    $('mode-closed').classList.remove('active');
    YAKU.filter(y => y.open_han === null).forEach(y => ui.selectedYaku.delete(y.id));
    buildYakuList();
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 褰圭閫夋嫨锛堝鎵橈級 鈹€鈹€
  $('yaku-list').addEventListener('click', e => {
    const btn = e.target.closest('.yaku-btn');
    if (!btn || btn.classList.contains('disabled')) return;
    const id = btn.dataset.id;
    if (ui.selectedYaku.has(id)) { ui.selectedYaku.delete(id); btn.classList.remove('active'); }
    else { ui.selectedYaku.add(id); btn.classList.add('active'); }
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 瀹濈墝 鈹€鈹€
  $('dora-minus').addEventListener('click', () => { if (ui.dora > 0) { ui.dora--; $('dora-val').textContent = ui.dora; updateFuDisplay(); updateWinPreview(); } });
  $('dora-plus').addEventListener('click',  () => { ui.dora++; $('dora-val').textContent = ui.dora; updateFuDisplay(); updateWinPreview(); });
  $('ura-minus').addEventListener('click',  () => { if (ui.ura > 0) { ui.ura--; $('ura-val').textContent = ui.ura; updateFuDisplay(); updateWinPreview(); } });
  $('ura-plus').addEventListener('click',   () => { ui.ura++; $('ura-val').textContent = ui.ura; updateFuDisplay(); updateWinPreview(); });

  // 鈹€鈹€ 绗︽暟妯″紡 鈹€鈹€
  $('fu-mode-manual').addEventListener('click', () => {
    ui.fuMode = 'manual';
    $('fu-mode-manual').classList.add('active');
    $('fu-mode-calc').classList.remove('active');
    updateFuDisplay();
    updateWinPreview();
  });

  $('fu-mode-calc').addEventListener('click', () => {
    ui.fuMode = 'detail';
    $('fu-mode-calc').classList.add('active');
    $('fu-mode-manual').classList.remove('active');
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 鎵嬪姩绗︽暟涓嬫媺 鈹€鈹€
  $('fu-select').addEventListener('change', () => {
    ui.fu = +$('fu-select').value;
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 璇︾粏绗︽暟锛氶潰瀛愯鏁板櫒锛堝鎵橈級鈹€鈹€
  $('fu-meld-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-key]');
    if (!btn) return;
    const key = btn.dataset.key;
    if (btn.classList.contains('fc-plus')) {
      ui.fuDetail[key]++;
    } else {
      if (ui.fuDetail[key] > 0) ui.fuDetail[key]--;
    }
    $(`fc-${key}`).textContent = ui.fuDetail[key];
    updateMeldCountDisplay();
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 璇︾粏绗︽暟锛氶泙澶?鈹€鈹€
  $('fu-pair-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-pair]');
    if (!btn) return;
    ui.fuDetail.pairFu = btn.dataset.pair === 'double' ? 4 : btn.dataset.pair === 'honor' ? 2 : 0;
    $('fu-pair-group').querySelectorAll('.sel-btn').forEach(b =>
      b.classList.toggle('active', b === btn));
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 璇︾粏绗︽暟锛氱瓑寰?鈹€鈹€
  $('fu-wait-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-wait]');
    if (!btn) return;
    const wt = btn.dataset.wait;
    ui.fuDetail.waitType = wt;
    ui.fuDetail.waitFu   = WAIT_FU[wt];
    $('fu-wait-group').querySelectorAll('.sel-btn').forEach(b =>
      b.classList.toggle('active', b === btn));
    updateFuDisplay();
    updateWinPreview();
  });

  // 鈹€鈹€ 鍜岀墝纭/鍙栨秷 鈹€鈹€
  $('win-cancel').addEventListener('click', hidePanels);
  $('win-confirm').addEventListener('click', applyWin);

  // 鈹€鈹€ 绔嬬洿 鈹€鈹€
  $('riichi-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.riichiWho = +btn.dataset.value;
    activateOne('riichi-group', ui.riichiWho);
  });
  $('riichi-cancel').addEventListener('click', hidePanels);
  $('riichi-confirm').addEventListener('click', applyRiichi);

  // 鈹€鈹€ 娴佸眬 鈹€鈹€
  $('tenpai-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    const v = +btn.dataset.value;
    if (ui.tenpaiSet.has(v)) { ui.tenpaiSet.delete(v); btn.classList.remove('active'); }
    else { ui.tenpaiSet.add(v); btn.classList.add('active'); }
    renderDrawPreview();
  });
  $('draw-all-noten').addEventListener('click', () => {
    ui.tenpaiSet = new Set();
    $('tenpai-group').querySelectorAll('.sel-btn').forEach(b => b.classList.remove('active'));
    renderDrawPreview();
  });
  $('draw-all-tenpai').addEventListener('click', () => {
    ui.tenpaiSet = new Set([0, 1, 2]);
    $('tenpai-group').querySelectorAll('.sel-btn').forEach(b => b.classList.add('active'));
    renderDrawPreview();
  });
  $('draw-cancel').addEventListener('click', hidePanels);
  $('draw-confirm').addEventListener('click', applyDraw);

  // 鈹€鈹€ 璁剧疆 鈹€鈹€
  $('settings-cancel').addEventListener('click', hidePanels);
  $('btn-reset').addEventListener('click', () => {
    if (!confirm('纭畾閲嶇疆娓告垙锛?)) return;
    const s = +$('start-score-sel').value;
    state.players.forEach(p => p.score = s);
    Object.assign(state, { dealer: 0, roundWind: 0, roundNum: 1, honba: 0, kyotaku: 0, log: [], startScore: s });
    hidePanels();
    renderScoreboard();
    renderHeader();
    renderLog();
  });

  // 鈹€鈹€ 鐜╁鍚嶅瓧缂栬緫 鈹€鈹€
  [0, 1, 2].forEach(i => {
    $(`name-${i}`).addEventListener('blur', () => {
      state.players[i].name = $(`name-${i}`).textContent.trim() || `鐜╁${i + 1}`;
    });
    $(`name-${i}`).addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); $(`name-${i}`).blur(); }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
