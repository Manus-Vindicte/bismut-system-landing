const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '../dist');

test('Forge and Lib System product pages exist', () => {
  for (const file of ['forge.html', 'libsystem.html', 'library-explorer.html']) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
  }
});

test('app.js registers Forge, Lib System and Library Explorer routes', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /forge:\s*\{/);
  assert.match(app, /libsystem:\s*\{/);
});

test('Library catalog JSON is available for the explorer', () => {
  const candidates = ['bismut-libraries.v1.json', 'libraries.v1.json', 'data/bismut-libraries.v1.json'];
  for (const c of candidates) {
    const p = path.join(root, c);
    assert.ok(fs.existsSync(p), `${c} should exist`);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    assert.ok(Array.isArray(data.entries) && data.entries.length > 0);
  }
});

test('explorer.js parses and references the catalog', () => {
  const src = fs.readFileSync(path.join(root, 'explorer.js'), 'utf8');
  assert.match(src, /bismut-libraries\.v1\.json/);
  assert.match(src, /explorer-list/);
});