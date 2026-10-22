(function () {
  'use strict';
  const CANDIDATES = [
    'bismut-libraries.v1.json',
    'libraries.v1.json',
    'data/bismut-libraries.v1.json',
    'data/libraries.v1.json',
    'catalog/bismut-libraries.v1.json'
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalize(entry) {
    return entry || {};
  }

  async function fetchCatalog() {
    for (const url of CANDIDATES) {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) continue;
        const data = await response.json();
        if (data && Array.isArray(data.entries)) return data;
      } catch (err) {
        // try next candidate
      }
    }
    throw new Error('Library catalog could not be loaded.');
  }

  function matches(entry, query, side) {
    if (side && entry.side !== side) return false;
    if (!query) return true;
    const haystack = [
      entry.name, entry.author, entry.modIdStr, entry.id, entry.version,
      entry.vsCompatibility, entry.license, entry.side,
      (entry.tags || []).join(' '),
      (entry.capabilities || []).join(' '),
      (entry.dependencies || []).join(' ')
    ].join(' ').toLowerCase();
    return query.toLowerCase().split(/\s+/).every(token => haystack.includes(token));
  }

  function renderCard(entry) {
    const card = document.createElement('article');
    card.className = 'explorer-card';
    card.setAttribute('role', 'listitem');
    const title = document.createElement('h3');
    title.textContent = entry.name || entry.id || 'Unnamed library';
    card.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'explorer-meta';
    meta.textContent = [entry.author, entry.version, entry.side].filter(Boolean).join(' · ');
    card.appendChild(meta);

    if (entry.vsCompatibility) {
      const compat = document.createElement('p');
      compat.className = 'explorer-compat';
      compat.textContent = 'Vintage Story: ' + entry.vsCompatibility;
      card.appendChild(compat);
    }

    const tags = (entry.tags || []).concat(entry.capabilities || []);
    if (tags.length) {
      const tagWrap = document.createElement('div');
      tagWrap.className = 'explorer-tags';
      tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        tagWrap.appendChild(span);
      });
      card.appendChild(tagWrap);
    }

    const links = document.createElement('div');
    links.className = 'explorer-links';
    if (entry.modDbUrl) {
      const a = document.createElement('a');
      a.href = entry.modDbUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Mod DB';
      links.appendChild(a);
    }
    if (entry.sourceUrl) {
      const a = document.createElement('a');
      a.href = entry.sourceUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Source';
      links.appendChild(a);
    }
    if (entry.homepageUrl) {
      const a = document.createElement('a');
      a.href = entry.homepageUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Homepage';
      links.appendChild(a);
    }
    if (links.childNodes.length) card.appendChild(links);
    return card;
  }

  async function init() {
    const list = document.getElementById('explorer-list');
    const searchInput = document.getElementById('explorer-search');
    const sideSelect = document.getElementById('explorer-side');
    const count = document.getElementById('explorer-count');
    if (!list) return;

    let entries = [];
    let catalog = null;
    try {
      catalog = await fetchCatalog();
      entries = catalog.entries.map(normalize);
    } catch (err) {
      list.textContent = 'Katalog konnte nicht geladen werden.';
      return;
    }

    function render() {
      const query = searchInput ? searchInput.value.trim() : '';
      const side = sideSelect ? sideSelect.value : '';
      const filtered = entries.filter(e => matches(e, query, side));
      list.replaceChildren();
      if (!filtered.length) {
        const empty = document.createElement('p');
        empty.textContent = 'Keine Bibliotheken gefunden.';
        list.appendChild(empty);
      } else {
        filtered.forEach(e => list.appendChild(renderCard(e)));
      }
      if (count) count.textContent = `${filtered.length} von ${entries.length} Bibliotheken`;
    }

    if (searchInput) searchInput.addEventListener('input', render);
    if (sideSelect) sideSelect.addEventListener('change', render);
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();