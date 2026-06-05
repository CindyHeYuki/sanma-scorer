'use strict';

// ─────────────────────────────────────────
// 役种表
// closed_han: 门清时翻数  open_han: 副露时翻数 (null=门清限定)
// fu_fixed: 固定符数  tsumo_only: 自摸限定
// ─────────────────────────────────────────
const YAKU = [
  { id: 'riichi',        name: '立直',         closed_han: 1,  open_han: null },
  { id: 'double_riichi', name: '双立直',       closed_han: 2,  open_han: null },
  { id: 'ippatsu',       name: '一发',         closed_han: 1,  open_han: null },
  { id: 'tsumo',         name: '门清自摸',     closed_han: 1,  open_han: null, tsumo_only: true },
  { id: 'pinfu',         name: '平和',         closed_han: 1,  open_han: null },
  { id: 'iipeiko',       name: '一杯口',       closed_han: 1,  open_han: null },
  { id: 'ryanpeiko',     name: '二杯口',       closed_han: 3,  open_han: null },
  { id: 'tanyao',        name: '断幺九',       closed_han: 1,  open_han: 1 },
  { id: 'haku',          name: '白（役牌）',   closed_han: 1,  open_han: 1 },
  { id: 'hatsu',         name: '发（役牌）',   closed_han: 1,  open_han: 1 },
  { id: 'chun',          name: '中（役牌）',   closed_han: 1,  open_han: 1 },
  { id: 'seat_wind',     name: '门风（役牌）', closed_han: 1,  open_han: 1 },
  { id: 'round_wind',    name: '场风（役牌）', closed_han: 1,  open_han: 1 },
  { id: 'chiitoi',       name: '七对子',       closed_han: 2,  open_han: null, fu_fixed: 25 },
  { id: 'toitoi',        name: '对对和',       closed_han: 2,  open_han: 2 },
  { id: 'sanankou',      name: '三暗刻',       closed_han: 2,  open_han: 2 },
  { id: 'sanshoku',      name: '三色同顺',     closed_han: 2,  open_han: 1 },
  { id: 'ittsu',         name: '一气贯通',     closed_han: 2,  open_han: 1 },
  { id: 'chanta',        name: '混全带幺九',   closed_han: 2,  open_han: 1 },
  { id: 'sankantsu',     name: '三杠子',       closed_han: 2,  open_han: 2 },
  { id: 'shousangen',    name: '小三元',       closed_han: 2,  open_han: 2 },
  { id: 'honitsu',       name: '混一色',       closed_han: 3,  open_han: 2 },
  { id: 'junchan',       name: '纯全带幺九',   closed_han: 3,  open_han: 2 },
  { id: 'chinitsu',      name: '清一色',       closed_han: 6,  open_han: 5 },
  { id: 'rinshan',       name: '岭上开花',     closed_han: 1,  open_han: 1 },
  { id: 'chankan',       name: '抢杠',         closed_han: 1,  open_han: 1 },
  { id: 'haitei',        name: '海底捞月',     closed_han: 1,  open_han: 1 },
  { id: 'houtei',        name: '河底捞鱼',     closed_han: 1,  open_han: 1 },
  { id: 'nukidora',      name: '拔北（三麻）', closed_han: 1,  open_han: 1 },
  // 役满
  { id: 'kokushi',       name: '国士无双',     closed_han: 13, open_han: null },
  { id: 'suuankou',      name: '四暗刻',       closed_han: 13, open_han: null },
  { id: 'daisangen',     name: '大三元',       closed_han: 13, open_han: 13 },
  { id: 'shousuushii',   name: '小四喜',       closed_han: 13, open_han: 13 },
  { id: 'daisuushii',    name: '大四喜',       closed_han: 26, open_han: 26 },
  { id: 'tsuuiisou',     name: '字一色',       closed_han: 13, open_han: 13 },
  { id: 'ryuuiisou',     name: '绿一色',       closed_han: 13, open_han: 13 },
  { id: 'chinroutou',    name: '清老头',       closed_han: 13, open_han: 13 },
  { id: 'chuuren',       name: '九莲宝灯',     closed_han: 13, open_han: null },
  { id: 'suukantsu',     name: '四杠子',       closed_han: 13, open_han: 13 },
];

