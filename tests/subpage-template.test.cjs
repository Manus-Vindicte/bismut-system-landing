const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const pages = {vision:'idee', launcher:'launcher', engine:'engine', graphics:'graphics',
development:'entwicklung', system:'system', forge:'forge', libsystem:'libsystem'};
test('eight pages declare shared content slots and load the template before the router', () => {
  for (const [key,file] of Object.entries(pages)) {
    const html=fs.readFileSync(path.join(root,'dist',file+'.html'),'utf8');
    assert.match(html,new RegExp('data-page="'+key+'"'));
    assert.match(html,/id="subpage-overview"/);
    assert.match(html,/id="subpage-progress"/);
    assert.match(html,/href="subpage-template\.css"/);
    assert.ok(html.indexOf('src="subpage-template.js"')<html.indexOf('src="app.js"'));
  }
  assert.doesNotMatch(fs.readFileSync(path.join(root,'dist','index.html'),'utf8'),/id="subpage-overview"/);
});
test('all routes render three cards with a status and outlook', () => {
  function node(tag='div'){return {tag,children:[],textContent:'',setAttribute(){},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x}}}
  const overview=node(), progress=node();
  const context=vm.createContext({window:{},document:{createElement:node,querySelector:k=>({'#subpage-overview':overview,'#subpage-progress':progress})[k]||null}});
  vm.runInContext(fs.readFileSync(path.join(root,'dist','subpage-template.js'),'utf8'),context);
  for(const key of Object.keys(pages)){
    assert.equal(context.window.renderBismutSubpageTemplate(key),true);
    assert.equal(overview.children[1].children.length,3);
    assert.equal(progress.children.length,1);
  }
  assert.equal(context.window.renderBismutSubpageTemplate('invalid'),false);
  assert.equal(overview.children.length,0);
});
test('static output path is pinned',()=>assert.equal(JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8')).outputDirectory,'dist'));
