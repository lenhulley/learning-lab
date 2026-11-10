const labels = {
  sv: {
    home: '← Alla appar', 'backup-label': 'RESERVKANAL', 'signal-label': 'SIGNAL MOTTAGEN',
    hook: 'Vid midnatt tystnade sändare 07.',
    story: 'Följ reservsignalen, knäck koderna och ta reda på vad som hände vid den stängda stationen.',
    'play-label': 'Spela Signalbrott', 'archive-caption': 'ARKIVBILD 07 ● RESERVSIGNAL',
    'adventure-label': 'ÄVENTYR', 'chapter-label': 'KAPITEL', 'maths-label': 'GÅNGERTABELLER',
    'younger-label': 'SPEL FÖR 5+', 'younger-title': 'Robotbandet', 'robot-play': 'Spela Robotbandet',
    'younger-story': 'Sätt ihop ett robotband och hör hur två slag i taget blir till musik.'
  },
  en: {
    home: '← All apps', 'backup-label': 'BACKUP CHANNEL', 'signal-label': 'SIGNAL RECEIVED',
    hook: 'At midnight, transmitter 07 went silent.',
    story: 'Follow the backup signal, crack the codes and find out what happened at the closed station.',
    'play-label': 'Play Signalbrott', 'archive-caption': 'ARCHIVE IMAGE 07 ● BACKUP SIGNAL',
    'adventure-label': 'ADVENTURE', 'chapter-label': 'CHAPTERS', 'maths-label': 'TIMES TABLES',
    'younger-label': 'GAMES FOR AGES 5+', 'younger-title': 'Robot Band', 'robot-play': 'Play Robot Band',
    'younger-story': 'Build a robot band and hear how two beats at a time turn into music.'
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
