const signals = [
  { rows: 8, columns: 7, anchor: 7, guide: 'row' },
  { rows: 7, columns: 8, anchor: 8, tools: ['row'] },
  { rows: 8, columns: 6, guide: 'double' },
  { rows: 4, columns: 7, tools: ['double'] },
  { rows: 6, columns: 8, anchor: 5, tools: ['row', 'double'] },
  { rows: 8, columns: 9, anchor: 9, tools: ['row', 'double'] }
];

const copy = {
  sv: {
    settings: 'Inställningar', soundOn: 'Ljud på', soundOff: 'Ljud av',
    panel: 'Pulsmottagare', lock: 'Koppla in sista raden', double: 'Dubbla signalen',
    rowTool: 'Utgå från en känd grupp', doubleTool: 'Dela i två lika stora grupper',
    answer: 'Antal pulser', submit: 'Lås upp signalen', hint: 'Visa ledtråd',
    closeHint: 'Dölj ledtråd', why: 'Visa varför', closeWhy: 'Dölj förklaringen',
    next: 'Nästa signal →', replay: 'Spela igen',
    retry: 'Signalen är fortfarande låst. Försök igen eller testa ett verktyg.',
    quests: ['Lägg till eller ta bort en grupp', 'Dubbla signalen', 'Final · Välj ditt drag'],
    missions: [
      {
        title: 'Sändaren som tystnade',
        brief: 'Sändare 07 försvann vid midnatt. Sju rader med sju pulser ger 49. Koppla in den sista raden och se hur signalen växer.',
        clue: 'AVLYSSNAT // ”Om 07 tystnar, följ reservkanalen.”',
        why: 'Den sista raden lägger till sju pulser. 49 + 7 = 56.'
      },
      {
        title: 'En rad för mycket',
        brief: 'En störsändare har lagt till en falsk rad. Den riktiga signalen har sju rader med åtta pulser. Hur många pulser ska du behålla?',
        hint: 'Åtta åttor blir 64. Hur många pulser försvinner när du tar bort en rad?',
        clue: 'STÖRNING BORTTAGEN // En ny frekvens dyker upp.',
        why: 'Börja med 8 × 8 = 64. Ta bort en rad med åtta. 64 − 8 = 56.'
      },
      {
        title: 'Bygg upp reservsignalen',
        brief: 'Reservkanalen börjar med en rad med sex pulser. Dubbla signalen tills du har åtta rader.',
        clue: 'AVLYSSNAT // ”Sändaren flyttades till den stängda stationen.”',
        why: 'En rad blir två, sedan fyra, sedan åtta. Pulserna dubblas varje gång. 6 → 12 → 24 → 48.'
      },
      {
        title: 'Stationens kod',
        brief: 'Kodlåset väntar på fyra rader med sju pulser. Hur många pulser behövs?',
        hint: 'Börja med sju. Dubbla till 14. Hur får du fyra rader?',
        clue: 'ÅTKOMST BEVILJAD // Två signaler väntar i stationens arkiv.',
        why: 'Dubbla sju till 14 och dubbla 14 till 28. Då har du fyra sjuor.'
      },
      {
        title: 'Arkivsignal A',
        brief: 'Hitta antalet pulser. Välj ett verktyg om du vill, eller svara direkt.',
        hint: 'Vilken del av signalen kan du redan räkna ut? Prova fem rader, eller två lika stora grupper.',
        clue: 'ARKIV // Sändare 07 skickade en varning innan den försvann.',
        why: 'Fem åttor plus en åtta ger 40 + 8 = 48. Du kan också dubbla tre åttor: 24 + 24 = 48.'
      },
      {
        title: 'Arkivsignal B',
        brief: 'Lås upp den sista signalen. Vilket drag passar dig den här gången?',
        hint: 'Nio nior blir 81. Fyra nior blir 36. Vilket tal vill du börja med?',
        clue: 'UPPDRAG SLUTFÖRT // Varningen är återställd. ”Kartan visar en station. Under den finns en till.”',
        why: 'Ta bort en nia från 81, eller dubbla 36. Båda sätten ger 72.'
      }
    ]
  },
  en: {
    settings: 'Settings', soundOn: 'Sound on', soundOff: 'Sound off',
    panel: 'Pulse receiver', lock: 'Bring the last row online', double: 'Double the signal',
    rowTool: 'Start from a known group', doubleTool: 'Split into two equal groups',
    answer: 'Number of pulses', submit: 'Unlock signal', hint: 'Show hint',
    closeHint: 'Hide hint', why: 'Show why', closeWhy: 'Hide explanation',
    next: 'Next signal →', replay: 'Play again',
    retry: 'The signal is still locked. Try again or use a tool.',
    quests: ['Add or remove one group', 'Double the signal', 'Finale · Choose your move'],
    missions: [
      {
        title: 'The silent transmitter',
        brief: 'Transmitter 07 vanished at midnight. Seven rows of seven pulses make 49. Bring the final row online and watch the signal grow.',
        clue: 'INTERCEPT // “If 07 goes silent, follow the backup channel.”',
        why: 'The final row adds seven pulses. 49 + 7 = 56.'
      },
      {
        title: 'One row too many',
        brief: 'A jammer has added a fake row. The real signal has seven rows of eight pulses. How many pulses should you keep?',
        hint: 'Eight eights make 64. How many pulses disappear when you remove a row?',
        clue: 'INTERFERENCE CLEARED // A new frequency appears.',
        why: 'Start with 8 × 8 = 64. Remove a row of eight. 64 − 8 = 56.'
      },
      {
        title: 'Build the backup signal',
        brief: 'The backup channel starts with one row of six pulses. Double the signal until you have eight rows.',
        clue: 'INTERCEPT // “The transmitter was moved to the closed station.”',
        why: 'One row becomes two, then four, then eight. The pulses double every time. 6 → 12 → 24 → 48.'
      },
      {
        title: 'The station code',
        brief: 'The lock is waiting for four rows of seven pulses. How many pulses does it need?',
        hint: 'Start with seven. Double it to make 14. How do you get four rows?',
        clue: 'ACCESS GRANTED // Two signals are waiting in the station archive.',
        why: 'Double seven to make 14, then double 14 to make 28. You now have four sevens.'
      },
      {
        title: 'Archive signal A',
        brief: 'Find the total number of pulses. Use a tool if you like, or answer directly.',
        hint: 'Which part of the signal can you already work out? Try five rows or two equal groups.',
        clue: 'ARCHIVE // Transmitter 07 sent a warning before it vanished.',
        why: 'Five eights plus one eight makes 40 + 8 = 48. You can also double three eights: 24 + 24 = 48.'
      },
      {
        title: 'Archive signal B',
        brief: 'Unlock the final signal. Which move works for you this time?',
        hint: 'Nine nines make 81. Four nines make 36. Which number would you start with?',
        clue: 'MISSION COMPLETE // Warning restored. “The map shows one station. There’s another underneath it.”',
        why: 'Take one nine away from 81, or double 36. Both ways give 72.'
      }
    ]
  }
};