// ─────────────────────────────────────────
// 符数计算 — 面子定义
// ─────────────────────────────────────────
const MELD_DEFS = [
  { key: 'seqs',   label: '顺子',           fuPer: 0  },
  { key: 'sCTri',  label: '中张暗刻 (2-8)', fuPer: 4  },
  { key: 'sOTri',  label: '中张明刻 (2-8)', fuPer: 2  },
  { key: 'tCTri',  label: '幺九暗刻',       fuPer: 8  },
  { key: 'tOTri',  label: '幺九明刻',       fuPer: 4  },
  { key: 'sCKan',  label: '中张暗杠',       fuPer: 16 },
  { key: 'sOKan',  label: '中张明杠',       fuPer: 8  },
  { key: 'tCKan',  label: '幺九暗杠',       fuPer: 32 },
  { key: 'tOKan',  label: '幺九明杠',       fuPer: 16 },
];

// 等待方式 → 符数
const WAIT_FU = { lm: 0, qz: 2, bz: 2, sp: 0, dj: 2 };
const WAIT_LABEL = { lm: '两面', qz: '嵌张', bz: '边张', sp: '双碰', dj: '单骑' };

// ─────────────────────────────────────────
// 点数计算
// ─────────────────────────────────────────
function roundUp100(n) { return Math.ceil(n / 100) * 100; }

function getPointEntry(han, fu) {
  if (han >= 26) return { label: '双役满', dealer_ron: 96000, dealer_tsumo_each: 32000, kohai_ron: 64000, kohai_tsumo_dealer: 32000, kohai_tsumo_kohai: 16000 };
  if (han >= 13) return { label: '役满',   dealer_ron: 48000, dealer_tsumo_each: 16000, kohai_ron: 32000, kohai_tsumo_dealer: 16000, kohai_tsumo_kohai: 8000 };
  if (han >= 11) return { label: '三倍满', dealer_ron: 36000, dealer_tsumo_each: 12000, kohai_ron: 24000, kohai_tsumo_dealer: 12000, kohai_tsumo_kohai: 6000 };
  if (han >= 8)  return { label: '倍满',   dealer_ron: 24000, dealer_tsumo_each: 8000,  kohai_ron: 16000, kohai_tsumo_dealer: 8000,  kohai_tsumo_kohai: 4000 };
  if (han >= 6)  return { label: '跳满',   dealer_ron: 18000, dealer_tsumo_each: 6000,  kohai_ron: 12000, kohai_tsumo_dealer: 6000,  kohai_tsumo_kohai: 3000 };
  const basic = fu * Math.pow(2, han + 2);
  if (han >= 5 || basic * 4 >= 8000) {
    return { label: '满贯', dealer_ron: 12000, dealer_tsumo_each: 4000, kohai_ron: 8000, kohai_tsumo_dealer: 4000, kohai_tsumo_kohai: 2000 };
  }
  return {
    label: `${han}翻${fu}符`,
    dealer_ron:          roundUp100(basic * 6),
    dealer_tsumo_each:   roundUp100(basic * 2),
    kohai_ron:           roundUp100(basic * 4),
    kohai_tsumo_dealer:  roundUp100(basic * 2),
    kohai_tsumo_kohai:   roundUp100(basic * 1),
  };
}

