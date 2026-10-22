const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '../dist');

test('Forge and Lib System product pages exist', () => {
  for (const file of ['forge.html', 'libsystem.html', 'library-explorer.html']) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
  }
});

test('app.js registers Forge and Lib System routes', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /forge:\s*\{/);
  assert.match(app, /libsystem:\s*\{/);
});

test('Canonical library catalog exists and validates', () => {
  const p = path.join(root, 'bismut-libraries.v1.json');
  assert.ok(fs.existsSync(p), 'canonical catalog should exist');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  assert.equal(data.schemaVersion, '1.0');
  assert.ok(Array.isArray(data.entries) && data.entries.length > 0);
  // no redundant copies
  assert.ok(!fs.existsSync(path.join(root, 'libraries.v1.json')));
  assert.ok(!fs.existsSync(path.join(root, 'data')));
  assert.ok(!fs.existsSync(path.join(root, 'catalog')));
});

test('explorer.js parses and exposes helpers', () => {
  const src = fs.readFileSync(path.join(root, 'explorer.js'), 'utf8');
  assert.match(src, /bismut-libraries\.v1\.json/);
  const ctx = vm.createContext({ window: {}, document: { readyState: 'loading', addEventListener: () => {} }, fetch: async () => ({ ok: true, json: async () => ({ schemaVersion: '1.0', entries: [{ id: 'x', name: 'X' }] }) }) });
  vm.runInContext(src, ctx);
  assert.ok(ctx.window.BismutExplorer);
  assert.equal(ctx.window.BismutExplorer.validateCatalog({ schemaVersion: '1.0', entries: [{ id: 'a', name: 'A' }] }), true);
  assert.equal(ctx.window.BismutExplorer.validateCatalog({ schemaVersion: '2.0', entries: [] }), false);
  assert.equal(ctx.window.BismutExplorer.filterEntries([{ name: 'Config lib', side: 'both' }, { name: 'Common Lib', side: 'client' }], 'config', '').length, 1);
  assert.equal(ctx.window.BismutExplorer.filterEntries([{ name: 'A', side: 'client' }, { name: 'B', side: 'server' }], '', 'client').length, 1);
  assert.equal(ctx.window.BismutExplorer.filterEntries([{ name: 'A' }], 'zzz', '').length, 0);
});

test('explorer handles empty result set', () => {
  const ctx = vm.createContext({ window: {}, document: { readyState: 'loading', addEventListener: () => {} }, fetch: async () => ({ ok: true, json: async () => ({ schemaVersion: '1.0', entries: [] }) }) });
  const src = fs.readFileSync(path.join(root, 'explorer.js'), 'utf8');
  vm.runInContext(src, ctx);
  // filterEntries returns []
  assert.deepEqual(ctx.window.BismutExplorer.filterEntries([], 'a', ''), []);
});