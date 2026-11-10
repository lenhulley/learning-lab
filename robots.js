const el = id => document.getElementById(id);
const words = {
  sv: {
    title: 'Robotbandet', intro: 'Varje robot spelar två slag! Tryck på en robot för att byta ljud.',
    stage: 'Scen', add: '＋ Robot', remove: '− Robot', play: '▶ Spela!', challenge: '★ Utmaning', listen: '◖)) Läs upp',
    next: 'Nästa låt →', invite: 'Bjud in nästa robot', sounds: ['Bom', 'Ping', 'Popp'], robot: 'Robot', total: n => n + ' × 2 = ' + n * 2 + ' slag',
    spoken: n => (n === 1 ? 'En robot' : n + ' robotar') + '. Två slag var. ' + n * 2 + ' slag!',
    ask: n => 'Kan bandet spela ' + n + ' slag? Ändra bandet och tryck på Spela.',
    success: n => 'Precis! ' + n / 2 + ' robotar spelar två slag var. Det blir ' + n + '!',
    retry: (n, target) => 'Bandet spelade ' + n * 2 + ' slag. Kan du ändra bandet så att det blir ' + target + '?'
  },
  en: {
    title: 'Robot Band', intro: 'Each robot plays two beats! Tap a robot to change its sound.',
    stage: 'Stage', add: '＋ Robot', remove: '− Robot', play: '▶ Play!', challenge: '★ Challenge', listen: '◖)) Read aloud',
    next: 'Next song →', invite: 'Invite the next robot', sounds: ['Boom', 'Ping', 'Pop'], robot: 'Robot', total: n => n + ' × 2 = ' + n * 2 + ' beats',
    spoken: n => (n === 1 ? 'One robot' : n + ' robots') + '. Two beats each. ' + n * 2 + ' beats!',
    ask: n => 'Can the band play ' + n + ' beats? Change the band and press Play.',
    success: n => 'Exactly! ' + n / 2 + ' robots play two beats each. That makes ' + n + '!',
    retry: (n, target) => 'The band played ' + n * 2 + ' beats. Can you change the band to make ' + target + '?'
  }
};
const paint = ['#baff8e', '#ffb1e2', '#8bdcff', '#ffce82'];
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'sv';
const band = [0];
let playing = false;
let challenge = false;
let result = '';
let target = 4;
let audio;

function say(text) {
  if (!('speechSynthesis' in window)) return;
  const line = new SpeechSynthesisUtterance(text);
  line.lang = language === 'sv' ? 'sv-SE' : 'en-GB';
  speechSynthesis.cancel();
  speechSynthesis.speak(line);
}

function robotTile(index) {
  const t = words[language];
  const robot = document.createElement('button');
  robot.className = 'robot';
  robot.style.setProperty('--paint', paint[index]);
  robot.disabled = playing;
  robot.setAttribute('aria-label', t.robot + ' ' + (index + 1) + ' · ' + t.sounds[band[index]]);
  robot.innerHTML = '<svg viewBox="0 0 90 76" aria-hidden="true"><path d="M45 19V8m-5 0h10M12 41H6m78 0h-6" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="12" y="19" width="66" height="49" rx="13" fill="currentColor"/><circle cx="33" cy="39" r="5" fill="#211735"/><circle cx="57" cy="39" r="5" fill="#211735"/><path d="M36 53q9 8 18 0" fill="none" stroke="#211735" stroke-width="3"/></svg><span class="pads" aria-hidden="true"><i class="pad"></i><i class="pad"></i></span><small></small>';
  robot.querySelector('small').textContent = t.sounds[band[index]];
  robot.onclick = () => {
    band[index] = (band[index] + 1) % 3;
    robot.replaceWith(robotTile(index));
    el('stage').children[index].focus();
    const sound = band[index];
    enableAudio().then(() => { if (!playing) beat(sound); });
  };
  return robot;
}

