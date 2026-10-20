const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function fixture(reduced = true, initialPage = 'home') {
  const nodes = new Map();
  const events = {};
  const history = [];
  const frames = new Map();
  let nextFrame = 0;
  const motion = { matches: reduced, addEventListener(name, fn) { this[name] = fn; } };
  function node() {
    const attributes = new Map();
    const classes = new Set();
    const properties = new Map();
    return {
      dataset: {}, hidden: false, inert: false, textContent: '', innerHTML: '',
      style: { setProperty: (k, v) => properties.set(k, v), removeProperty: k => properties.delete(k), getPropertyValue: k => properties.get(k) },
      classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) },
      setAttribute: (k, v) => attributes.set(k, v), removeAttribute: k => attributes.delete(k),
      getAttribute: k => attributes.get(k),
      append() {}, replaceChildren(...children) { this.children = children; },
      focus() { this.focused = true; },
      addEventListener(name, fn) { this[name] = fn; },
      querySelector(selector) { return get(selector); },
      contains() { return false; },
      animate() {
        let reject;
        const finished = new Promise((resolve, fail) => { reject = fail; setTimeout(resolve, 2); });
        return { finished, cancel() { reject(new Error('cancelled')); } };
      }
    };
  }
  function get(selector) { if (!nodes.has(selector)) nodes.set(selector, node()); return nodes.get(selector); }
  const body = node(); body.dataset.page = initialPage;
  const context = vm.createContext({
    document: { body, hidden: false, activeElement: null, querySelector: get, querySelectorAll: () => [], createElement: node, addEventListener: (name, fn) => events[name] = fn },
    window: { innerWidth: 1000, innerHeight: 800, addEventListener: (name, fn) => events[name] = fn },
    location: { hash: '' }, history: { pushState: (state, title, hash) => history.push(hash) },
    matchMedia: () => motion, setTimeout,
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id)
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist/app.js'), 'utf8'), context);
  return { nodes, body, events, history, motion, frames, get,
    frame(time) { const [id, fn] = frames.entries().next().value; frames.delete(id); fn(time); },
    run: code => vm.runInContext(code, context) };
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

test('each crystal facet opens its own local HTML document with shared navigation', () => {
  const root = path.join(__dirname, '../dist');
  const routes = { vision: 'idee.html', launcher: 'launcher.html', engine: 'engine.html', graphics: 'graphics.html', development: 'entwicklung.html', system: 'system.html' };
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const [route, file] of Object.entries(routes)) {
    const page = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(home, new RegExp(`href="${file}" data-route="${route}"`));
    assert.match(page, new RegExp(`data-page="${route}"`));
    assert.match(page, /href="index\.html"[^>]*class="back-link"/);
    assert.match(page, /href="launcher\.html" data-route="launcher"/);
  }
  assert.match(fs.readFileSync(path.join(root, 'style.css'), 'utf8'), /@view-transition\{navigation:auto\}/);
});

test('a direct subpage load renders its own content without a hash route', () => {
  const f = fixture(true, 'engine');
  assert.equal(f.body.dataset.view, 'engine');
  assert.equal(f.get('#home-view').hidden, true);
  assert.equal(f.get('#content-view').hidden, false);
  assert.match(f.get('#content-title').innerHTML, /Oberfläche/);
  assert.match(f.get('#next-page').href, /graphics\.html$/);
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

test('idle movement pauses for menu interaction and respects reduced motion', async () => {
  const f = fixture(false);
  const menu = f.get('#facet-navigation');
  assert.equal(f.frames.size, 1);
  f.frame(1000);
  assert.notEqual(menu.style.getPropertyValue('--crystal-float'), undefined);
  const previous = menu.style.getPropertyValue('--crystal-roll');
  f.events.pointermove({ clientX: 1000, clientY: 0 });
  f.frame(3000);
  assert.notEqual(menu.style.getPropertyValue('--crystal-roll'), previous);
  menu.pointerenter();
  assert.equal(f.frames.size, 0);
  menu.pointerleave();
  assert.equal(f.frames.size, 1);
  await f.run("navigate('engine')");
  assert.equal(f.frames.size, 0);
  await f.run("navigate('home')");
  assert.equal(f.frames.size, 1);
  f.motion.matches = true;
  f.motion.change();
  assert.equal(f.frames.size, 0);
  assert.equal(menu.style.getPropertyValue('--crystal-roll'), undefined);
});
