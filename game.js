const byId = id => document.getElementById(id);
const put = (id, text) => { byId(id).textContent = text; };
const hide = (id, hidden) => { byId(id).hidden = hidden; };
const answer = byId('answer');
let language = 'sv';
const saveKey = 'signalbrott-route-v1';
let unlocked = 0;
try {
  const saved = Number(localStorage.getItem(saveKey));
  if (Number.isInteger(saved) && saved >= 0 && saved <= signals.length) unlocked = saved;
} catch {
  // Local-file browsers can deny storage.
}
let stage = Math.min(unlocked, signals.length - 1);
let solved = unlocked === signals.length;
let tool = null;
let doubledRows = 1;
let hintOpen = false;
let whyOpen = false;
let wrong = false;
let soundOn = false;
let audio;

function playSignal() {
  if (!soundOn || audio?.state !== 'running') return;
  [330, 495, 660].forEach((frequency, step) => {
    const time = audio.currentTime + step * .075;
    const tone = audio.createOscillator();
    const volume = audio.createGain();
    tone.frequency.value = frequency;
    volume.gain.setValueAtTime(.06, time);
    volume.gain.exponentialRampToValueAtTime(.001, time + .18);
    tone.connect(volume).connect(audio.destination);
    tone.start(time);
    tone.stop(time + .18);
  });
}

function drawReceiver() {
  const { rows, columns, anchor, guide } = signals[stage];
  const showAnchor = guide === 'row' || guide === 'half' || tool === 'row';
  const showDouble = guide === 'double' || tool === 'double';
  const visibleRows = showAnchor ? Math.max(anchor, rows) : rows;
  const activeRows = guide === 'double' ? doubledRows : showAnchor && guide && !solved ? anchor : rows;
  const boundary = showAnchor ? Math.min(anchor, rows) : showDouble ? (guide ? doubledRows / 2 : rows / 2) : rows;
  const lines = [];
  for (let row = 0; row < visibleRows; row++) {
    const line = document.createElement('div');
    line.className = 'pulse-row';
    if (row === boundary) line.classList.add('boundary');
    if (row >= boundary) line.classList.add('second');
    if (row >= activeRows) line.classList.add('pending');
    for (let col = 0; col < columns; col++) line.append(document.createElement('i'));
    lines.push(line);
  }
  byId('grid').replaceChildren(...lines);

  let readout = rows + ' × ' + columns;
  if (solved) readout += ' = ' + rows * columns;
  if (showAnchor) {
    const change = anchor < rows ? '+' : '−';
    readout = anchor + ' × ' + columns + ' = ' + anchor * columns +
      '  ·  ' + change + ' ' + columns;
    if (guide === 'half') {
      readout = anchor + ' × ' + columns + ' = ' + anchor * columns;
      if (solved) readout += ' → ' + rows + ' × ' + columns + ' = ' + rows * columns;
    } else if (solved && guide === 'row') {
      readout = anchor * columns + ' ' + change + ' ' + columns + ' = ' + rows * columns;
    }
    else if (solved) readout = rows + ' × ' + columns + ' = ' + rows * columns;
  } else if (guide === 'double') {
    const steps = [columns];
    for (let count = 2; count <= doubledRows; count *= 2) steps.push(count * columns);
    readout = steps.join(' → ');
  } else if (showDouble && !solved) {
    readout = rows / 2 + ' × ' + columns + ' = ' + rows * columns / 2 +
      '  ·  ' + rows * columns / 2 + ' + ' + rows * columns / 2;
  }
  put('groups', readout);
}

function toggle(id, label, open) {
  put(id, label);
  byId(id).setAttribute('aria-expanded', String(open));
}

