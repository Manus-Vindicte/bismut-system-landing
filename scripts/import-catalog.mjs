import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DEFAULT_INPUT = process.argv[2] || 'C:/Users/Adrian/AppData/Local/Temp/opencode/bls-handoff/bismut-libraries.v1.json';
const OUTPUT = path.join(process.cwd(), 'dist', 'bismut-libraries.v1.json');

function camel(s){ return s.charAt(0).toLowerCase() + s.slice(1); }

function transformEntry(e) {
  const out = {};
  for (const [k, v] of Object.entries(e)) out[camel(k)] = v;
  return out;
}

function main() {
  const raw = fs.readFileSync(DEFAULT_INPUT, 'utf8');
  const src = JSON.parse(raw);
  if (!src || !Array.isArray(src.Entries)) throw new Error('invalid BLS export: missing Entries array');
  if (src.SchemaVersion !== '1.0') throw new Error('unsupported schema version: ' + src.SchemaVersion);

  const entries = src.Entries.map(transformEntry);
  // unique ids
  const ids = new Set();
  for (const e of entries) {
    if (!e.id || !e.name) throw new Error('entry missing id or name');
    if (ids.has(e.id)) throw new Error('duplicate id: ' + e.id);
    ids.add(e.id);
  }

  const catalog = {
    schemaVersion: '1.0',
    generatedBy: src.GeneratedBy || 'bismut-lib-system',
    generatedAt: src.GeneratedAt || new Date().toISOString().slice(0, 10),
    entries
  };

  const tmp = OUTPUT + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(catalog, null, 2) + '\n');
  fs.renameSync(tmp, OUTPUT);

  const buf = fs.readFileSync(OUTPUT);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  console.log('imported entries:', entries.length);
  console.log('unique ids:', ids.size);
  console.log('sha256:', hash);
  console.log('output:', OUTPUT);
}

main();