function render() {
  const t = words[language];
  document.documentElement.lang = language;
  document.title = t.title + ' · Learning Lab';
  el('back').href = './?age=5&lang=' + language;
  el('language').setAttribute('aria-label', language === 'sv' ? 'English' : 'Svenska');
  el('stage').setAttribute('aria-label', t.stage);
  for (const id of ['title','intro','add','remove','play','challenge','listen']) el(id).textContent = t[id];
  el('stage').replaceChildren(...paint.map((_, index) => {
    if (index < band.length) return robotTile(index);
    const available = index === band.length;
    const empty = document.createElement(available ? 'button' : 'div');
    empty.className = 'empty';
    empty.textContent = available ? '＋' : '✦';
    if (available) {
      empty.setAttribute('aria-label', t.invite);
      empty.disabled = playing;
      empty.onclick = () => {
        addRobot();
        el('stage').children[index].focus();
      };
    } else {
      empty.setAttribute('aria-hidden', 'true');
    }
    return empty;
  }));
  el('total').setAttribute('aria-live', playing ? 'off' : 'polite');
  el('total').textContent = challenge && result !== 'success' ? '● ●  /  ' + band.length + ' × 2' : t.total(band.length);
  const track = band.map((_, index) => {
    const pair = document.createElement('span');
    pair.className = 'count-pair';
    pair.style.setProperty('--paint', paint[index]);
    pair.textContent = '● ●';
    return pair;
  });
  el('count-track').replaceChildren(...track);
  el('challenge-panel').hidden = !challenge;
  el('challenge-panel').dataset.success = String(result === 'success');
  el('target').textContent = '● '.repeat(target).trim();
  el('next-challenge').textContent = t.next;
  el('next-challenge').hidden = result !== 'success';
  el('next-challenge').disabled = playing;
  el('prompt').textContent = result === 'retry' ? t.retry(band.length, target) : result === 'success' ? t.success(target) : t.ask(target);
  el('challenge').setAttribute('aria-pressed', String(challenge));
  el('add').disabled = playing || band.length === 4;
  el('remove').disabled = playing || band.length === 1;
  for (const id of ['play','challenge','language','listen']) el(id).disabled = playing;
  el('listen').hidden = !('speechSynthesis' in window);
}

async function enableAudio() {
  if (!window.AudioContext) return;
  try {
    audio ??= new AudioContext();
    await audio.resume();
  } catch { /* Lights still show the beat. */ }
}

function beat(sound) {
  if (audio?.state !== 'running') return;
  const time = audio.currentTime;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = ['sine', 'triangle', 'square'][sound];
  oscillator.frequency.setValueAtTime([145, 620, 285][sound], time);
  oscillator.frequency.exponentialRampToValueAtTime([54, 440, 140][sound], time + .15);
  gain.gain.setValueAtTime(sound === 2 ? .045 : .13, time);
  gain.gain.exponentialRampToValueAtTime(.001, time + .19);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(time);
  oscillator.stop(time + .2);
}

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
el('play').onclick = async () => {
  if (playing) return;
  const ready = enableAudio();
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  playing = true;
  render();
  await ready;
  let count = 0;
  for (const [index, sound] of band.entries()) {
    const robot = el('stage').children[index];
    robot.classList.add('active');
    for (const pad of robot.querySelectorAll('.pad')) {
      pad.classList.add('hit');
      el('total').textContent = String(++count);
      beat(sound);
      await pause(235);
    }
    robot.classList.remove('active');
    el('count-track').children[index].classList.add('counted');
    await pause(260);
  }
  playing = false;
  if (challenge) result = band.length * 2 === target ? 'success' : 'retry';
  render();
  el('play').focus();
  say(challenge ? el('prompt').textContent : words[language].spoken(band.length));
};
el('language').onclick = () => {
  language = language === 'sv' ? 'en' : 'sv';
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  render();
};
function addRobot() {
  if (playing || band.length === 4) return;
  band.push(band.length % 3);
  result = '';
  render();
}
el('add').onclick = addRobot;
el('next-challenge').onclick = () => {
  target = target === 8 ? 4 : target + 2;
  result = '';
  render();
  el('play').focus();
  say(words[language].ask(target));
};
el('remove').onclick = () => { if (!playing && band.length > 1) { band.pop(); result = ''; render(); } };
el('challenge').onclick = () => {
  challenge = !challenge;
  result = '';
  render();
  if (challenge) say(words[language].ask(target));
};
el('listen').onclick = () => say(challenge ? el('prompt').textContent : words[language].intro);
render();
