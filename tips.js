const tips = [
  ['Byt plats på faktorerna', 'Swap the factors',
    'Tre rader med sju pulser blir sju rader med tre om du vrider rutnätet. Antalet ändras inte.',
    'Rotate a grid of three rows of seven and you get seven rows of three. The total stays the same.', '3 × 7 = 21\n7 × 3 = 21'],
  ['Noll och ett', 'Zero and one',
    'Noll grupper ger noll. En grupp ger precis det som finns i gruppen.',
    'Zero groups give zero. One group gives exactly what is in that group.', '0 × 8 = 0    ·    1 × 8 = 8'],
  ['Dubbla för ×2, ×4 och ×8', 'Double for ×2, ×4 and ×8',
    'För ×2 dubblar du talet en gång. För ×4 dubblar du två gånger. För ×8 dubblar du tre gånger. Varje pil betyder att du dubblar talet före pilen.',
    'For ×2, double the number once. For ×4, double it twice. For ×8, double it three times. Each arrow means double the number before it.',
    '4 × 3 = 12   (3 → 6 → 12)\n4 × 6 = 24   (6 → 12 → 24)\n4 × 7 = 28   (7 → 14 → 28)\n\n8 × 3 = 24   (3 → 6 → 12 → 24)\n8 × 6 = 48   (6 → 12 → 24 → 48)\n8 × 7 = 56   (7 → 14 → 28 → 56)'],
  ['Dubbla och lägg till för ×3', 'Double and add for ×3',
    'Tre grupper är två grupper plus en till.',
    'Three groups are two groups plus one more.', '3 × 7 = 14 + 7 = 21'],
  ['Tio grupper, sedan hälften', 'Ten groups, then halve',
    'Tio grupper med sju i varje blir 70. Fem grupper är hälften så många som tio grupper, så halvera 70. Produkter i femmans tabell slutar på 0 eller 5.',
    'Ten groups of seven make 70. Five groups are half as many as ten groups, so halve 70. Products in the five times table end in 0 or 5.', '5 × 7 = 70 ÷ 2 = 35'],
  ['Ta bort en grupp för ×9', 'Take away one group for ×9',
    'Räkna tio grupper först. Ta sedan bort en grupp så har du nio kvar.',
    'Start with ten groups. Take away one group and you have nine left.', '9 × 7 = 70 − 7 = 63'],
  ['Utgå från en kvadrat', 'Start from a square',
    'En kvadrat får du när du multiplicerar ett tal med sig självt. Om du redan kan en kvadrat kan du lägga till en grupp för att räkna ut nästa rad i tabellen, eller ta bort en grupp för att räkna ut raden före.',
    'A square is a number multiplied by itself. If you know a square, add one group to find the next row in the table, or take away one group to find the previous row.',
    '4 × 4 = 16\n5 × 4 = 16 + 4 = 20\n\n6 × 6 = 36\n7 × 6 = 36 + 6 = 42\n\n7 × 7 = 49\n8 × 7 = 49 + 7 = 56\n\n8 × 8 = 64\n7 × 8 = 64 − 8 = 56'],
  ['Dela upp i grupper du känner igen', 'Split into groups you know',
    'Om sex sjuor känns svåra kan du räkna fem sjuor och en sjua. Dela där det gör uträkningen lättast för dig.',
    'If six sevens feels tricky, work out five sevens and one seven. Split wherever it makes the calculation easiest for you.', '6 × 7 = 35 + 7 = 42'],
  ['Kolla om svaret ska vara jämnt eller udda', 'Check whether the answer should be even or odd',
    'En jämn faktor räcker för att produkten ska bli jämn. Då kan du para ihop allt två och två. Om båda faktorerna är udda blir produkten udda. Para ihop raderna och sedan pulserna i sista raden. En puls blir över.',
    'One even factor is enough for an even product. Everything can be paired up. If both factors are odd, the product is odd. Pair the rows, then pair the pulses in the last row. One pulse is left over.', '8 × 7 = 56    ·    7 × 7 = 49'],
  ['Siffrorna i nians tabell', 'Digits in the nine times table',
    'Från 9 × 1 till 9 × 10 är tiotalssiffran ett mindre än talet du multiplicerar med. Entalssiffran fyller på till 9. För 9 × 7 börjar du med 6 tiotal. Eftersom 6 + 3 = 9 slutar svaret på 3.',
    'From 9 × 1 to 9 × 10, the tens digit is one less than the number you multiply by. The ones digit brings the digit sum to 9. For 9 × 7, start with 6 tens. Since 6 + 3 = 9, the answer ends in 3.',
    '9 × 4 = 36\n9 × 7 = 63\n9 × 8 = 72'],
  ['Sista siffran i femmans tabell', 'Last digits in the five times table',
    'En jämn faktor ger ett svar som slutar på 0. En udda faktor ger ett svar som slutar på 5.',
    'An even factor gives a result ending in 0. An odd factor gives a result ending in 5.',
    '5 × 8 = 40\n5 × 7 = 35'],
  ['Sex gånger ett jämnt tal', 'Six times an even number',
    'När du multiplicerar ett jämnt heltal med 6 behåller svaret samma entalssiffra.',
    'When you multiply an even whole number by 6, the result keeps the same ones digit.',
    '6 × 2 = 12\n6 × 4 = 24\n6 × 6 = 36\n6 × 8 = 48'],
  ['Tio gånger ett tal', 'Ten times a number',
    'När du multiplicerar ett heltal med 10 flyttas varje siffra ett steg åt vänster. Skriv en nolla på entalsplatsen.',
    'When you multiply a whole number by 10, each digit moves one place to the left. Write a zero in the ones place.',
    '10 × 7 = 70\n10 × 10 = 100'],
  ['Sista siffran går i cykler', 'Last digits repeat in cycles',
    'Läs svaren från ×1 och uppåt. Efter fem steg börjar mönstret om. I fyrans tabell slutar 4 × 1 och 4 × 6 båda på 4.',
    'Read the answers starting at ×1. After five steps the pattern starts again. In the four times table, 4 × 1 and 4 × 6 both end in 4.',
    '×4: 4 → 8 → 2 → 6 → 0\n×8: 8 → 6 → 4 → 2 → 0'],
  ['Kontrollera med siffersumman', 'Check with the digit sum',
    'Lägg ihop siffrorna i svaret. För ×3 ska summan vara delbar med 3. För ×9 ska den vara delbar med 9. Om kontrollen misslyckas är svaret fel. Om den stämmer kan svaret fortfarande behöva kontrolleras.',
    'Add the digits of your answer. For ×3, the sum must be divisible by 3. For ×9, it must be divisible by 9. A failed check catches a mistake. A passed check tells you the answer is possible.',
    '3 × 8 = 24    ·    2 + 4 = 6\n9 × 7 = 63    ·    6 + 3 = 9'],
  ['Två tal med ett tal emellan', 'Two numbers with one number between them',
    'Utgå från kvadraten i mitten. För att ändra en 8 × 8-ruta till 7 × 9 tar du bort en rad med åtta och lägger till en kolumn med sju. Det blir en mindre.',
    'Start with the square in the middle. To turn an 8 × 8 grid into 7 × 9, remove a row of eight and add a column of seven. That leaves one fewer.',
    '8 × 8 = 64\n7 × 9 = 64 − 1 = 63\n\n7 × 7 = 49\n6 × 8 = 49 − 1 = 48'],
  ['Fyra siffror i rad', 'Four digits in a row',
    'Säg siffrorna 5, 6, 7, 8. De två första bildar svaret 56, och de två sista är faktorerna 7 och 8. Samma knep fungerar med 1, 2, 3, 4.',
    'Say the digits 5, 6, 7, 8. The first two make the answer 56, and the last two are the factors 7 and 8. The same trick works with 1, 2, 3, 4.',
    '56 = 7 × 8\n12 = 3 × 4'],
  ['Kom ihåg åtta gånger åtta', 'Remember eight times eight',
    'Tänk åtta fyror först. De blir 32. Dubbla 32 för att få åtta åttor.',
    'Try the English rhyme “I ate and ate till I was sick on the floor” to remember eight eights and sixty-four. You can also start from eight fours and double 32.',
    '8 × 4 = 32\n8 × 8 = 32 + 32 = 64'],
];

