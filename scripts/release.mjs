#!/usr/bin/env node
// Creates a new release: updates CHANGELOG.md, waits for you to check it,
// then commits, tags vX.Y.Z and pushes (which triggers the Pages deploy).
//
//   node scripts/release.mjs --patch      v1.2.3 -> v1.2.4
//   node scripts/release.mjs --minor      v1.2.3 -> v1.3.0
//   node scripts/release.mjs --major      v1.2.3 -> v2.0.0
//
// Flow: CHANGELOG.md is written, then the script waits. Review (and edit if you
// like) the file, then press Enter to commit, tag and push; type "n" or press
// Ctrl+C to cancel and restore CHANGELOG.md.
//
// Options:
//   --no-push   commit and tag locally without pushing
//   --dry-run   show what would happen without changing anything

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const fail = msg => { console.error('✗ ' + msg); process.exit(1); };

const args = process.argv.slice(2);
const bump = ['major', 'minor', 'patch'].find(b => args.includes('--' + b));
const push = !args.includes('--no-push');   // --push is still accepted: pushing is now the default
const dry = args.includes('--dry-run');
if (!bump) fail('Specifica --patch, --minor o --major (più eventualmente --no-push / --dry-run).');

// --- checks ---
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
if (branch !== 'main') fail(`Sei sul branch "${branch}": le release si fanno da main.`);
if (git('status', '--porcelain')) fail('Ci sono modifiche non committate: committale prima della release.');

// --- version ---
let last = null;
try { last = git('describe', '--tags', '--abbrev=0', '--match', 'v[0-9]*'); } catch { /* no tags yet */ }
const [maj, min, pat] = (last ? last.slice(1) : '0.0.0').split('.').map(Number);
const next = 'v' + (bump === 'major' ? [maj + 1, 0, 0] : bump === 'minor' ? [maj, min + 1, 0] : [maj, min, pat + 1]).join('.');
if (git('tag', '--list', next)) fail(`Il tag ${next} esiste già.`);

// --- commits since the last release ---
const range = last ? [`${last}..HEAD`] : [];
const subjects = git('log', ...range, '--no-merges', '--pretty=format:%s')
  .split('\n').map(s => s.trim())
  .filter(s => s && !/^Release v\d/.test(s));
if (!subjects.length) fail(`Nessun commit nuovo da ${last}: niente da rilasciare.`);

// --- changelog ---
// The "## Unreleased" section (kept up to date while working) becomes the new version.
// If it is missing or empty, fall back to the commit subjects since the last tag.
const date = new Date().toISOString().slice(0, 10);
const file = join(root, 'CHANGELOG.md');
const header = '# Changelog\n\n';
const existed = existsSync(file);
const old = (existed ? readFileSync(file, 'utf8') : header).replace(/\r\n/g, '\n');
let body = old.startsWith(header) ? old.slice(header.length) : old;
const unreleased = body.match(/^## Unreleased\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
let notes = unreleased ? unreleased[1].trim() : '';
if (unreleased) body = body.replace(unreleased[0], '');
if (!notes) notes = subjects.map(s => '- ' + s).join('\n');
const section = `## ${next} — ${date}\n\n${notes}\n`;
const updated = header + '## Unreleased\n\n' + section + (body.trim() ? '\n' + body.trim() + '\n' : '');

console.log(`${last || '(nessuna release)'} → ${next}\n\n${section}`);
if (dry) { console.log('(dry-run: nessuna modifica fatta)'); process.exit(0); }

// --- write, then wait for the review ---
writeFileSync(file, updated);
console.log('✓ CHANGELOG.md aggiornato. Controllalo (puoi anche modificarlo) prima di continuare.');

const restore = () => {
  if (existed) git('checkout', '--', 'CHANGELOG.md'); else rmSync(file);
  console.log('✗ Release annullata: CHANGELOG.md ripristinato, nessun commit né tag creato.');
};
const rl = createInterface({ input: process.stdin, output: process.stdout });
const answer = await new Promise(resolve => {
  rl.on('SIGINT', () => resolve(null));     // Ctrl+C
  rl.on('close', () => resolve(null));      // Ctrl+D / stdin closed
  rl.question(`\nInvio = commit, tag ${next}${push ? ' e push' : ''} · "n" = annulla: `, resolve);
});
rl.removeAllListeners('close'); rl.close();
if (answer === null || /^n/i.test(answer.trim())) { restore(); process.exit(1); }

// --- commit, tag, push ---
const others = git('status', '--porcelain').split('\n').filter(l => l && !l.endsWith('CHANGELOG.md'));
if (others.length) console.log(`! Altri file modificati non inclusi nella release:\n${others.join('\n')}`);
git('add', 'CHANGELOG.md');
git('commit', '-m', `Release ${next}`);
git('tag', '-a', next, '-m', `Release ${next}`);
console.log(`✓ Commit e tag ${next} creati.`);

if (push) {
  try {
    git('push', 'origin', 'main');
    git('push', 'origin', next);
  } catch (e) {
    fail(`Push non riuscito (${(e.stderr || e.message).trim()}).\n  Riprova con:  git push origin main && git push origin ${next}`);
  }
  console.log(`✓ Push fatto: il deploy di ${next} parte su GitHub Actions.`);
} else {
  console.log(`Per pubblicare:  git push origin main && git push origin ${next}`);
  console.log(`Per annullare:   git tag -d ${next} && git reset --hard HEAD~1`);
}
