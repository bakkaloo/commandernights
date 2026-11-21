# Changelog

## Unreleased

### Fixed
- The life counter no longer gets stuck adding or removing life on its own after a long press. It happened when a second finger (or a palm) touched the same + or − button while it was held: now the counting always stops when you lift your finger, when the app goes to the background, and in any case after about 20 seconds of holding.

## v0.4.0 — 2026-11-21

### Added
- In 2v2 the "Posti a caso" button becomes "Sorteggia squadre": the four players are drawn into two new random teams with a short animation, where the names shake in the "urn" and are drawn one at a time into team A and team B. "Rimescola" draws again. If the device is set to reduce motion, the result is shown right away.
- At the top of the "Parole chiave" column, a link to the Italian Magic wiki for the keywords that are not in the list.

### Changed
- With 5 players in the "Tutto intorno" layout, the two players in the left column now sit at the short sides: the top one faces the top edge and the bottom one faces the bottom edge, so the table has two players at each short side and one on the right.

### Fixed
- The page no longer jumps back to the top after choosing something (format, group, life, number of players, layout, a player or deck, a filter, a setting): it stays where it was. Opening another page still starts from the top, and going back with "‹" returns to where you were on the previous page.
- In the player details during a game and in the finishing order sheet, tapping a button no longer moves the sheet's scroll position. — 2026-11-21

### Fixed
- Publishing a new version to the website works again: the v0.3.0 deploy stopped because the publishing step could not find the built app. The changes listed under v0.3.0 reach the app with this version.

## v0.3.0 — 2026-11-21

### Added
- When creating a game you now choose how the players sit around the table: "Fronte a fronte" (half on each short side), "Tutto intorno" (one per short side, the others on the long sides) or "Ai lati" (on the long sides). Every life total faces the player sitting on that side. Each option shows a small preview of the board, and only the layouts that fit the number of players are offered. The last choice is remembered for the next game.
- New "Ordine dei giocatori" in the game setup: a small map shows the numbered seats, clockwise like the turn order, and the number next to each player is their seat. Drag a player by the ≡ handle to change the order, or use "Posti a caso" to shuffle the seats. In 2v2, dragging a player into the other team's box moves them to that team.
- New "Parole chiave" column in the Rules page: the most used keyword abilities and keyword actions with their Italian name as printed on cards, the English name (to recognize them on English cards), the rule number and the reminder text printed on Italian cards. The few keywords without a printed reminder text have a short summary, marked "riassunto". It has a search box that works with Italian and English names. On tablets it sits next to the rules, on phones you switch between "Regole" and "Parole chiave".

### Removed
- The "Orientamento dei pannelli" setting and the "Tutti dritti" orientation: panels always face the players around the table. Games and settings that used another orientation switch to "Ai lati".
- The link to the judge (a private Claude project the rest of the group could not open) from the Rules page, and the mention of it in the card search.

## v0.2.1 — 2026-11-17

### Fixed
- On iPhone and iPad (iOS 27) the app installed on the Home Screen no longer has a blurred band coming down from the status bar over the top of the screen. The app now starts below the status bar. To get the fix, remove the app from the Home Screen and add it again from Safari.

## v0.2.0 — 2026-11-17

### Changed
- The release script now updates the changelog and waits for a check: press Enter to commit, tag and push, or "n" to cancel and restore the changelog. Pushing is the default; use `--no-push` to skip it.
- Better readability and easier taps on tablets such as the iPad: larger text and buttons on big screens, and on the game board the names, chips and warnings grow with the panel size.
- New drawn icons for the bottom tabs, the back button, Settings and the "›" arrows in player, group and seat lists, which look the same on every device (some text symbols showed up tiny or odd on iOS).
- Small text (tags, rules references, table headers, stats) is a bit larger everywhere, and the − / + buttons, steppers and counters are at least 44 px, as Apple recommends.
- On the game board, player names no longer end up under the round menu button, and the − / + signs are more visible.

### Fixed
- The offline image cache no longer grows without limit: only commander art is kept (up to 300 images, oldest removed first) and it takes far less storage space. Card searches are no longer stored offline; card rulings are (up to 50). Existing caches are cleared once after the update.
- Imported backups are now checked: invalid colors, ids, image links and numbers are corrected or removed, so a tampered backup file can no longer run code in the app. A damaged file is rejected before asking for confirmation.
- Card searches now tell apart "no results", too many requests in a row, Scryfall being unavailable and no connection, instead of always showing "Nessuna carta trovata".

## v0.1.2 — 2026-11-16

### Added
- The current app version is shown at the bottom of the Settings page.

## v0.1.1 — 2026-11-16

### Changed
- Deploy workflow updated to the Node 24 versions of the GitHub Pages actions.

## v0.1.0 — 2026-11-16

### Fixed
- Long-press on the life counter no longer keeps changing life after the finger is released.

### Added
- `TODO.md` with planned improvements.
- GitHub Actions workflow that deploys to GitHub Pages only on `v*` release tags.
- `scripts/release.mjs` to bump the version (`--patch` / `--minor` / `--major`), update this changelog and tag the release.
- `CLAUDE.md` with project conventions.