// 计算支付结构
// 返回 { payments: [{from, to, amount}], winnerGain, label, kyotakuBonus }
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
    // 三人麻将自摸：另外两人各自付钱
    others.forEach(p => {
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

// ─────────────────────────────────────────
// 游戏状态
// ─────────────────────────────────────────
const ROUNDS = ['东', '南', '西'];
const SEAT_WINDS = ['东', '南', '西'];

const state = {
  players: [
    { name: '玩家1', score: 35000 },
    { name: '玩家2', score: 35000 },
    { name: '玩家3', score: 35000 },
  ],
  dealer: 0,
  roundWind: 0,
  roundNum: 1,
  honba: 0,
  kyotaku: 0,
  log: [],
  startScore: 35000,
};

// ─────────────────────────────────────────
// UI 状态
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// DOM 工具
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// 渲染
// ─────────────────────────────────────────
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
  $('round-label').textContent = `${ROUNDS[state.roundWind]}${state.roundNum}局`;
  $('honba-label').textContent = `${state.honba}本场`;
  $('kyotaku-label').textContent = state.kyotaku;
}

// 生成玩家选择按钮
function buildPlayerButtons(groupId, selectedIdx, excludeIdx = -1) {
  const g = $(groupId);
  g.innerHTML = '';
  state.players.forEach((p, i) => {
    if (i === excludeIdx) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sel-btn' + (i === selectedIdx ? ' active' : '');
    btn.textContent = p.name || `玩家${i + 1}`;
    btn.dataset.value = i;
    g.appendChild(btn);
  });
}

function activateOne(groupId, value) {
  $(groupId).querySelectorAll('[data-value]').forEach(b =>
    b.classList.toggle('active', +b.dataset.value === value));
}

// ─────────────────────────────────────────
// 符数计算
// ─────────────────────────────────────────

// 从详细输入计算符数
function calcFuFromDetail() {
  if (ui.selectedYaku.has('chiitoi')) return 25;
  if (ui.selectedYaku.has('pinfu'))   return ui.winType === 'tsumo' ? 20 : 30;

  const fd = ui.fuDetail;
  const meldFu = MELD_DEFS.reduce((s, d) => s + fd[d.key] * d.fuPer, 0);

  // 和牌符：门清荣和+10，自摸+2（平和自摸为20固定，但上面已处理）
  const winFu = ui.winType === 'tsumo' ? 2 : (!ui.isOpen ? 10 : 0);

  const raw = 20 + meldFu + fd.pairFu + fd.waitFu + winFu;
  return Math.max(Math.ceil(raw / 10) * 10, 20);
}

// 当前翻数/符数
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

  // 平和锁定
  if (ui.selectedYaku.has('pinfu')) {
    fuFixed = ui.winType === 'tsumo' ? 20 : 30;
  }

  const fu = fuFixed !== null ? fuFixed
    : (ui.fuMode === 'detail' ? calcFuFromDetail() : ui.fu);

  return { han, fu, fuFixed };
}

// 生成面子计数器行
function buildFuMeldGrid() {
  const grid = $('fu-meld-grid');
  grid.innerHTML = '';
  MELD_DEFS.forEach(def => {
    const row = document.createElement('div');
    row.className = 'fu-meld-row';
    row.innerHTML = `
      <span class="fu-meld-name">${def.label}</span>
      <span class="fu-per">${def.fuPer}符</span>
      <div class="fc-counter">
        <button type="button" class="fc-btn fc-minus" data-key="${def.key}">−</button>
        <span class="fc-val" id="fc-${def.key}">0</span>
        <button type="button" class="fc-btn fc-plus" data-key="${def.key}">＋</button>
      </div>`;
    grid.appendChild(row);
  });
}

// 刷新面子计数显示 & 总组数
function updateMeldCountDisplay() {
  MELD_DEFS.forEach(d => {
    const el = $(`fc-${d.key}`);
    if (el) el.textContent = ui.fuDetail[d.key];
  });
  const total = MELD_DEFS.reduce((s, d) => s + ui.fuDetail[d.key], 0);
  const el = $('fu-meld-count');
  el.textContent = `${total}/4组`;
  el.className = 'fu-meld-count' + (total > 4 ? ' over' : '');
}

