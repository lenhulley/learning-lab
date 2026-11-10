const labels = {
  sv: {
    home: '← Alla appar', 'backup-label': 'RESERVKANAL', 'signal-label': 'SIGNAL MOTTAGEN',
    hook: 'Vid midnatt tystnade sändare 07.',
    story: 'Följ reservsignalen, knäck koderna och ta reda på vad som hände vid den stängda stationen.',
    'play-label': 'Spela Signalbrott', 'archive-caption': 'ARKIVBILD 07 ● RESERVSIGNAL',
    'adventure-label': 'ÄVENTYR', 'chapter-label': 'KAPITEL', 'maths-label': 'GÅNGERTABELLER',
    'younger-label': '★ SCENEN ÄR DIN', 'robot-beats': 'TVÅ ELLER TRE SLAG', 'robot-songs': 'FEM ÖNSKELÅTAR', 'younger-title': 'Robotbandet', 'robot-play': 'Spela Robotbandet',
    'younger-story': 'Välj dina robotar. Hitta takten. Spela för publiken!'
  },
  en: {
    home: '← All apps', 'backup-label': 'BACKUP CHANNEL', 'signal-label': 'SIGNAL RECEIVED',
    hook: 'At midnight, transmitter 07 went silent.',
    story: 'Follow the backup signal, crack the codes and find out what happened at the closed station.',
    'play-label': 'Play Signalbrott', 'archive-caption': 'ARCHIVE IMAGE 07 ● BACKUP SIGNAL',
    'adventure-label': 'ADVENTURE', 'chapter-label': 'CHAPTERS', 'maths-label': 'TIMES TABLES',
    'younger-label': '★ THE STAGE IS YOURS', 'robot-beats': 'TWO OR THREE BEATS', 'robot-songs': 'FIVE SONG REQUESTS', 'younger-title': 'Robot Band', 'robot-play': 'Play Robot Band',
    'younger-story': 'Pick your robots. Find the beat. Play for the crowd!'
  }
};

const params = new URLSearchParams(location.search);
let language = params.get('lang') === 'en' ? 'en' : 'sv';
let age = params.get('age') === '5' ? '5' : '10';
const switchLanguage = document.getElementById('landing-language');
const ageButtons = document.querySelectorAll('[data-age]');

function render() {
  const english = language === 'en';
  document.documentElement.lang = language;
  document.title = age === '5' ? 'Learning Lab · ' + labels[language]['younger-title'] : 'Learning Lab · ' + labels[language]['play-label'];
  switchLanguage.setAttribute('aria-label', english ? 'Visa på svenska' : 'Switch to English');
  document.querySelector('.landing-nav').setAttribute('aria-label', english ? 'Main navigation' : 'Huvudmeny');
  document.querySelector('.age-picker').setAttribute('aria-label', english ? 'Age group' : 'Åldersgrupp');
  for (const [id, label] of Object.entries(labels[language])) document.getElementById(id).textContent = label;
  for (const button of ageButtons) button.setAttribute('aria-pressed', String(button.dataset.age === age));
  document.getElementById('older-games').hidden = age !== '10';
  document.getElementById('younger-games').hidden = age !== '5';
  document.querySelector('.launch').href = './signalbrott.html?lang=' + language;
  document.getElementById('robot-link').href = './robots.html?lang=' + language;
  params.set('lang', language);
  params.set('age', age);
  try { history.replaceState(null, '', '?' + params); } catch { /* Local file previews may restrict history. */ }
}

switchLanguage.onclick = () => {
  language = language === 'sv' ? 'en' : 'sv';
  render();
};
for (const button of ageButtons) {
  button.onclick = () => {
    age = button.dataset.age;
    render();
  };
}
render();
