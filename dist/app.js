const pages = {
  vision: { number: '01', label: 'Die Idee', eyebrow: 'DEINE WELT. DEIN SETUP.', title: 'Mehr Raum für<br><em>deine Spielwelt.</em>', lead: 'Eine Welt ist mehr als ein Spielstand. Zu ihr gehören die passende Spielversion, deine Mods und die Einstellungen, mit denen du spielen möchtest.', rows: [['Zusammenhänge sichtbar machen', 'Bismut stellt Spielumgebungen, Welten und Modpacks in den Mittelpunkt. Du sollst nachvollziehen können, welches Setup zu welcher Welt gehört.'], ['Eigenständige Bausteine', 'Der Launcher verwaltet das Setup. Engine und Graphics sind eigene Entwicklungsbereiche. Der normale Vintage-Story-Betrieb benötigt keine Bismut Engine.']], next: 'launcher' },
  launcher: { number: '02', label: 'Launcher', eyebrow: 'BISMUT LAUNCHER', title: 'Dein Setup.<br><em>Dein Überblick.</em>', lead: 'Spielversionen, Instanzen, Welten und Modpacks in nachvollziehbaren Spielumgebungen verwalten.', rows: [['Welten und Spielumgebungen', 'Die passende Spielversion, Instanz und Modpack-Zuordnung gehören zu einer klar beschriebenen Umgebung. Der Launcher ist auch ohne Bismut Engine vorgesehen.'], ['Mods und Modpacks', 'Zur Entwicklung gehören Mod-Abhängigkeiten, Modpack-Erstellung und -Import sowie Update-Prüfungen.'], ['Änderungen mit Wiederherstellung', 'Gesicherte Änderungen, Prüfungen und Wiederherstellung bleiben Teil der Verwaltung. Online-Veröffentlichung und Distribution haben eigene Freigaben. Ein fertiger Produktdownload wird hier noch nicht angeboten.']], next: 'engine' },
  engine: { number: '03', label: 'Engine', eyebrow: 'BISMUT ENGINE', title: 'Unter der<br><em>Oberfläche.</em>', lead: 'Laufzeitsteuerung, nachvollziehbare Diagnose und die Entwicklung eines nativen Vulkan-Renderers.', rows: [['Laufzeit und Diagnose', 'Die Engine verantwortet Laufzeitschnittstellen, Fähigkeitenprüfung und die Zuordnung von Diagnose zu einem konkreten Lauf.'], ['Zwei Entwicklungswege', 'Die experimentelle Grafik-Anbindung an Vintage Story und der direkte native Renderer sind getrennte Entwicklungswege mit eigenen Werkzeugen.'], ['Optionale Verbindung', 'Die Launcher-Anbindung ist optional. Ein erfolgreicher Entwicklertest bedeutet noch keine fertige Integration ins Spiel.']], next: 'graphics' },
  graphics: { number: '04', label: 'Graphics', eyebrow: 'BISMUT IN-GAME GRAPHICS', title: 'Deine Welt.<br><em>Ein neuer Blick.</em>', lead: 'Grafikeinstellungen und Live-Diagnose direkt in Vintage Story — als eigenständiger clientseitiger Mod.', rows: [['Steuerung im Spiel', 'Der Mod ist auf Vintage Story 1.22.7 ausgerichtet und stellt Grafikeinstellungen innerhalb des Spiels bereit.'], ['Live-Diagnose', 'Bildrate, Laufzeitstatus und angewendete Einstellungen machen den Entwicklungszustand nachvollziehbar.'], ['Licht und Material', 'Die Weiterentwicklung untersucht unter anderem Licht, Glas und Materialdarstellung. Daraus folgt noch keine zugesicherte Grafikqualität für einen Release. Der Kristall dieser Website ist eine Webanimation, keine Spielaufnahme.']], next: 'development' },
  development: { number: '05', label: 'Entwicklung', eyebrow: 'SCHRITT FÜR SCHRITT WEITER', title: 'Deine Welt bleibt.<br><em>Dein Setup wächst.</em>', lead: 'Bismut System befindet sich in Entwicklung. Launcher, Engine und Graphics haben jeweils einen eigenen Entwicklungsstand.', rows: [['Was diese Seite zeigt', 'Die Aufgaben und die Richtung der einzelnen Bereiche. Sie beruhen auf den Projektdokumenten von Launcher, Engine und Graphics.'], ['Was als Nächstes kommt', 'Die weitere Entwicklung und die Freigabe der jeweiligen Integrationen. Eine Veröffentlichung als fertiges Gesamtpaket steht noch aus.']], next: 'system' },
  system: { number: '06', label: 'Das System', eyebrow: 'EIGENE AUFGABEN. KLARE GRENZEN.', title: 'Ein System.<br><em>Viele Perspektiven.</em>', lead: 'Bismut verbindet Spielverwaltung mit eigenständiger Engine- und Grafikentwicklung für Vintage Story.', rows: [['Launcher', 'Dein Einstieg: Spielversionen, Instanzen, Welten, Mods und Modpacks verwalten.'], ['Engine', 'Das technische Fundament: Laufzeitschnittstellen, Diagnose und native Renderer-Entwicklung.'], ['Graphics', 'Die Steuerung im Spiel: Grafikeinstellungen, Live-Diagnose und experimentelle Grafikentwicklung.']], next: 'vision' }
};
const body = document.body;
const home = document.querySelector('#home-view');
const menu = document.querySelector('#facet-navigation');
const content = document.querySelector('#content-view');
const title = document.querySelector('#content-title');
const veil = document.querySelector('.morph-veil');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let current = 'home';
let destination = 'home';
let transitionId = 0;
let animations = [];
let returnRoute = 'system';
function render(route) {
  const isHome = route === 'home';
  body.dataset.view = route;
  home.hidden = !isHome;
  home.inert = !isHome;
  content.hidden = isHome;
  content.inert = isHome;
  menu.inert = !isHome;
  menu.setAttribute('aria-hidden', String(!isHome));
  document.querySelector('#menu-toggle').setAttribute('aria-expanded', String(isHome));
  document.querySelector('#menu-label').textContent = isHome ? 'Kristallmenü' : 'Menü öffnen';
  document.querySelectorAll('[data-route]').forEach(link => {
    if (link.dataset.route === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (!isHome) {
    const page = pages[route];
    document.querySelector('#content-index').textContent = `${page.number} / ${page.label.toUpperCase()}`;
    document.querySelector('#content-eyebrow').textContent = page.eyebrow;
    title.innerHTML = page.title;
    document.querySelector('#content-lead').textContent = page.lead;
    const rows = page.rows.map(([heading, copy], i) => {
      const row = document.createElement('div'); row.className = 'detail-row';
      const number = document.createElement('span'); number.textContent = `0${i + 1}`;
      const wrapper = document.createElement('div');
      const h3 = document.createElement('h3'); h3.textContent = heading;
      const p = document.createElement('p'); p.textContent = copy;
      wrapper.append(h3, p); row.append(number, wrapper); return row;
    });
    document.querySelector('#content-details').replaceChildren(...rows);
    const next = document.querySelector('#next-page');
    next.dataset.route = page.next; next.href = `#${page.next}`;
    next.textContent = `Weiter: ${pages[page.next].label} ↗`;
    document.querySelector('.content-scroll').scrollTop = 0;
    returnRoute = route;
  }
  document.querySelector('#view-status').textContent = isHome ? 'SECHS FACETTEN. EIN SYSTEM.' : `${pages[route].number} / ${pages[route].label.toUpperCase()}`;
  document.title = isHome ? 'Bismut System — Deine Welt. Dein Setup.' : `${pages[route].label} — Bismut System`;
  current = route;
  destination = route;
}
async function navigate(route, { historyMode = 'push', focus = true } = {}) {
  if (route !== 'home' && !pages[route]) route = 'home';
  if (route === destination) return;
  destination = route;
  const id = ++transitionId;
  animations.forEach(a => a.cancel()); animations = [];
  body.classList.add('is-morphing');
  if (historyMode === 'push') history.pushState({ route }, '', `#${route}`);
  if (!reduceMotion.matches && typeof veil.animate === 'function') {
    const closing = veil.animate([
      { opacity: 0, clipPath: 'polygon(50% 18%,75% 45%,50% 75%,25% 45%)' },
      { opacity: 1, clipPath: 'polygon(-30% -40%,130% -40%,130% 140%,-30% 140%)' }
    ], { duration: 360, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' });
    animations.push(closing);
    try { await closing.finished; } catch { return; }
    if (id !== transitionId) return;
    render(route);
    const opening = veil.animate([
      { opacity: 1, clipPath: 'polygon(-30% -40%,130% -40%,130% 140%,-30% 140%)' },
      { opacity: 0, clipPath: 'polygon(8% 32%,22% 42%,15% 62%,1% 45%)' }
    ], { duration: 540, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
    animations.push(opening);
    if (route !== 'home') {
      const enter = document.querySelector('.content-body').animate([
        { opacity: 0, transform: 'translate(45px,20px) scale(.97)', filter: 'blur(9px)' },
        { opacity: 1, transform: 'translate(0,0) scale(1)', filter: 'blur(0)' }
      ], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' });
      enter.finished.catch(() => {});
      animations.push(enter);
    }
    try { await opening.finished; } catch { return; }
  } else render(route);
  if (id !== transitionId) return;
  animations.forEach(a => a.cancel()); animations = [];
  body.classList.remove('is-morphing');
  if (focus) (route === 'home' ? menu.querySelector(`[data-route="${returnRoute}"]`) : title).focus({ preventScroll: true });
}
document.addEventListener('click', event => {
  const link = event.target.closest('[data-route]');
  if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); navigate(link.dataset.route);
});
document.querySelector('#menu-toggle').addEventListener('click', () => navigate(destination === 'home' ? returnRoute : 'home'));
window.addEventListener('keydown', event => { if (event.key === 'Escape' && destination !== 'home') navigate('home'); });
window.addEventListener('popstate', () => navigate(location.hash.slice(1) || 'home', { historyMode: 'none' }));
window.addEventListener('hashchange', () => navigate(location.hash.slice(1) || 'home', { historyMode: 'none' }));
const initial = location.hash.slice(1);
render(pages[initial] ? initial : 'home');
