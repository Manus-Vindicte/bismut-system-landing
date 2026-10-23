const pages = {
  vision: { number: '01', label: 'Die Idee', eyebrow: 'DEINE WELT. DEIN SETUP.', title: 'Mehr Raum für<br><em>deine Spielwelt.</em>', lead: 'Eine Welt ist mehr als ein Spielstand. Zu ihr gehören die passende Spielversion, deine Mods und die Einstellungen, mit denen du spielen möchtest.', rows: [['Zusammenhänge sichtbar machen', 'Bismut stellt Spielumgebungen, Welten und Modpacks in den Mittelpunkt. Du sollst nachvollziehen können, welches Setup zu welcher Welt gehört.'], ['Eigenständige Bausteine', 'Der Launcher verwaltet das Setup. Engine und Graphics sind eigene Entwicklungsbereiche. Der normale Vintage-Story-Betrieb benötigt keine Bismut Engine.']], related: [{ href: 'launcher.html', label: 'BISMUT LAUNCHER', title: 'Welten und Modpacks', description: 'Spielversionen, Instanzen, Welten und Modpacks in einem klaren Setup.' }, { href: 'engine.html', label: 'BISMUT ENGINE', title: 'Laufzeit und Renderer', description: 'Diagnose, Laufzeitsteuerung und die Entwicklung eines nativen Renderers.' }, { href: 'graphics.html', label: 'BISMUT GRAPHICS', title: 'Grafik direkt im Spiel', description: 'Grafikeinstellungen und Live-Diagnose als clientseitiger Vintage-Story-Mod.' }], next: 'launcher' },
  launcher: { number: '02', label: 'Launcher', eyebrow: 'BISMUT LAUNCHER', title: 'Dein Setup.<br><em>Dein Überblick.</em>', lead: 'Spielversionen, Instanzen, Welten, Mods und Modpacks in klar beschriebenen Spielumgebungen verwalten.', rows: [['Spielversionen und Instanzen', 'Installationen und Instanzen bleiben klar zugeordnet. Du siehst, welches Setup zu welcher Spielwelt gehört und kannst Vanilla-Spielstarts ohne die Engine nutzen.'], ['Welten und Serverprofile', 'Weltbindungen und Serverprofile machen den Startkontext nachvollziehbar. Ein Vorabcheck kann die ausgewählte Umgebung prüfen, bevor das Spiel startet oder du einem Server beitrittst.'], ['Mods und Abhängigkeiten', 'Der Launcher löst Mod-Abhängigkeiten auf und hält die gewählte Mod-Konfiguration als prüfbares Setup fest. Änderungen an Mods können geprüft und bei Problemen wiederhergestellt werden.'], ['Modpacks erstellen und importieren', 'Der Creator unterstützt den lokalen Aufbau und die Prüfung von Modpacks. Beim Import wählst du das Ziel ausdrücklich aus, bevor Inhalte in eine Umgebung übernommen werden.'], ['Änderungen und Diagnose', 'Prüfungen, Sicherungen und Wiederherstellung helfen Änderungen an Installationen und Mod-Konfigurationen nachvollziehbar zu halten.'], ['Entwicklungsstand', 'Der Launcher befindet sich in aktiver Entwicklung. Online-Veröffentlichung, Verteilung und fertige Downloads sind noch kein verfügbares Gesamtpaket.']], related: [{ href: 'engine.html', label: 'BISMUT ENGINE', title: 'Engine kennenlernen', description: 'Laufzeit, Diagnose und Renderer-Entwicklung als eigenständige Bausteine.' }, { href: 'graphics.html', label: 'BISMUT GRAPHICS', title: 'Grafik im Spiel', description: 'Das clientseitige Grafik-Modul für Vintage Story entdecken.' }], next: 'engine' },
  engine: { number: '03', label: 'Engine', eyebrow: 'BISMUT ENGINE', title: 'Technik, die<br><em>weiterdenkt.</em>', lead: 'Ein eigenständiges Fundament für Laufzeitsteuerung, Diagnose und die Entwicklung eines nativen Renderers.', rows: [['Laufzeit im Blick', 'Die Engine bereitet Laufzeitumgebungen vor, prüft verfügbare Fähigkeiten und hält Status zu einem konkreten Lauf zusammen. Fehlende Voraussetzungen werden als Einschränkung ausgewiesen.'], ['Klare Schnittstellen', 'Versionierte Verträge beschreiben, wie Engine-Komponenten Fähigkeiten aushandeln, Sitzungen führen und Diagnosen austauschen. Der Launcher bleibt eine eigenständige Anwendung mit eigener Zuständigkeit.'], ['Renderer in Entwicklung', 'Der native Vulkan-Renderer wird separat entwickelt und geprüft. Werkzeuge unterstützen Build, Diagnose und begrenzte Render-Proben. Daraus folgt noch keine zugesicherte Grafikqualität in einer laufenden Vintage-Story-Spielwelt.'], ['Optionale Integration', 'Der Launcher kann unabhängig von der Engine verwendet werden. Eine Anbindung wird nur dort ausgewiesen, wo sie ausdrücklich umgesetzt und geprüft ist.'], ['Entwicklungsstand', 'Die Engine ist eine aktive Entwicklungsbasis. Sie ist kein fertiges Grafik-Upgrade und ersetzt nicht automatisch den Vintage-Story-Renderer.']], related: [{ href: 'launcher.html', label: 'BISMUT LAUNCHER', title: 'Launcher kennenlernen', description: 'Spielversionen, Welten, Mods und Modpacks verwalten.' }, { href: 'graphics.html', label: 'BISMUT GRAPHICS', title: 'Grafik im Spiel', description: 'Das eigenständige clientseitige Grafik-Modul ansehen.' }], next: 'graphics' },
  graphics: { number: '04', label: 'Graphics', eyebrow: 'BISMUT IN-GAME GRAPHICS', title: 'Deine Welt.<br><em>Ein neuer Blick.</em>', lead: 'Grafiksteuerung und Live-Diagnose direkt in Vintage Story — als eigenständiger clientseitiger Mod.', rows: [['Einstellungen im Spiel', 'Das Mod öffnet eine eigene Grafikoberfläche in Vintage Story 1.22.7. Sichtbare Regler steuern die unterstützten Effekte, ohne native Spieltasten zu überschreiben.'], ['Live-Diagnose', 'Ein Monitor zeigt Bildrate, Frame-Zeit, Laufzeitstatus und den angefragten sowie verwendeten Grafik-Backend. Wenn ein Fallback nötig ist, bleibt der Grund sichtbar.'], ['Effekte und Laufzeit', 'Die vorhandenen Effekte bilden eine Grundlage für die Weiterentwicklung. Angeforderte Werte und tatsächlich übernommene Einstellungen werden getrennt betrachtet, damit ein Regler nicht fälschlich als angewendeter Effekt erscheint.'], ['Voraussetzungen und Grenzen', 'Die Laufzeitverbindung benötigt eine konfigurierte Signalumgebung. Ohne sie bleiben Bedienelemente sichtbar, während die Diagnose meldet, dass kein Transport verbunden ist.'], ['Entwicklungsstand', 'Bismut Graphics ist ein clientseitiges Entwicklungs-Mod für Vintage Story 1.22.7. Eine vollständige Renderer-Parität oder allgemeine Grafikqualität für einen Release wird nicht zugesichert.']], related: [{ href: 'launcher.html', label: 'BISMUT LAUNCHER', title: 'Spielumgebung verwalten', description: 'Das Setup für Versionen, Welten und Modpacks entdecken.' }, { href: 'engine.html', label: 'BISMUT ENGINE', title: 'Engine kennenlernen', description: 'Die technische Laufzeit- und Renderer-Basis ansehen.' }], next: 'engine' },
  development: { number: '05', label: 'Entwicklung', eyebrow: 'SCHRITT FÜR SCHRITT WEITER', title: 'Deine Welt bleibt.<br><em>Dein Setup wächst.</em>', lead: 'Bismut System befindet sich in Entwicklung. Launcher, Engine und Graphics haben jeweils einen eigenen Entwicklungsstand.', rows: [['Was diese Seite zeigt', 'Die Aufgaben und die Richtung der einzelnen Bereiche. Sie beruhen auf den Projektdokumenten von Launcher, Engine und Graphics.'], ['Was als Nächstes kommt', 'Die weitere Entwicklung und die Freigabe der jeweiligen Integrationen. Eine Veröffentlichung als fertiges Gesamtpaket steht noch aus.']], next: 'system' },
  system: { number: '06', label: 'Das System', eyebrow: 'EIGENE AUFGABEN. KLARE GRENZEN.', title: 'Ein System.<br><em>Viele Perspektiven.</em>', lead: 'Bismut verbindet Spielverwaltung mit eigenständiger Engine- und Grafikentwicklung für Vintage Story.', rows: [['Launcher', 'Dein Einstieg: Spielversionen, Instanzen, Welten, Mods und Modpacks verwalten.'], ['Engine', 'Das technische Fundament: Laufzeitschnittstellen, Diagnose und native Renderer-Entwicklung.'], ['Graphics', 'Die Steuerung im Spiel: Grafikeinstellungen, Live-Diagnose und experimentelle Grafikentwicklung.'], ['Forge', 'Die Bibliotheks- und Build-Schnittstelle für Bismut-Module und externe Werkzeuge.'], ['Bismut Lib System', 'Lokale, deterministische Bibliotheksverwaltung für die Vintage-Story-Modding-Ökosystem.']], next: 'vision' },
forge: { number: '07', label: 'Forge', eyebrow: 'BISMUT FORGE', title: 'Schnittstellen.<br><em>Für Module.</em>', lead: 'Forge stellt read-only Abfragen für Bismut-Module bereit und verbindet Bibliotheken, Laufzeit und Werkzeuge.', rows: [['Read-only Abfragen', 'Forge beantwortet CanConsume-Anfragen für Bibliotheken, ohne Daten zu verändern.'], ['Modulbindung', 'Module können ihre Abhängigkeiten über Forge prüfen, bevor sie in eine Umgebung übernommen werden.'], ['Entwicklungsstand', 'Forge ist eine geplante Schnittstellenschicht. Eine vollständige Implementierung steht noch aus.']], related: [{ href: 'libsystem.html', label: 'BISMUT LIB SYSTEM', title: 'Bibliotheken verwalten', description: 'Lokale Registry, Resolver und Lockfiles für Vintage-Story-Mods.' }, { href: 'engine.html', label: 'BISMUT ENGINE', title: 'Engine kennenlernen', description: 'Die technische Laufzeit- und Renderer-Basis ansehen.' }], next: 'libsystem' },
libsystem: { number: '08', label: 'Lib System', eyebrow: 'BISMUT LIB SYSTEM', title: 'Bibliotheken.<br><em>Deterministisch.</em>', lead: 'Bismut Lib System bietet lokale Registry, Resolver und Lockfiles für Vintage-Story-Bibliotheken.', rows: [['Manifest und Validierung', 'Manifeste werden geprüft und in einer lokalen Registry mit Inhaltsdigests erfasst.'], ['Abhängigkeiten auflösen', 'Deterministische Auflösung mit Konflikterkennung und byte-stabile Lockfiles.'], ['Verifikation', 'Lockfiles können gegen die Registry verifiziert werden.'], ['Entwicklungsstand', 'Bismut Lib System ist ein F1–F3-Prototyp. Hosted Registry und Netzwerk sind nicht implementiert.']], related: [{ href: 'library-explorer.html', label: 'LIBRARY EXPLORER', title: 'Katalog durchsuchen', description: 'Den statischen Bibliothekskatalog interaktiv erkunden.' }, { href: 'forge.html', label: 'BISMUT FORGE', title: 'Forge kennenlernen', description: 'Read-only Schnittstellen für Module und Werkzeuge.' }], next: 'vision' }
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
let crystalFrame = 0;
let crystalPaused = false;
let pointerX = 0;
let pointerY = 0;

function stopCrystalMotion(reset = false) {
  if (crystalFrame) cancelAnimationFrame(crystalFrame);
  crystalFrame = 0;
  if (reset) {
    menu.style.removeProperty('--crystal-float');
    menu.style.removeProperty('--crystal-roll');
    menu.style.removeProperty('--crystal-x');
    menu.style.removeProperty('--crystal-y');
    menu.style.removeProperty('--crystal-glint');
  }
}

function moveCrystal(time) {
  crystalFrame = 0;
  if (destination !== 'home' || reduceMotion.matches || document.hidden || crystalPaused) return;
  const seconds = time / 1000;
  menu.style.setProperty('--crystal-float', `${(Math.sin(seconds * 0.72) * 8).toFixed(2)}px`);
  menu.style.setProperty('--crystal-roll', `${(-5 + Math.sin(seconds * 0.38) * 3).toFixed(2)}deg`);
  menu.style.setProperty('--crystal-x', `${(Math.sin(seconds * 0.52) * 7 + pointerY * 2).toFixed(2)}deg`);
  menu.style.setProperty('--crystal-y', `${(Math.cos(seconds * 0.47) * 9 + pointerX * 2).toFixed(2)}deg`);
  menu.style.setProperty('--crystal-glint', (1 + Math.sin(seconds * 0.68) * 0.15).toFixed(3));
  crystalFrame = requestAnimationFrame(moveCrystal);
}

function syncCrystalMotion() {
  if (destination === 'home' && !reduceMotion.matches && !document.hidden && !crystalPaused) {
    if (!crystalFrame) crystalFrame = requestAnimationFrame(moveCrystal);
  } else stopCrystalMotion(reduceMotion.matches || destination !== 'home');
}
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
    const related = document.querySelector('#related-pages');
    related.replaceChildren(); related.hidden = !page.related;
    if (page.related) {
      const section = document.createElement('section'); section.className = 'related-pages'; section.setAttribute('aria-labelledby', 'related-title');
      const heading = document.createElement('h3'); heading.id = 'related-title'; heading.textContent = 'ENTDECKE DIE BEREICHE';
      const grid = document.createElement('div'); grid.className = 'related-grid';
      for (const item of page.related) {
        const link = document.createElement('a'); link.className = 'related-card'; link.href = item.href;
        const label = document.createElement('span'); label.className = 'related-card-label'; label.textContent = item.label;
        const title = document.createElement('strong'); title.textContent = item.title;
        const description = document.createElement('span'); description.className = 'related-card-description'; description.textContent = item.description;
        const arrow = document.createElement('span'); arrow.className = 'related-card-arrow'; arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗';
        link.append(label, title, description, arrow); grid.append(link);
      }
      section.append(heading, grid); related.append(section);
    }
    const next = document.querySelector('#next-page');
    next.dataset.route = page.next; next.href = `${page.next === 'vision' ? 'idee' : page.next === 'development' ? 'entwicklung' : page.next}.html`;
    next.textContent = route === 'graphics' ? 'Erfahre mehr über die Engine ↗' : `Mehr erfahren: ${pages[page.next].label} ↗`;
    document.querySelector('.content-scroll').scrollTop = 0;
    if (typeof window.renderBismutSubpageTemplate === 'function') window.renderBismutSubpageTemplate(route);
    returnRoute = route;
  }
  document.querySelector('#view-status').textContent = isHome ? 'SECHS FACETTEN. EIN SYSTEM.' : `${pages[route].number} / ${pages[route].label.toUpperCase()}`;
  document.title = isHome ? 'Bismut System — Deine Welt. Dein Setup.' : `${pages[route].label} — Bismut System`;
  current = route;
  destination = route;
  syncCrystalMotion();
}
async function navigate(route, { historyMode = 'push', focus = true } = {}) {
  if (route !== 'home' && !pages[route]) route = 'home';
  if (route === destination) return;
  destination = route;
  stopCrystalMotion();
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
document.querySelector('#menu-toggle').addEventListener('click', () => {
  if (destination !== 'home') { location.href = 'index.html'; return; }
  menu.querySelector('.crystal-faces a')?.focus({ preventScroll: true });
});
window.addEventListener('pointermove', event => {
  pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });
menu.addEventListener('focusin', () => { crystalPaused = true; stopCrystalMotion(); });
menu.addEventListener('focusout', () => { crystalPaused = menu.contains(document.activeElement); syncCrystalMotion(); });
document.addEventListener('visibilitychange', syncCrystalMotion);
reduceMotion.addEventListener('change', syncCrystalMotion);
window.addEventListener('keydown', event => { if (event.key === 'Escape' && destination !== 'home') location.href = 'index.html'; });
const initial = body.dataset.page || location.hash.slice(1);
render(pages[initial] ? initial : 'home');

if (body.dataset.page === 'home') {
  const jumpLinks = [...document.querySelectorAll('[data-jumplink]')];
  const projectSections = [...document.querySelectorAll('.project-section')];
  const reveals = [...document.querySelectorAll('.motion-reveal')];
  const reduced = reduceMotion.matches;

  if (!reduced && 'IntersectionObserver' in window) {
    body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    reveals.forEach(section => revealObserver.observe(section));
    const sectionObserver = new IntersectionObserver(entries => {
      const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      jumpLinks.forEach(link => {
        if (link.dataset.jumplink === active.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.35] });
    projectSections.forEach(section => sectionObserver.observe(section));
  } else reveals.forEach(section => section.classList.add('is-visible'));

  let progressFrame = 0;
  const updateProgress = () => {
    progressFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    body.style.setProperty('--page-progress', String(scrollable > 0 ? window.scrollY / scrollable : 0));
  };
  window.addEventListener('scroll', () => {
    if (progressFrame) return;
    progressFrame = requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();
}
