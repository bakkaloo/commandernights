# Commander Nights

Static PWA (life counter, groups, player profiles and leaderboards for Magic: The Gathering Commander nights). No build step: `index.html` contains all CSS and JS, `sw.js` is the service worker. Data lives only in each device's `localStorage` (key `cn-state-v1`); never change that key or the data structure without a migration in `migrate()`.

- Run locally: `npx serve .` (or VS Code Live Server).
- Deploy: GitHub Pages, only when a `v*` tag is pushed (`.github/workflows/deploy.yml`).
- Release: `node scripts/release.mjs --patch|--minor|--major [--push] [--dry-run]`.
- Planned work: `TODO.md` (tick items off when done).

## Rules

1. **Update the changelog with every change.** Add an entry to the `## Unreleased` section of `CHANGELOG.md` for each change you make, in the same commit as the change. Group entries under `### Added`, `### Changed`, `### Fixed`, `### Removed`. Write them for users of the app, not as implementation details. Never rename `Unreleased` to a version by hand: `scripts/release.mjs` does that.
2. **English for code and git.** Code comments, commit messages, changelog entries and PR descriptions are written in English. Commit messages: imperative mood, short subject (e.g. `Fix long-press on life counter not stopping`).
3. **The app UI stays in Italian.** All user-facing text (labels, buttons, toasts, rules summaries) remains Italian.
4. **If I talk to you in italian you talk to me in italian and same for every language.**