// 更新符数计算结果展示
function updateFuCalcResult() {
  const result = $('fu-calc-result');
  if (!result) return;

  if (ui.selectedYaku.has('chiitoi')) {
    result.innerHTML = '<span class="fu-lock">七对子固定 25符</span>';
    return;
  }
  if (ui.selectedYaku.has('pinfu')) {
    const fu = ui.winType === 'tsumo' ? 20 : 30;
    result.innerHTML = `<span class="fu-lock">平和固定 ${fu}符</span>`;
    return;
  }

  const { han } = calcCurrentHanFu();
  if (han >= 13) {
    result.innerHTML = '<span class="fu-lock">役满无需计算符数</span>';
    return;
  }
  if (han >= 5) {
    result.innerHTML = '<span class="fu-lock">5翻以上（满贯起），符数不影响点数</span>';
    return;
  }

  const fd = ui.fuDetail;
  const meldFu = MELD_DEFS.reduce((s, d) => s + fd[d.key] * d.fuPer, 0);
  const winFu  = ui.winType === 'tsumo' ? 2 : (!ui.isOpen ? 10 : 0);
  const winDesc = ui.winType === 'tsumo' ? '自摸+2' : (!ui.isOpen ? '门清荣和+10' : '副露荣和+0');
  const raw    = 20 + meldFu + fd.pairFu + fd.waitFu + winFu;
  const rounded = Math.max(Math.ceil(raw / 10) * 10, 20);

  const total = MELD_DEFS.reduce((s, d) => s + fd[d.key], 0);
  const meldWarn = total > 4
    ? `<span style="color:var(--red)"> ⚠超出${total}组</span>`
    : '';

  result.innerHTML = `
    <div>20底 + ${meldFu}面子${meldWarn} + ${fd.pairFu}雀头 + ${fd.waitFu}等待（${WAIT_LABEL[fd.waitType]}） + ${winFu}（${winDesc}）</div>
    <div class="fu-total">= 原始 ${raw}符 → <strong>${rounded}符</strong></div>`;
}

// 更新符数显示 + 翻数徽标
function updateFuDisplay() {
  const { han, fu, fuFixed } = calcCurrentHanFu();
  const isYakuman = han >= 13;
  const isMangan  = han >= 5 || (han > 0 && fu * Math.pow(2, han + 2) * 4 >= 8000);
  const locked = fuFixed !== null || isMangan;

  // 始终显示当前符数
  $('fu-computed-val').textContent = han <= 0 ? '—' : `${fu}符`;

  // 手动 vs 详细
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

  // 翻数徽标
  const badge = $('han-total-badge');
  if (han <= 0) {
    badge.textContent = '0翻';
    badge.className = 'badge zero';
  } else {
    badge.textContent = getPointEntry(han, fu).label;
    badge.className = 'badge' + (isYakuman ? ' yakuman' : isMangan ? ' mangan' : '');
  }
}