function render() {
  const t = copy[language];
  const mission = t.missions[stage];
  const signal = signals[stage];
  const consolePanel = document.querySelector('.console');
  consolePanel.dataset.solved = String(solved);
  consolePanel.dataset.finale = String(solved && stage === signals.length - 1);
  document.documentElement.lang = language;
  byId('tips').href = './tips.html?lang=' + language;
  put('tips', language === 'sv' ? 'Tabelltips ↗' : 'Times-table tips ↗');
  byId('language').setAttribute('aria-label', language === 'sv' ? 'English' : 'Svenska');
  document.querySelector('nav').setAttribute('aria-label', t.settings);
  put('sound', soundOn ? t.soundOn : t.soundOff);
  byId('sound').setAttribute('aria-pressed', String(soundOn));
  put('status', t.quests[Math.floor(stage / 2)] + ' · ' + (stage + 1) + ' / ' + signals.length);
  put('title', mission.title);
  put('brief', mission.brief);
  put('equation', signal.rows + ' × ' + signal.columns);
  put('panel', t.panel);
  put('frequency', 'RX // 0' + (stage + 1));
  put('anchor', t.rowTool);
  put('group', t.doubleTool);
  byId('anchor').setAttribute('aria-pressed', String(tool === 'row'));
  byId('group').setAttribute('aria-pressed', String(tool === 'double'));
  const guideLabels = { double: t.double, half: t.half, row: signal.anchor > signal.rows ? t.cut : t.lock };
  put('lock', guideLabels[signal.guide] ?? '');
  put('answer-label', t.answer);
  put('submit', t.submit);
  put('next', stage < signals.length - 1 ? t.next : t.replay);
  toggle('hint', hintOpen ? t.closeHint : t.hint, hintOpen);
  toggle('why', whyOpen ? t.closeWhy : t.why, whyOpen);
  put('hint-text', mission.hint ?? '');
  put('explanation', mission.why);
  put('feedback', solved ? mission.clue : wrong ? (signal.check ? t.checkRetry : t.retry) : '');
  renderRoute(t);
  hide('choices', !signal.check || solved);
  const choices = byId('choices');
  if (signal.check && !solved && choices.dataset.stage !== String(stage)) {
    choices.dataset.stage = String(stage);
    const buttons = signal.check.map(value => {
      const button = document.createElement('button');
      button.textContent = value;
      button.onclick = () => {
        if (value === signal.correct) unlock();
        else {
          wrong = true;
          render();
        }
      };
      return button;
    });
    choices.replaceChildren(...buttons);
  }
  hide('lock', !signal.guide || solved);
  hide('puzzle', Boolean(signal.guide || signal.check) || solved);
  hide('group', !signal.tools?.includes('double') || solved);
  hide('anchor', !signal.tools?.includes('row') || solved);
  hide('hint', !mission.hint || solved);
  hide('hint-text', !hintOpen || solved);
  hide('why', !solved);
  hide('explanation', !whyOpen);
  hide('feedback', !solved && !wrong);
  hide('next', !solved);
  drawReceiver();
}

function unlock() {
  solved = true;
  unlocked = Math.max(unlocked, stage + 1);
  try { localStorage.setItem(saveKey, String(unlocked)); } catch { /* Play can continue without storage. */ }
  render();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    byId('grid').animate([{ opacity: .65 }, { opacity: 1 }], { duration: 350 });
  }
  playSignal();
  byId('why').focus();
}

byId('language').onclick = () => {
  language = language === 'sv' ? 'en' : 'sv';
  render();
};
byId('sound').onclick = async () => {
  if (!window.AudioContext) return;
  soundOn = !soundOn;
  render();
  if (!soundOn) return;
  try {
    audio ??= new AudioContext();
    await audio.resume();
    playSignal();
  } catch {
    soundOn = false;
    render();
  }
};
byId('lock').onclick = () => {
  const signal = signals[stage];
  if (solved || !signal.guide) return;
  if (signal.guide === 'double') {
    doubledRows *= 2;
    if (doubledRows < signal.rows) {
      drawReceiver();
      playSignal();
      return;
    }
  }
  unlock();
};
byId('why').onclick = () => { whyOpen = !whyOpen; render(); };
byId('hint').onclick = () => { hintOpen = !hintOpen; render(); };
for (const [id, method] of [['anchor', 'row'], ['group', 'double']]) {
  byId(id).onclick = () => {
    tool = tool === method ? null : method;
    render();
  };
}
byId('puzzle').onsubmit = event => {
  event.preventDefault();
  const { rows, columns, guide } = signals[stage];
  if (guide || signals[stage].check || solved) return;
  if (Number(answer.value) === rows * columns) unlock();
  else {
    wrong = true;
    render();
    answer.select();
  }
};
function openSignal(index) {
  stage = index;
  solved = hintOpen = whyOpen = wrong = false;
  tool = null;
  doubledRows = 1;
  answer.value = '';
  render();
  byId('title').focus();
}

function renderRoute(t) {
  put('route-title', t.route);
  const current = Math.floor(stage / 2);
  const chapters = t.quests.map((title, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    const start = index * 2;
    const complete = unlocked >= start + 2;
    button.textContent = String(index + 1).padStart(2, '0') + ' / ' + title + (complete ? ' ✓' : '');
    button.disabled = start > unlocked;
    if (index === current) button.setAttribute('aria-current', 'step');
    if (button.disabled) button.setAttribute('aria-label', title + ' · ' + t.locked);
    else if (complete) button.setAttribute('aria-label', title + ' · ' + t.complete);
    button.onclick = () => openSignal(start);
    item.append(button);
    return item;
  });
  byId('route').replaceChildren(...chapters);
}

byId('next').onclick = () => openSignal((stage + 1) % signals.length);
render();
