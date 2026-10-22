(function () {
  'use strict';
  // Canonical catalog path (single source of truth in this repo).
  const CATALOG_URL = 'bismut-libraries.v1.json';

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

  function validateCatalog(data) {
    if (!data || typeof data !== 'object') return false;
    if (data.schemaVersion !== '1.0') return false;
    if (!Array.isArray(data.entries)) return false;
    return data.entries.every(function (e) {
      return e && typeof e === 'object' && typeof e.id === 'string' && typeof e.name === 'string';
    });
  }

  async function fetchCatalog(url) {
    const target = url || CATALOG_URL;
    const response = await fetch(target, { cache: 'no-store' });
    if (!response.ok) throw new Error('catalog fetch failed: ' + response.status);
    const data = await response.json();
    if (!validateCatalog(data)) throw new Error('invalid catalog schema');
    return data;
  }

  function matches(entry, query, side) {
    const e = normalize(entry);
    if (side && e.side !== side) return false;
    if (!query) return true;
    const haystack = [
      e.name, e.author, e.modIdStr, e.id, e.version,
      e.vsCompatibility, e.license, e.side,
      (e.tags || []).join(' '),
      (e.capabilities || []).join(' '),
      (e.dependencies || []).join(' ')
    ].join(' ').toLowerCase();
    return String(query).toLowerCase().split(/\s+/).filter(Boolean).every(function (token) {
      return haystack.includes(token);
    });
  }

  function filterEntries(entries, query, side) {
    return (entries || []).filter(function (e) { return matches(e, query, side); });
  }

  function renderCard(entry) {
    const e = normalize(entry);
    const card = document.createElement('article');
    card.className = 'explorer-card';
    card.setAttribute('role', 'listitem');
    const title = document.createElement('h3');
    title.textContent = e.name || e.id || 'Unnamed library';
    card.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'explorer-meta';
    meta.textContent = [e.author, e.version, e.side].filter(Boolean).join(' \u00b7 ');
    card.appendChild(meta);

    if (e.vsCompatibility) {
      const compat = document.createElement('p');
      compat.className = 'explorer-compat';
      compat.textContent = 'Vintage Story: ' + e.vsCompatibility;
      card.appendChild(compat);
    }

    const tags = (e.tags || []).concat(e.capabilities || []);
    if (tags.length) {
      const tagWrap = document.createElement('div');
      tagWrap.className = 'explorer-tags';
      tags.forEach(function (tag) {
        const span = document.createElement('span');
        span.textContent = tag;
        tagWrap.appendChild(span);
      });
      card.appendChild(tagWrap);
    }

    const links = document.createElement('div');
    links.className = 'explorer-links';
    if (e.modDbUrl) {
      const a = document.createElement('a');
      a.href = e.modDbUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Mod DB';
      links.appendChild(a);
    }
    if (e.sourceUrl) {
      const a = document.createElement('a');
      a.href = e.sourceUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Source';
      links.appendChild(a);
    }
    if (e.homepageUrl) {
      const a = document.createElement('a');
      a.href = e.homepageUrl;
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
    try {
      const catalog = await fetchCatalog();
      entries = catalog.entries.map(normalize);
    } catch (err) {
      list.textContent = 'Katalog konnte nicht geladen werden: ' + (err && err.message ? err.message : err);
      if (count) count.textContent = '0 von 0 Bibliotheken';
      return;
    }

    function render() {
      const query = searchInput ? searchInput.value.trim() : '';
      const side = sideSelect ? sideSelect.value : '';
      const filtered = filterEntries(entries, query, side);
      list.replaceChildren();
      if (!filtered.length) {
        const empty = document.createElement('p');
        empty.className = 'explorer-empty';
        empty.textContent = 'Keine Bibliotheken gefunden.';
        list.appendChild(empty);
      } else {
        filtered.forEach(function (e) { list.appendChild(renderCard(e)); });
      }
      if (count) count.textContent = filtered.length + ' von ' + entries.length + ' Bibliotheken';
    }

    if (searchInput) searchInput.addEventListener('input', render);
    if (sideSelect) sideSelect.addEventListener('change', render);
    render();
  }

  // Expose for tests / reuse
  window.BismutExplorer = {
    CATALOG_URL: CATALOG_URL,
    validateCatalog: validateCatalog,
    matches: matches,
    filterEntries: filterEntries,
    normalize: normalize
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();