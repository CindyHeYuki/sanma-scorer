'use strict';

// ─────────────────────────────────────────
// YAKU TABLE
// closed_han: 門前時の翻数  open_han: 副露可能な場合の翻数 (null=門前のみ)
// fu_fixed: 固定符数  tsumo_only: 自摸限定
// ─────────────────────────────────────────
const YAKU = [
  { id: 'riichi',        name: '立直',         closed_han: 1,  open_han: null },
  { id: 'double_riichi', name: 'ダブル立直',   closed_han: 2,  open_han: null },
  { id: 'ippatsu',       name: '一発',         closed_han: 1,  open_han: null },
  { id: 'tsumo',         name: '門前清自摸和', closed_han: 1,  open_han: null, tsumo_only: true },
  { id: 'pinfu',         name: '平和',         closed_han: 1,  open_han: null },
  { id: 'iipeiko',       name: '一盃口',       closed_han: 1,  open_han: null },
  { id: 'ryanpeiko',     name: '二盃口',       closed_han: 3,  open_han: null },
  { id: 'tanyao',        name: '断么九',       closed_han: 1,  open_han: 1 },
  { id: 'haku',          name: '白 (役牌)',    closed_han: 1,  open_han: 1 },
  { id: 'hatsu',         name: '発 (役牌)',    closed_han: 1,  open_han: 1 },
  { id: 'chun',          name: '中 (役牌)',    closed_han: 1,  open_han: 1 },
  { id: 'seat_wind',     name: '門風 (役牌)',  closed_han: 1,  open_han: 1 },
  { id: 'round_wind',    name: '場風 (役牌)',  closed_han: 1,  open_han: 1 },
  { id: 'chiitoi',       name: '七対子',       closed_han: 2,  open_han: null, fu_fixed: 25 },
  { id: 'toitoi',        name: '対々和',       closed_han: 2,  open_han: 2 },
  { id: 'sanankou',      name: '三暗刻',       closed_han: 2,  open_han: 2 },
  { id: 'sanshoku',      name: '三色同順',     closed_han: 2,  open_han: 1 },
  { id: 'ittsu',         name: '一気通貫',     closed_han: 2,  open_han: 1 },
  { id: 'chanta',        name: '混全帯么九',   closed_han: 2,  open_han: 1 },
  { id: 'sankantsu',     name: '三槓子',       closed_han: 2,  open_han: 2 },
  { id: 'shousangen',    name: '小三元',       closed_han: 2,  open_han: 2 },
  { id: 'honitsu',       name: '混一色',       closed_han: 3,  open_han: 2 },
  { id: 'junchan',       name: '純全帯么九',   closed_han: 3,  open_han: 2 },
  { id: 'chinitsu',      name: '清一色',       closed_han: 6,  open_han: 5 },
  { id: 'rinshan',       name: '嶺上開花',     closed_han: 1,  open_han: 1 },
  { id: 'chankan',       name: '搶槓',         closed_han: 1,  open_han: 1 },
  { id: 'haitei',        name: '海底撈月',     closed_han: 1,  open_han: 1 },
  { id: 'houtei',        name: '河底撈魚',     closed_han: 1,  open_han: 1 },
  { id: 'nukidora',      name: '抜き北 (三麻)', closed_han: 1,  open_han: 1 },
  // ── Yakuman ──
  { id: 'kokushi',       name: '国士無双',     closed_han: 13, open_han: null },
  { id: 'suuankou',      name: '四暗刻',       closed_han: 13, open_han: null },
  { id: 'daisangen',     name: '大三元',       closed_han: 13, open_han: 13 },
  { id: 'shousuushii',   name: '小四喜',       closed_han: 13, open_han: 13 },
  { id: 'daisuushii',    name: '大四喜',       closed_han: 26, open_han: 26 },
  { id: 'tsuuiisou',     name: '字一色',       closed_han: 13, open_han: 13 },
  { id: 'ryuuiisou',     name: '緑一色',       closed_han: 13, open_han: 13 },
  { id: 'chinroutou',    name: '清老頭',       closed_han: 13, open_han: 13 },
  { id: 'chuuren',       name: '九蓮宝燈',     closed_han: 13, open_han: null },
  { id: 'suukantsu',     name: '四槓子',       closed_han: 13, open_han: 13 },
];

// ─────────────────────────────────────────
// SCORING LOGIC
// ─────────────────────────────────────────
function roundUp100(n) { return Math.ceil(n / 100) * 100; }

