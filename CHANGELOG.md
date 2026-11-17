# Changelog

## Unreleased

### Changed
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
