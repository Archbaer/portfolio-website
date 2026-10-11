// Reports drift between projects.json and GitHub repo metadata.
// Never rewrites hand-written copy — prints what changed upstream.
import { readFileSync } from 'node:fs';

const projects = JSON.parse(readFileSync('src/lib/data/projects.json', 'utf8'));

for (const p of projects) {
  const repo = p.repo.replace('https://github.com/', '');
  const res = await fetch(`https://api.github.com/repos/${repo}`);
  if (!res.ok) {
    console.log(`${p.slug}: GitHub fetch failed (${res.status}) — renamed or removed?`);
    continue;
  }
  const gh = await res.json();
  const drift = [];
  if (gh.name !== p.name) drift.push(`name: "${p.name}" → "${gh.name}"`);
  if (gh.language !== p.language) drift.push(`language: "${p.language}" → "${gh.language}"`);
  console.log(drift.length ? `${p.slug}:\n  ${drift.join('\n  ')}` : `${p.slug}: in sync`);
}
