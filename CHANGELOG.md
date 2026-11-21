# Changelog

## Unreleased

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