// ─────────────────────────────────────────
// 役种相克检测
// ─────────────────────────────────────────
function getIncompatibleYaku() {
  const sel = ui.selectedYaku;
  const incompat = new Set();

  // 和牌方式限制
  if (ui.winType !== 'tsumo') { incompat.add('haitei'); incompat.add('rinshan'); }
  if (ui.winType !== 'ron')   { incompat.add('houtei'); incompat.add('chankan'); }

  // 特殊和牌四者互斥（海底/岭上/河底/抢杠只能一个）
  const WIN_SP = ['haitei', 'rinshan', 'houtei', 'chankan'];
  WIN_SP.forEach(a => {
    if (sel.has(a)) WIN_SP.filter(b => b !== a).forEach(id => incompat.add(id));
  });

  // 一発须依附立直
  if (!sel.has('riichi') && !sel.has('double_riichi')) incompat.add('ippatsu');

  // 立直 ↔ 双立直 互斥
  if (sel.has('riichi'))        incompat.add('double_riichi');
  if (sel.has('double_riichi')) incompat.add('riichi');

  // 平和：全顺子+非役牌雀头，不能与要求刻子/役牌对的役共存
  const PIN = ['haku', 'hatsu', 'chun', 'seat_wind', 'round_wind',
               'toitoi', 'sanankou', 'chiitoi', 'sankantsu', 'shousangen'];
  if (sel.has('pinfu'))            PIN.forEach(id => incompat.add(id));
  if (PIN.some(id => sel.has(id))) incompat.add('pinfu');

  // 七対子：七对结构与四面子结构役相克
  const CHI = ['toitoi', 'iipeiko', 'ryanpeiko', 'sanankou',
               'sanshoku', 'ittsu', 'chanta', 'junchan', 'shousangen', 'sankantsu'];
  if (sel.has('chiitoi'))          CHI.forEach(id => incompat.add(id));
  if (CHI.some(id => sel.has(id))) incompat.add('chiitoi');

  // 対対和：全刻子与顺子役相克
  const TOI = ['iipeiko', 'ryanpeiko', 'sanshoku', 'ittsu'];
  if (sel.has('toitoi'))           TOI.forEach(id => incompat.add(id));
  if (TOI.some(id => sel.has(id))) incompat.add('toitoi');

  // 混一色 ↔ 清一色 互斥
  if (sel.has('honitsu'))  incompat.add('chinitsu');
  if (sel.has('chinitsu')) incompat.add('honitsu');

  // 断幺九：无幺九/字牌，与含幺九/字牌的役相克
  // 混一色需字牌；混全/纯全/清老头需幺九；一气贯通含1和9
  const TAN = ['honitsu', 'chanta', 'junchan', 'chinroutou', 'ittsu'];
  if (sel.has('tanyao'))           TAN.forEach(id => incompat.add(id));
  if (TAN.some(id => sel.has(id))) incompat.add('tanyao');

  // 混全帯幺九 ↔ 纯全帯幺九 互斥（纯全是混全的严格子集）
  if (sel.has('chanta'))  incompat.add('junchan');
  if (sel.has('junchan')) incompat.add('chanta');

  return incompat;
}

// ─────────────────────────────────────────
// 役种列表
// ─────────────────────────────────────────
function buildYakuList() {
  const incompat = getIncompatibleYaku();
  const list = $('yaku-list');
  list.innerHTML = '';
  YAKU.forEach(y => {
    const canOpen   = y.open_han !== null;
    const available = ui.isOpen ? canOpen : true;
    const matchWin  = y.tsumo_only ? (ui.winType === 'tsumo') : true;
    const conflict  = incompat.has(y.id);
    const disabled  = !available || !matchWin || conflict;

    const hanVal   = (ui.isOpen && canOpen) ? y.open_han : y.closed_han;
    const hanLabel = y.closed_han >= 13 ? '役满'
      : `${hanVal}翻${y.open_han === null ? '（门清）' : ''}`;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'yaku-btn'
      + (ui.selectedYaku.has(y.id) ? ' active' : '')
      + (disabled ? ' disabled' : '');
    btn.dataset.id = y.id;
    btn.innerHTML = `${y.name}<span class="yaku-han">${hanLabel}</span>`;

    if (disabled) ui.selectedYaku.delete(y.id);
    list.appendChild(btn);
  });
}

