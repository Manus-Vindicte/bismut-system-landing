const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function fixture(reduced = true) {
  const nodes = new Map();
  const events = {};
  const history = [];
  function node() {
    const attributes = new Map();
    const classes = new Set();
    return {
      dataset: {}, hidden: false, inert: false, textContent: '', innerHTML: '',
      classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) },
      setAttribute: (k, v) => attributes.set(k, v), removeAttribute: k => attributes.delete(k),
      getAttribute: k => attributes.get(k),
      append() {}, replaceChildren(...children) { this.children = children; },
      focus() { this.focused = true; },
      addEventListener(name, fn) { this[name] = fn; },
      querySelector(selector) { return get(selector); },
      animate() {
        let reject;
        const finished = new Promise((resolve, fail) => { reject = fail; setTimeout(resolve, 2); });
        return { finished, cancel() { reject(new Error('cancelled')); } };
      }
    };
  }
  function get(selector) { if (!nodes.has(selector)) nodes.set(selector, node()); return nodes.get(selector); }
  const body = node();
  const context = vm.createContext({
    document: { body, querySelector: get, querySelectorAll: () => [], createElement: node, addEventListener: (name, fn) => events[name] = fn },
    window: { addEventListener: (name, fn) => events[name] = fn },
    location: { hash: '' }, history: { pushState: (state, title, hash) => history.push(hash) },
    matchMedia: () => ({ matches: reduced }), setTimeout
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist/app.js'), 'utf8'), context);
  return { nodes, body, events, history, get, run: code => vm.runInContext(code, context) };
}

test('each facet selects exactly one view, updates content and restores focus', async () => {
  const f = fixture();
  for (const route of ['vision', 'launcher', 'engine', 'graphics', 'development', 'system']) {
    await f.run(`navigate('${route}')`);
    assert.equal(f.body.dataset.view, route);
    assert.equal(f.get('#home-view').hidden, true);
    assert.equal(f.get('#content-view').hidden, false);
    assert.equal(f.get('#facet-navigation').inert, true);
    assert.equal(f.get('#content-title').focused, true);
    assert.ok(f.get('#content-lead').textContent.length > 30);
    assert.equal(f.get('#menu-toggle').getAttribute('aria-expanded'), 'false');
  }
  await f.run("navigate('home')");
  assert.equal(f.get('#content-view').hidden, true);
  assert.equal(f.get('#facet-navigation').inert, false);
  assert.equal(f.get('[data-route="system"]').focused, true);
});

test('history navigation does not create new entries; Escape returns to the menu', async () => {
  const f = fixture();
  await f.run("navigate('launcher')");
  assert.deepEqual(f.history, ['#launcher']);
  f.run("location.hash = '#engine'"); f.events.popstate();
  assert.equal(f.body.dataset.view, 'engine');
  assert.equal(f.history.length, 1);
  f.events.keydown({ key: 'Escape' });
  assert.equal(f.body.dataset.view, 'home');
  assert.equal(f.get('#menu-toggle').getAttribute('aria-expanded'), 'true');
  await f.run("navigate('unknown')");
  assert.equal(f.body.dataset.view, 'home');
});

test('rapid facet selection and return cancel stale transitions', async () => {
  const f = fixture(false);
  await f.run("Promise.all([navigate('launcher'), navigate('engine'), navigate('home')])");
  assert.equal(f.body.dataset.view, 'home');
  assert.equal(f.body.classList.contains('is-morphing'), false);
  assert.equal(f.get('#content-view').hidden, true);
  await f.run("Promise.all([navigate('vision'), navigate('graphics')])");
  assert.equal(f.body.dataset.view, 'graphics');
  assert.equal(f.body.classList.contains('is-morphing'), false);
  assert.equal(f.get('#content-title').focused, true);
});
