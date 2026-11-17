# Changelog

## Unreleased

### Fixed
- The offline image cache no longer grows without limit: only commander art is kept (up to 300 images, oldest removed first) and it takes far less storage space. Card searches are no longer stored offline; card rulings are (up to 50). Existing caches are cleared once after the update.

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