const language = document.getElementById('language');
let english = new URLSearchParams(location.search).get('lang') === 'en';

function renderTips() {
  document.documentElement.lang = english ? 'en' : 'sv';
  language.setAttribute('aria-label', english ? 'Svenska' : 'English');
  const title = english ? 'Times-table tips' : 'Tabelltips';
  document.title = title + ' · Signalbrott';
  document.querySelector('header small').textContent = english ? '// HANDBOOK' : '// HANDBOK';
  document.getElementById('title').textContent = title;
  document.getElementById('intro').textContent = english
    ? 'Start with a fact you know. Pick a move that helps you work out the next one.'
    : 'Börja med något du redan kan. Välj ett knep som hjälper dig att räkna ut nästa steg.';

  const cards = tips.map(([svTitle, enTitle, svText, enText, example]) => {
    const card = document.createElement('section');
    const heading = document.createElement('h2');
    const body = document.createElement('p');
    const maths = document.createElement('p');
    heading.textContent = english ? enTitle : svTitle;
    body.textContent = english ? enText : svText;
    maths.className = 'tip-example';
    maths.textContent = example;
    card.append(heading, body, maths);
    return card;
  });
  document.getElementById('cards').replaceChildren(...cards);
}

language.onclick = () => {
  english = !english;
  renderTips();
};
renderTips();