// ─────────────────────────────────────────
// 支付预览
// ─────────────────────────────────────────
function updateWinPreview() {
  const preview = $('payment-preview');
  const { han, fu } = calcCurrentHanFu();

  if (han <= 0) {
    preview.innerHTML = '<div class="preview-error">无役（不能和牌）</div>';
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

  if (!result) { preview.innerHTML = '<div class="preview-error">计算出错</div>'; return; }

  const pt = getPointEntry(han, fu);
  let html = `<div class="preview-label">${pt.label}</div>`;

  result.payments.forEach(p => {
    const fromName = state.players[p.from].name;
    const toName   = state.players[p.to].name;
    html += `<div class="preview-row"><span>${fromName} → ${toName}</span><span class="amount">${p.amount.toLocaleString()}</span></div>`;
  });

  if (state.kyotaku > 0) {
    html += `<div class="preview-row"><span>收供托</span><span class="amount">+${(state.kyotaku * 1000).toLocaleString()}</span></div>`;
  }
  if (state.honba > 0) {
    const bonus = ui.winType === 'ron'
      ? `+${(state.honba * 300).toLocaleString()}`
      : `+${(state.honba * 100).toLocaleString()} × ${result.payments.length}人`;
    html += `<div class="preview-row"><span>本场奖励</span><span class="amount">${bonus}</span></div>`;
  }

  html += `<div class="preview-total"><span>${state.players[ui.winnerIdx].name} 总收入</span><span>+${result.winnerGain.toLocaleString()}</span></div>`;
  preview.innerHTML = html;
}

function renderDrawPreview() {
  const tenpai = [...ui.tenpaiSet];
  const noten  = [0, 1, 2].filter(i => !tenpai.includes(i));
  const preview = $('draw-preview');

  if (tenpai.length === 0 || tenpai.length === 3) {
    preview.innerHTML = '<div style="color:var(--text-dim)">无点数转移</div>';
    return;
  }
  // 3人：总3000点再分配
  const notenPay  = Math.round(3000 / noten.length);
  const tenpaiGet = Math.round(3000 / tenpai.length);

  let html = '';
  noten.forEach(n  => { html += `<div class="preview-row"><span>${state.players[n].name}（无听）</span><span class="amount" style="color:var(--red)">−${notenPay.toLocaleString()}</span></div>`; });
  tenpai.forEach(t => { html += `<div class="preview-row"><span>${state.players[t].name}（听牌）</span><span class="amount" style="color:var(--green)">+${tenpaiGet.toLocaleString()}</span></div>`; });
  preview.innerHTML = html;
}

// ─────────────────────────────────────────
// 对局记录
// ─────────────────────────────────────────
function addLog(desc, deltas) {
  const round = `${ROUNDS[state.roundWind]}${state.roundNum}局 ${state.honba}本场`;
  state.log.unshift({ round, desc, deltas: [...deltas] });
  renderLog();
}

function renderLog() {
  const el = $('log-entries');
  if (!state.log.length) {
    el.innerHTML = '<div class="log-empty">暂无记录</div>';
    return;
  }
  el.innerHTML = state.log.slice(0, 30).map(e => {
    const dStr = e.deltas.map((d, i) => {
      if (!d) return '';
      const name = state.players[i]?.name ?? `玩家${i+1}`;
      return `${name}:${d > 0 ? '+' : ''}${d.toLocaleString()}`;
    }).filter(Boolean).join('  ');
    return `<div class="log-entry">
      <div class="log-round">${e.round}</div>
      <div class="log-desc">${e.desc}</div>
      <div class="log-score-change">${dStr}</div>
    </div>`;
  }).join('');
}

// ─────────────────────────────────────────
// 游戏操作
// ─────────────────────────────────────────
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
  if (han <= 0) { alert('请选择役种'); return; }

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

  const yakuNames = YAKU.filter(y => ui.selectedYaku.has(y.id)).map(y => y.name).join('·');
  const pt = getPointEntry(han, fu);
  const typeStr = ui.winType === 'ron' ? '荣和' : '自摸';
  addLog(`${state.players[ui.winnerIdx].name} ${typeStr} ${pt.label}【${yakuNames || '役牌等'} 宝牌${ui.dora}${ui.ura > 0 ? ' 里宝牌'+ui.ura : ''}】`, deltas);

  advanceRound(isDealer);
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

function applyRiichi() {
  const p = ui.riichiWho;
  if (state.players[p].score < 1000) { alert('点数不足'); return; }
  const deltas = [0, 0, 0];
  state.players[p].score -= 1000;
  deltas[p] = -1000;
  state.kyotaku++;
  addLog(`${state.players[p].name} 立直`, deltas);
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
    ? '听牌: ' + tenpai.map(i => state.players[i].name).join('·')
    : '全员无听';
  addLog(`流局 — ${tStr}`, deltas);
  state.honba++;
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

// ─────────────────────────────────────────
// 打开和牌面板
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// 初始化 — 所有事件监听只注册一次
// ─────────────────────────────────────────
function init() {
  renderScoreboard();
  renderHeader();
  renderLog();

  $('overlay').addEventListener('click', hidePanels);

  // ── 操作栏 ──
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

  // ── 和牌：和牌者 ──
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

  // ── 和牌：点炮者 ──
  $('payer-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.payerIdx = +btn.dataset.value;
    activateOne('payer-group', ui.payerIdx);
    updateWinPreview();
  });

  // ── 和牌方式 ──
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

  // ── 门清 / 副露 ──
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

  // ── 役种选择（委托） ──
  $('yaku-list').addEventListener('click', e => {
    const btn = e.target.closest('.yaku-btn');
    if (!btn || btn.classList.contains('disabled')) return;
    const id = btn.dataset.id;
    if (ui.selectedYaku.has(id)) ui.selectedYaku.delete(id);
    else ui.selectedYaku.add(id);
    buildYakuList();  // 重建列表以更新相克禁用状态
    updateFuDisplay();
    updateWinPreview();
  });

  // ── 宝牌 ──
  $('dora-minus').addEventListener('click', () => { if (ui.dora > 0) { ui.dora--; $('dora-val').textContent = ui.dora; updateFuDisplay(); updateWinPreview(); } });
  $('dora-plus').addEventListener('click',  () => { ui.dora++; $('dora-val').textContent = ui.dora; updateFuDisplay(); updateWinPreview(); });
  $('ura-minus').addEventListener('click',  () => { if (ui.ura > 0) { ui.ura--; $('ura-val').textContent = ui.ura; updateFuDisplay(); updateWinPreview(); } });
  $('ura-plus').addEventListener('click',   () => { ui.ura++; $('ura-val').textContent = ui.ura; updateFuDisplay(); updateWinPreview(); });

  // ── 符数模式 ──
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

  // ── 手动符数下拉 ──
  $('fu-select').addEventListener('change', () => {
    ui.fu = +$('fu-select').value;
    updateFuDisplay();
    updateWinPreview();
  });

  // ── 详细符数：面子计数器（委托）──
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

  // ── 详细符数：雀头 ──
  $('fu-pair-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-pair]');
    if (!btn) return;
    ui.fuDetail.pairFu = btn.dataset.pair === 'double' ? 4 : btn.dataset.pair === 'honor' ? 2 : 0;
    $('fu-pair-group').querySelectorAll('.sel-btn').forEach(b =>
      b.classList.toggle('active', b === btn));
    updateFuDisplay();
    updateWinPreview();
  });

  // ── 详细符数：等待 ──
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

  // ── 和牌确认/取消 ──
  $('win-cancel').addEventListener('click', hidePanels);
  $('win-confirm').addEventListener('click', applyWin);

  // ── 立直 ──
  $('riichi-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.riichiWho = +btn.dataset.value;
    activateOne('riichi-group', ui.riichiWho);
  });
  $('riichi-cancel').addEventListener('click', hidePanels);
  $('riichi-confirm').addEventListener('click', applyRiichi);

  // ── 流局 ──
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

  // ── 设置 ──
  $('settings-cancel').addEventListener('click', hidePanels);
  $('btn-reset').addEventListener('click', () => {
    if (!confirm('确定重置游戏？')) return;
    const s = +$('start-score-sel').value;
    state.players.forEach(p => p.score = s);
    Object.assign(state, { dealer: 0, roundWind: 0, roundNum: 1, honba: 0, kyotaku: 0, log: [], startScore: s });
    hidePanels();
    renderScoreboard();
    renderHeader();
    renderLog();
  });

  // ── 玩家名字编辑 ──
  [0, 1, 2].forEach(i => {
    $(`name-${i}`).addEventListener('blur', () => {
      state.players[i].name = $(`name-${i}`).textContent.trim() || `玩家${i + 1}`;
    });
    $(`name-${i}`).addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); $(`name-${i}`).blur(); }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
