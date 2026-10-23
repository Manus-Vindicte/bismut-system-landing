import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
}

const BLS = path.resolve(arg('--bls', 'C:/Project Development/37 Leitung/projects/Bismut System Development/bismut-lib-system'));
const WEBSITE = path.resolve(arg('--website', process.cwd()));
const HANDOFF_DIR = path.join(process.env.TEMP || 'C:/Users/Adrian/AppData/Local/Temp/opencode', 'bls-handoff-run');

function run(cmd, cwd, opts = {}) {
  const r = spawnSync(cmd, { cwd, shell: true, encoding: 'utf8', ...opts });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '' };
}

function gitHead(repo) { return run('git rev-parse HEAD', repo).stdout.trim(); }
function gitStatus(repo) { return run('git status --porcelain', repo).stdout.trim(); }
function sha256File(p) { return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }

const protocol = {
  startedAt: new Date().toISOString(),
  producer: { repo: BLS, head: null, clean: null },
  consumer: { repo: WEBSITE, head: null, clean: null },
  export: { input: null, output: null, sha256: null, count: null },
  import: { output: null, sha256: null, count: null },
  tests: { node: null, playwright: null },
  result: 'PENDING'
};

console.log('=== Integration Runner ===');
console.log('BLS:', BLS);
console.log('Website:', WEBSITE);

// 1. Check repos
protocol.producer.head = gitHead(BLS);
protocol.producer.clean = gitStatus(BLS) === '';
protocol.consumer.head = gitHead(WEBSITE);
protocol.consumer.clean = gitStatus(WEBSITE) === '';
console.log('Producer HEAD:', protocol.producer.head, 'clean:', protocol.producer.clean);
console.log('Consumer HEAD:', protocol.consumer.head, 'clean:', protocol.consumer.clean);

if (!protocol.producer.clean) { console.error('Producer repo not clean'); protocol.result = 'BLOCKED'; }
if (!protocol.consumer.clean) { console.error('Consumer repo not clean'); protocol.result = 'BLOCKED'; }

// 2. Build BLS
if (protocol.result !== 'BLOCKED') {
  const build = run('dotnet build', BLS);
  if (build.status !== 0) { console.error('BLS build failed:', build.stderr); protocol.result = 'FAIL'; }
  else console.log('BLS build: PASS');
}

// 3. Export
if (protocol.result !== 'BLOCKED' && protocol.result !== 'FAIL') {
  fs.rmSync(HANDOFF_DIR, { recursive: true, force: true });
  fs.mkdirSync(HANDOFF_DIR, { recursive: true });
  const exp = run(`dotnet run --project src/Bismut.Lib.System.Cli -- export-portal --input catalog/bismut-libraries.v1.json --output "${HANDOFF_DIR}"`, BLS);
  if (exp.status !== 0) { console.error('BLS export failed:', exp.stderr); protocol.result = 'FAIL'; }
  else {
    const inPath = path.join(BLS, 'catalog', 'bismut-libraries.v1.json');
    const outPath = path.join(HANDOFF_DIR, 'bismut-libraries.v1.json');
    protocol.export.input = inPath;
    protocol.export.output = outPath;
    protocol.export.sha256 = sha256File(outPath);
    const data = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    protocol.export.count = data.Entries.length;
    console.log('Export: count', protocol.export.count, 'sha256', protocol.export.sha256);
  }
}

// 4. Validate schema (basic)
if (protocol.result !== 'BLOCKED' && protocol.result !== 'FAIL') {
  const data = JSON.parse(fs.readFileSync(protocol.export.output, 'utf8'));
  if (data.SchemaVersion !== '1.0' || !Array.isArray(data.Entries)) { console.error('schema invalid'); protocol.result = 'FAIL'; }
  else console.log('Schema: PASS');
}

// 5. Import (consumer)
if (protocol.result !== 'BLOCKED' && protocol.result !== 'FAIL') {
  const imp = run(`node scripts/import-catalog.mjs "${protocol.export.output}"`, WEBSITE);
  console.log(imp.stdout);
  if (imp.status !== 0) { console.error('import failed:', imp.stderr); protocol.result = 'FAIL'; }
  else {
    const outPath = path.join(WEBSITE, 'dist', 'bismut-libraries.v1.json');
    protocol.import.output = outPath;
    protocol.import.sha256 = sha256File(outPath);
    const data = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    protocol.import.count = data.entries.length;
    console.log('Import: count', protocol.import.count, 'sha256', protocol.import.sha256);
  }
}

// 6. Node tests
if (protocol.result !== 'BLOCKED' && protocol.result !== 'FAIL') {
  const nt = run('node --test tests/*.test.cjs', WEBSITE);
  protocol.tests.node = nt.status === 0 ? 'PASS' : 'FAIL';
  console.log('Node tests:', protocol.tests.node);
  if (nt.status !== 0) { console.error(nt.stdout + nt.stderr); protocol.result = 'FAIL'; }
}

// 7. Playwright
if (protocol.result !== 'BLOCKED' && protocol.result !== 'FAIL') {
  const pw = run('npx playwright test', WEBSITE);
  protocol.tests.playwright = pw.status === 0 ? 'PASS' : 'FAIL';
  console.log('Playwright:', protocol.tests.playwright);
  if (pw.status !== 0) { console.error(pw.stdout.slice(-2000)); protocol.result = 'FAIL'; }
}

if (protocol.result === 'PENDING') protocol.result = 'PASS';
protocol.finishedAt = new Date().toISOString();

const evidenceDir = path.join(WEBSITE, 'docs', 'evidence');
fs.mkdirSync(evidenceDir, { recursive: true });
const protoPath = path.join(evidenceDir, `integration-run-${Date.now()}.json`);
fs.writeFileSync(protoPath, JSON.stringify(protocol, null, 2));
console.log('Protocol:', protoPath);
console.log('RESULT:', protocol.result);

// restore clean? no changes to BLS
process.exit(protocol.result === 'PASS' ? 0 : 1);
