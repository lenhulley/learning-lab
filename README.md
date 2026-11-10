# Signalbrott

Open index.html in a browser. Signalbrott follows a missing transmitter across
five chapters and ten signals. The receiver teaches adding or removing a row,
doubling, using ×10 as an anchor, and checking suspicious products. The final
two signals let the player choose a tool or answer directly.

SV / EN switches languages without resetting the puzzle. Tabelltips opens the
handbook. The operations map marks completed chapters and lets you replay them.
If browser storage is available, reloading resumes at the last checkpoint.

## Stack

- Static HTML, CSS and JavaScript. No dependencies or build step for this
  prototype. Keep the sibling games-library repo separate.
- mission.js holds the Swedish puzzle text, solutions and clues. game.js handles
  interaction, mission progression and the short Web Audio cue. Keep new
  mission content separate from the interaction code.
- JavaScript and CSS draw the receiver grid and its groups. Web Audio
  generates a two-tone cue after sound is enabled. Both run locally.
- If the collection needs imports, shared components or typed content, use
  TypeScript and Vite, as several games-library projects already do. Keep static
  output and relative asset paths for deployment under a project subpath.

## Hosting

Use a GitHub Pages project site and add a link from the existing games hub once
the playtest is ready to share. This version is suitable for a public static
site. It has no accounts, personal data, analytics or shared progress. Consider
Azure if the project later needs authenticated access or cross-device progress.