// Each chapter teaches a move, then puts it to work on the same trail.
signals.splice(4, 0,
  { rows: 9, columns: 7, anchor: 10, guide: 'row' },
  { rows: 5, columns: 8, anchor: 10, guide: 'half' },
  { rows: 8, columns: 7, check: [55, 54], correct: 55 },
  { rows: 9, columns: 8, check: [74, 63], correct: 74 }
);

Object.assign(copy.sv, {
  route: 'OPERATIONSPLAN // SPÅRA SÄNDARE 07',
  cut: 'Koppla bort en rad', half: 'Behåll ena halvan',
  checkRetry: 'Det talet klarar kontrollen. Testa det andra.',
  locked: 'Låst', complete: 'Klar',
  quests: ['Fånga signalen', 'Öppna stationen', 'Ställ in antennen', 'Avslöja förfalskningen', 'Återställ varningen']
});
Object.assign(copy.en, {
  route: 'OPERATIONS MAP // TRACE TRANSMITTER 07',
  cut: 'Disconnect one row', half: 'Keep one half',
  checkRetry: 'That number passes the check. Try the other one.',
  locked: 'Locked', complete: 'Complete',
  quests: ['Catch the signal', 'Open the station', 'Tune the antenna', 'Expose the forgery', 'Restore the warning']
});

