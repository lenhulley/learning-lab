const el = id => document.getElementById(id);
const words = {
  sv: {
    title: 'Robotbandet', intro: n => 'Varje robot spelar ' + n + ' slag. Tryck på en robot för att byta ljud.',
    stage: 'Scen', add: '＋ Robot', remove: '− Robot', play: '▶ Spela!', challenge: '★ Konsert', free: '♪ Spela fritt', encore: '✦ Extranummer!', finish: 'Spela ett extranummer →', done: 'Publiken jublar! Nu kan du välja två eller tre slag per robot.', request: 'Önskelåt', rhythm: n => n + ' slag per robot', listen: '◖)) Läs upp',
    next: 'Nästa låt →', invite: 'Bjud in nästa robot', sounds: ['Bom', 'Ping', 'Popp'], robot: 'Robot', total: (n, size) => n + ' × ' + size + ' = ' + n * size + ' slag',
    spoken: (n, size) => (n === 1 ? 'En robot' : n + ' robotar') + '. ' + size + ' slag var. ' + n * size + ' slag!',
    ask: n => 'Kan bandet spela ' + n + ' slag? Ändra bandet och tryck på Spela.',
    success: (n, size) => 'Precis! ' + n / size + ' robotar spelar ' + size + ' slag var. Det blir ' + n + '!',
    retry: (n, target) => 'Bandet spelade ' + n + ' slag. Kan du ändra bandet så att det blir ' + target + '?'
  },
  en: {
    title: 'Robot Band', intro: n => 'Each robot plays ' + n + ' beats. Tap a robot to change its sound.',
    stage: 'Stage', add: '＋ Robot', remove: '− Robot', play: '▶ Play!', challenge: '★ Concert', free: '♪ Free play', encore: '✦ Encore!', finish: 'Play an encore →', done: 'The audience cheers! Now you can choose two or three beats per robot.', request: 'Song request', rhythm: n => n + ' beats per robot', listen: '◖)) Read aloud',
    next: 'Next song →', invite: 'Invite the next robot', sounds: ['Boom', 'Ping', 'Pop'], robot: 'Robot', total: (n, size) => n + ' × ' + size + ' = ' + n * size + ' beats',
    spoken: (n, size) => (n === 1 ? 'One robot' : n + ' robots') + '. ' + size + ' beats each. ' + n * size + ' beats!',
    ask: n => 'Can the band play ' + n + ' beats? Change the band and press Play.',
    success: (n, size) => 'Exactly! ' + n / size + ' robots play ' + size + ' beats each. That makes ' + n + '!',
    retry: (n, target) => 'The band played ' + n + ' beats. Can you change the band to make ' + target + '?'
  }
};
const paint = ['#baff8e', '#ffb1e2', '#8bdcff', '#ffce82'];
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'sv';
const band = [0];
let playing = false;
let challenge = false;
let result = '';
const setlist = [
  { size: 2, target: 4 }, { size: 2, target: 6 }, { size: 2, target: 8 },
  { size: 3, target: 6 }, { size: 3, target: 9 }
];
let song = 0;
let finished = false;
let jamSize = 2;

function beatsPerRobot() {
  return challenge ? setlist[song].size : jamSize;
}
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
  robot.innerHTML = '<svg viewBox="0 0 90 76" aria-hidden="true"><path d="M45 19V8m-5 0h10M12 41H6m78 0h-6" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="12" y="19" width="66" height="49" rx="13" fill="currentColor"/><circle cx="33" cy="39" r="5" fill="#211735"/><circle cx="57" cy="39" r="5" fill="#211735"/><path d="M36 53q9 8 18 0" fill="none" stroke="#211735" stroke-width="3"/></svg><span class="pads" aria-hidden="true"></span><small></small>';
  for (let i = 0; i < beatsPerRobot(); i++) {
    const pad = document.createElement('i');
    pad.className = 'pad';
    robot.querySelector('.pads').append(pad);
  }
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
  const size = beatsPerRobot();
  const target = setlist[song].target;
  document.documentElement.lang = language;
  document.title = t.title + ' · Learning Lab';
  el('back').href = './?age=5&lang=' + language;
  el('language').setAttribute('aria-label', language === 'sv' ? 'English' : 'Svenska');
  el('stage').setAttribute('aria-label', t.stage);
  for (const id of ['title','add','remove','play','listen']) el(id).textContent = t[id];
  el('intro').textContent = t.intro(size);
  el('challenge').textContent = challenge ? t.free : t.challenge;
  el('jam-rhythm').hidden = !finished || challenge;
  el('jam-rhythm').textContent = t.rhythm(jamSize === 2 ? 3 : 2);
  el('jam-rhythm').disabled = playing;
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
  el('total').textContent = challenge && result !== 'success' ? band.length + ' × ' + size : t.total(band.length, size);
  const track = band.map((_, index) => {
    const pair = document.createElement('span');
    pair.className = 'count-pair';
    pair.style.setProperty('--paint', paint[index]);
    pair.textContent = '● '.repeat(size).trim();
    return pair;
  });
  el('count-track').replaceChildren(...track);
  el('challenge-panel').hidden = !challenge && !finished;
  el('set-progress').textContent = challenge ? t.request + ' ' + (song + 1) + ' / ' + setlist.length : t.encore;
  el('target').hidden = !challenge;
  el('challenge-panel').dataset.success = String(result === 'success');
  el('target').textContent = '● '.repeat(target).trim();
  el('next-challenge').textContent = song === setlist.length - 1 ? t.finish : t.next;
  el('next-challenge').hidden = !challenge || result !== 'success';
  el('next-challenge').disabled = playing;
  el('prompt').textContent = !challenge ? t.done : result === 'retry' ? t.retry(band.length * size, target) : result === 'success' ? t.success(target, size) : t.ask(target);
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
  if (challenge) result = band.length * beatsPerRobot() === setlist[song].target ? 'success' : 'retry';
  render();
  el('play').focus();
  say(challenge ? el('prompt').textContent : words[language].spoken(band.length, beatsPerRobot()));
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
  if (song === setlist.length - 1) {
    finished = true;
    challenge = false;
    jamSize = 3;
    song = 0;
  } else {
    song++;
  }
  result = '';
  render();
  el('play').focus();
  say(el('prompt').textContent);
};
el('remove').onclick = () => { if (!playing && band.length > 1) { band.pop(); result = ''; render(); } };
el('challenge').onclick = () => {
  challenge = !challenge;
  result = '';
  render();
  if (challenge) say(el('prompt').textContent);
};
el('jam-rhythm').onclick = () => {
  jamSize = jamSize === 2 ? 3 : 2;
  render();
  say(words[language].intro(jamSize));
};
el('listen').onclick = () => say(challenge ? el('prompt').textContent : words[language].intro(beatsPerRobot()));
render();