// Returns point values per the standard riichi mahjong table
function getPointEntry(han, fu) {
  if (han >= 26) return { label: 'ダブル役満', dealer_ron: 96000, dealer_tsumo_each: 32000, kohai_ron: 64000, kohai_tsumo_dealer: 32000, kohai_tsumo_kohai: 16000 };
  if (han >= 13) return { label: '役満',       dealer_ron: 48000, dealer_tsumo_each: 16000, kohai_ron: 32000, kohai_tsumo_dealer: 16000, kohai_tsumo_kohai: 8000 };
  if (han >= 11) return { label: '三倍満',     dealer_ron: 36000, dealer_tsumo_each: 12000, kohai_ron: 24000, kohai_tsumo_dealer: 12000, kohai_tsumo_kohai: 6000 };
  if (han >= 8)  return { label: '倍満',       dealer_ron: 24000, dealer_tsumo_each: 8000,  kohai_ron: 16000, kohai_tsumo_dealer: 8000,  kohai_tsumo_kohai: 4000 };
  if (han >= 6)  return { label: '跳満',       dealer_ron: 18000, dealer_tsumo_each: 6000,  kohai_ron: 12000, kohai_tsumo_dealer: 6000,  kohai_tsumo_kohai: 3000 };
  const basic = fu * Math.pow(2, han + 2);
  if (han >= 5 || basic * 4 >= 8000) {
    return { label: '満貫', dealer_ron: 12000, dealer_tsumo_each: 4000, kohai_ron: 8000, kohai_tsumo_dealer: 4000, kohai_tsumo_kohai: 2000 };
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

// Calculate payments for a win.
// Returns { payments: [{from, to, amount}], winnerGain, label, kyotakuBonus }
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
    // 3-player tsumo: 2 others pay
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
// GAME STATE
// ─────────────────────────────────────────
const WINDS = ['東', '南', '西'];

const state = {
  players: [
    { name: 'Player 1', score: 35000 },
    { name: 'Player 2', score: 35000 },
    { name: 'Player 3', score: 35000 },
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
// UI STATE  (mutated by event handlers)
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
  riichiWho: 0,
  tenpaiSet: new Set(),
};

// ─────────────────────────────────────────
// DOM HELPERS
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
// RENDER
// ─────────────────────────────────────────
function getRole(playerIdx) {
  const offset = (playerIdx - state.dealer + 3) % 3;
  return ['東', '南', '西'][offset];
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
  $('round-label').textContent = `${WINDS[state.roundWind]}${state.roundNum}局`;
  $('honba-label').textContent = `${state.honba}本場`;
  $('kyotaku-label').textContent = state.kyotaku;
}

// Build player selector buttons inside a group.
// selectedIdx: which is active (-1 = none)
// excludeIdx:  which to skip (-1 = show all)
function buildPlayerButtons(groupId, selectedIdx, excludeIdx = -1) {
  const g = $(groupId);
  g.innerHTML = '';
  state.players.forEach((p, i) => {
    if (i === excludeIdx) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sel-btn' + (i === selectedIdx ? ' active' : '');
    btn.textContent = p.name || `P${i + 1}`;
    btn.dataset.value = i;
    g.appendChild(btn);
  });
}

function activateBtn(groupId, value) {
  $(groupId).querySelectorAll('.sel-btn').forEach(b =>
    b.classList.toggle('active', +b.dataset.value === value));
}

// ─────────────────────────────────────────
// YAKU / HAN HELPERS
// ─────────────────────────────────────────
function calcCurrentHanFu() {
  const isOpen = ui.isOpen;
  let han = ui.dora + ui.ura;
  let fuFixed = null;

  YAKU.forEach(y => {
    if (!ui.selectedYaku.has(y.id)) return;
    const h = isOpen ? y.open_han : y.closed_han;
    if (h === null) return;
    han += h;
    if (y.fu_fixed) fuFixed = y.fu_fixed;
  });

  if (ui.selectedYaku.has('pinfu')) {
    fuFixed = ui.winType === 'tsumo' ? 20 : 30;
  }

  return { han, fu: fuFixed !== null ? fuFixed : ui.fu, fuFixed };
}

function buildYakuList() {
  const list = $('yaku-list');
  list.innerHTML = '';
  YAKU.forEach(y => {
    const canOpen = y.open_han !== null;
    const available = ui.isOpen ? canOpen : true;
    const matchWin  = y.tsumo_only ? ui.winType === 'tsumo' : true;
    const hanVal    = ui.isOpen ? y.open_han : y.closed_han;
    const hanLabel  = y.closed_han >= 13 ? '役満' :
                      (hanVal + '翻' + (y.open_han === null ? '(門前)' : ''));

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'yaku-btn' +
      (ui.selectedYaku.has(y.id) ? ' active' : '') +
      ((!available || !matchWin) ? ' disabled' : '');
    btn.dataset.id = y.id;
    btn.innerHTML = `${y.name}<span class="yaku-han">${hanLabel}</span>`;

    if (!available || !matchWin) ui.selectedYaku.delete(y.id);
    list.appendChild(btn);
  });
}

function updateFuRowAndBadge() {
  const { han, fu, fuFixed } = calcCurrentHanFu();
  const fuRow = $('fu-row');
  const locked = fuFixed !== null || han >= 5;
  fuRow.style.opacity = locked ? '0.4' : '1';
  fuRow.style.pointerEvents = locked ? 'none' : '';
  if (fuFixed !== null) $('fu-select').value = fuFixed;

  const badge = $('han-total-badge');
  if (han <= 0) {
    badge.textContent = '0翻';
    badge.className = 'badge zero';
  } else {
    const entry = getPointEntry(han, fu);
    badge.textContent = entry.label;
    badge.className = 'badge' +
      (han >= 13 ? ' yakuman' :
       (han >= 5 || fu * Math.pow(2, han + 2) * 4 >= 8000) ? ' mangan' : '');
  }
}

function updateWinPreview() {
  const preview = $('payment-preview');
  const { han, fu } = calcCurrentHanFu();

  if (han <= 0) {
    preview.innerHTML = '<div class="preview-error">役なし（和牌不可）</div>';
    return;
  }

  const isDealer = ui.winnerIdx === state.dealer;
  const result = calcWinPayment({
    han, fu, isDealer,
    winType: ui.winType,
    winnerIdx: ui.winnerIdx,
    payerIdx: ui.payerIdx,
    dealerIdx: state.dealer,
    honba: state.honba,
    kyotaku: state.kyotaku,
  });

  if (!result) { preview.innerHTML = '<div class="preview-error">計算エラー</div>'; return; }

  const pt = getPointEntry(han, fu);
  let html = `<div class="preview-label">${pt.label}</div>`;
  result.payments.forEach(p => {
    const fromName = state.players[p.from].name || `P${p.from + 1}`;
    const toName   = state.players[p.to].name   || `P${p.to + 1}`;
    html += `<div class="preview-row"><span>${fromName} → ${toName}</span><span class="amount">${p.amount.toLocaleString()}</span></div>`;
  });
  if (state.kyotaku > 0) {
    html += `<div class="preview-row"><span>供託回収</span><span class="amount">+${(state.kyotaku * 1000).toLocaleString()}</span></div>`;
  }
  if (state.honba > 0) {
    const bonus = ui.winType === 'ron'
      ? `+${(state.honba * 300).toLocaleString()}`
      : `+${(state.honba * 100).toLocaleString()}×${result.payments.length}人`;
    html += `<div class="preview-row"><span>本場ボーナス</span><span class="amount">${bonus}</span></div>`;
  }
  html += `<div class="preview-total"><span>${state.players[ui.winnerIdx].name} 合計収得</span><span>+${result.winnerGain.toLocaleString()}</span></div>`;
  preview.innerHTML = html;
}

function renderDrawPreview() {
  const tenpai = [...ui.tenpaiSet];
  const noten  = [0, 1, 2].filter(i => !tenpai.includes(i));
  const preview = $('draw-preview');

  if (tenpai.length === 0 || tenpai.length === 3) {
    preview.innerHTML = '<div style="color:var(--text-dim)">点数の移動なし</div>';
    return;
  }

  // 3-player: total redistribution = 3000
  // each noten pays 3000/noten.length; each tenpai gets 3000/tenpai.length
  const notenPayEach  = 3000 / noten.length;
  const tenpaiGetEach = 3000 / tenpai.length;

  let html = '';
  noten.forEach(n  => { html += `<div class="preview-row"><span>${state.players[n].name} (ノーテン)</span><span class="amount" style="color:var(--red)">−${notenPayEach.toLocaleString()}</span></div>`; });
  tenpai.forEach(t => { html += `<div class="preview-row"><span>${state.players[t].name} (聴牌)</span><span class="amount" style="color:var(--green)">+${tenpaiGetEach.toLocaleString()}</span></div>`; });
  preview.innerHTML = html;
}

// ─────────────────────────────────────────
// GAME ACTIONS
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
  setTimeout(() => renderScoreboard(), 3000);
}

function addLog(desc, deltas) {
  const roundStr = `${WINDS[state.roundWind]}${state.roundNum}局 ${state.honba}本場`;
  state.log.unshift({ round: roundStr, desc, deltas: [...deltas] });
  renderLog();
}

function renderLog() {
  const el = $('log-entries');
  if (state.log.length === 0) {
    el.innerHTML = '<div class="log-empty">まだ記録がありません</div>';
    return;
  }
  el.innerHTML = state.log.slice(0, 30).map(e => {
    const dStr = e.deltas.map((d, i) => {
      if (!d) return '';
      return `${state.players[i] ? state.players[i].name : `P${i+1}`}:${d > 0 ? '+' : ''}${d.toLocaleString()}`;
    }).filter(Boolean).join('  ');
    return `<div class="log-entry">
      <div class="log-round">${e.round}</div>
      <div class="log-desc">${e.desc}</div>
      <div class="log-score-change">${dStr}</div>
    </div>`;
  }).join('');
}

function applyWin() {
  const { han, fu } = calcCurrentHanFu();
  if (han <= 0) { alert('役を選択してください'); return; }

  const isDealer = ui.winnerIdx === state.dealer;
  const result = calcWinPayment({
    han, fu, isDealer,
    winType: ui.winType,
    winnerIdx: ui.winnerIdx,
    payerIdx: ui.payerIdx,
    dealerIdx: state.dealer,
    honba: state.honba,
    kyotaku: state.kyotaku,
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

  const yakuNames = YAKU.filter(y => ui.selectedYaku.has(y.id)).map(y => y.name).join('・');
  const pt = getPointEntry(han, fu);
  const winTypeLabel = ui.winType === 'ron' ? '荣和' : '自摸';
  addLog(`${state.players[ui.winnerIdx].name} ${winTypeLabel} ${pt.label}【${yakuNames || '役牌等'} ドラ${ui.dora}${ui.ura > 0 ? ' 裏'+ui.ura : ''}】`, deltas);

  advanceRound(isDealer);
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

function applyRiichi() {
  const p = ui.riichiWho;
  if (state.players[p].score < 1000) { alert('点数が足りません'); return; }
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
    const notenPayEach  = 3000 / noten.length;
    const tenpaiGetEach = 3000 / tenpai.length;
    noten.forEach(n  => { state.players[n].score  -= notenPayEach;  deltas[n]  -= notenPayEach; });
    tenpai.forEach(t => { state.players[t].score  += tenpaiGetEach; deltas[t]  += tenpaiGetEach; });
  }

  const tStr = tenpai.length > 0
    ? '聴牌: ' + tenpai.map(i => state.players[i].name).join('・')
    : '全員ノーテン';
  addLog(`流局 — ${tStr}`, deltas);
  state.honba++;
  hidePanels();
  renderHeader();
  flashDeltas(deltas);
}

// ─────────────────────────────────────────
// OPEN WIN PANEL
// ─────────────────────────────────────────
function openWinPanel() {
  ui.winnerIdx = 0;
  ui.winType = 'ron';
  ui.payerIdx = 1;
  ui.isOpen = false;
  ui.selectedYaku = new Set();
  ui.dora = 0;
  ui.ura = 0;
  ui.fu = 30;

  $('dora-val').textContent = '0';
  $('ura-val').textContent = '0';
  $('fu-select').value = '30';
  $('wt-ron').classList.add('active');
  $('wt-tsumo').classList.remove('active');
  $('mode-closed').classList.add('active');
  $('mode-open').classList.remove('active');
  $('payer-row').classList.remove('hidden');

  buildPlayerButtons('winner-group', ui.winnerIdx);
  buildPlayerButtons('payer-group', ui.payerIdx, ui.winnerIdx);
  buildYakuList();
  updateFuRowAndBadge();
  updateWinPreview();
  showPanel('win-panel');
}

// ─────────────────────────────────────────
// INIT — all event listeners registered ONCE
// ─────────────────────────────────────────
function init() {
  renderScoreboard();
  renderHeader();
  renderLog();

  // Overlay / overlay close
  $('overlay').addEventListener('click', hidePanels);

  // ── Action buttons ──
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

  // ── Win panel: winner ──
  $('winner-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.winnerIdx = +btn.dataset.value;
    activateBtn('winner-group', ui.winnerIdx);
    ui.payerIdx = [0, 1, 2].find(i => i !== ui.winnerIdx) ?? 1;
    buildPlayerButtons('payer-group', ui.payerIdx, ui.winnerIdx);
    buildYakuList();
    updateFuRowAndBadge();
    updateWinPreview();
  });

  // ── Win panel: payer ──
  $('payer-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.payerIdx = +btn.dataset.value;
    activateBtn('payer-group', ui.payerIdx);
    updateWinPreview();
  });

  // ── Win panel: ron / tsumo ──
  $('wt-ron').addEventListener('click', () => {
    ui.winType = 'ron';
    $('wt-ron').classList.add('active');
    $('wt-tsumo').classList.remove('active');
    $('payer-row').classList.remove('hidden');
    YAKU.filter(y => y.tsumo_only).forEach(y => ui.selectedYaku.delete(y.id));
    buildYakuList();
    updateFuRowAndBadge();
    updateWinPreview();
  });

  $('wt-tsumo').addEventListener('click', () => {
    ui.winType = 'tsumo';
    $('wt-tsumo').classList.add('active');
    $('wt-ron').classList.remove('active');
    $('payer-row').classList.add('hidden');
    buildYakuList();
    updateFuRowAndBadge();
    updateWinPreview();
  });

  // ── Win panel: open / closed ──
  $('mode-closed').addEventListener('click', () => {
    ui.isOpen = false;
    $('mode-closed').classList.add('active');
    $('mode-open').classList.remove('active');
    buildYakuList();
    updateFuRowAndBadge();
    updateWinPreview();
  });

  $('mode-open').addEventListener('click', () => {
    ui.isOpen = true;
    $('mode-open').classList.add('active');
    $('mode-closed').classList.remove('active');
    YAKU.filter(y => y.open_han === null).forEach(y => ui.selectedYaku.delete(y.id));
    buildYakuList();
    updateFuRowAndBadge();
    updateWinPreview();
  });

  // ── Win panel: yaku list (delegated) ──
  $('yaku-list').addEventListener('click', e => {
    const btn = e.target.closest('.yaku-btn');
    if (!btn || btn.classList.contains('disabled')) return;
    const id = btn.dataset.id;
    if (ui.selectedYaku.has(id)) {
      ui.selectedYaku.delete(id);
      btn.classList.remove('active');
    } else {
      ui.selectedYaku.add(id);
      btn.classList.add('active');
    }
    updateFuRowAndBadge();
    updateWinPreview();
  });

  // ── Dora / Uradora ──
  $('dora-minus').addEventListener('click', () => { if (ui.dora > 0) { ui.dora--; $('dora-val').textContent = ui.dora; updateFuRowAndBadge(); updateWinPreview(); } });
  $('dora-plus').addEventListener('click',  () => { ui.dora++; $('dora-val').textContent = ui.dora; updateFuRowAndBadge(); updateWinPreview(); });
  $('ura-minus').addEventListener('click',  () => { if (ui.ura > 0) { ui.ura--; $('ura-val').textContent = ui.ura; updateFuRowAndBadge(); updateWinPreview(); } });
  $('ura-plus').addEventListener('click',   () => { ui.ura++; $('ura-val').textContent = ui.ura; updateFuRowAndBadge(); updateWinPreview(); });

  // ── Fu select ──
  $('fu-select').addEventListener('change', () => { ui.fu = +$('fu-select').value; updateFuRowAndBadge(); updateWinPreview(); });

  // ── Win confirm / cancel ──
  $('win-cancel').addEventListener('click', hidePanels);
  $('win-confirm').addEventListener('click', applyWin);

  // ── Riichi panel ──
  $('riichi-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    ui.riichiWho = +btn.dataset.value;
    activateBtn('riichi-group', ui.riichiWho);
  });
  $('riichi-cancel').addEventListener('click', hidePanels);
  $('riichi-confirm').addEventListener('click', applyRiichi);

  // ── Draw panel ──
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

  // ── Settings ──
  $('settings-cancel').addEventListener('click', hidePanels);
  $('btn-reset').addEventListener('click', () => {
    if (!confirm('ゲームをリセットしますか？')) return;
    const s = +$('start-score-sel').value;
    state.players.forEach(p => p.score = s);
    state.dealer = 0;
    state.roundWind = 0;
    state.roundNum = 1;
    state.honba = 0;
    state.kyotaku = 0;
    state.log = [];
    state.startScore = s;
    hidePanels();
    renderScoreboard();
    renderHeader();
    renderLog();
  });

  // ── Player name editing ──
  [0, 1, 2].forEach(i => {
    $(`name-${i}`).addEventListener('blur', () => {
      state.players[i].name = $(`name-${i}`).textContent.trim() || `Player ${i + 1}`;
    });
    // prevent newlines in contenteditable
    $(`name-${i}`).addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); $(`name-${i}`).blur(); }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