copy.sv.missions.splice(4, 0,
  {
    title: 'Antennens säkerhetsrad',
    brief: 'Antennen visar tio rader med sju pulser i varje. Arkivet använder bara nio rader. Koppla bort säkerhetsraden.',
    clue: 'ANTENN INSTÄLLD // Det finns två arkivkopior.',
    why: 'Tio sjuor blir 70. Koppla bort en sjua så får du nio sjuor. 70 − 7 = 63.'
  },
  {
    title: 'Dela överföringen',
    brief: 'De två kopiorna är lika stora. Tillsammans är de tio rader med åtta pulser. Behåll en kopia.',
    clue: 'KOPIA RÄDDAD // Någon har ändrat två av arkivets loggar.',
    why: 'Tio åttor blir 80. Fem åttor är hälften så många. Hälften av 80 är 40.'
  },
  {
    title: 'Jakten på en udda puls',
    brief: 'För en signal med 8 × 7 pulser står det 55 i ena loggen och 54 i den andra. Vilket tal kan du stryka direkt för att det är udda?',
    hint: 'Åtta är jämnt. Du kan para ihop de åtta raderna två och två.',
    clue: '55 STRUKET // 54 klarar kontrollen. Den riktiga signalen har 56 pulser.',
    why: 'En jämn faktor ger ett jämnt svar. Det avslöjar 55. För att avslöja 54 behöver du en annan kontroll.'
  },
  {
    title: 'En siffersumma som avslöjar',
    brief: 'Två loggar påstår att de har rätt svar på 9 × 8. Vilket tal kan du stryka med nians sifferkontroll?',
    hint: 'Lägg ihop siffrorna i varje tal. Från 9 × 1 till 9 × 10 blir siffersumman 9.',
    clue: '74 STRUKET // Den riktiga signalen har 72 pulser.',
    why: '7 + 4 = 11. Därför kan 74 inte vara rätt. 6 + 3 = 9, så 63 klarar kontrollen. Men nio åttor är 72.'
  }
);
copy.en.missions.splice(4, 0,
  {
    title: 'The antenna’s safety row',
    brief: 'The antenna shows ten rows of seven pulses. The archive uses only nine rows. Disconnect the safety row.',
    clue: 'ANTENNA TUNED // There are two copies of the archive.',
    why: 'Ten sevens make 70. Disconnect one seven to get nine sevens. 70 − 7 = 63.'
  },
  {
    title: 'Split the transmission',
    brief: 'The two copies are the same size. Together they make ten rows of eight pulses. Keep one copy.',
    clue: 'COPY RECOVERED // Someone has changed two of the archive logs.',
    why: 'Ten eights make 80. Five eights are half as many. Half of 80 is 40.'
  },
  {
    title: 'Hunt for an odd pulse',
    brief: 'One log claims an 8 × 7 signal has 55 pulses. Another says 54. Which number can you rule out straight away because it is odd?',
    hint: 'Eight is even. You can pair up the eight rows.',
    clue: '55 RULED OUT // 54 passes this check. The real signal has 56 pulses.',
    why: 'One even factor makes the product even. That catches 55. To catch 54, you need a different check.'
  },
  {
    title: 'The telltale digit sum',
    brief: 'Two logs claim to have the answer to 9 × 8. Which number can you rule out with the nine times table digit check?',
    hint: 'Add the digits in each number. From 9 × 1 to 9 × 10, they add to 9.',
    clue: '74 RULED OUT // The real signal has 72 pulses.',
    why: '7 + 4 = 11, so 74 cannot be right. 6 + 3 = 9, so 63 passes the check. But nine eights make 72.'
  }
);
copy.sv.missions.at(-1).clue = 'VARNING ÅTERSTÄLLD // ”Rälsen under stationen är blockerad. Stoppa nattåget!” Du skickar varningen vidare. En minut senare hörs bromsarna. Tåget har stannat.';
copy.en.missions.at(-1).clue = 'WARNING RESTORED // “The track under the station is blocked. Stop the night train!” You relay the warning. A minute later, brakes echo through the tunnel. The train has stopped.';
