/* Editorial subpage template. Claims are curated, never inferred from a build. */
(() => {
  "use strict";
  const specs = {
  "vision": [
    "KONZEPT",
    "Produktidee",
    "Spielwelt, Mods und Werkzeuge zusammendenken",
    [
      [
        "Welten im Mittelpunkt",
        "Version, Mods und Einstellungen gehören zu einem nachvollziehbaren Setup."
      ],
      [
        "Eigenständige Bausteine",
        "Launcher, Engine und Graphics bleiben getrennte Produkte."
      ],
      [
        "Nachvollziehbarkeit",
        "Spielumgebungen sollen vor einer Änderung verständlich sein."
      ]
    ],
    "Die Idee beschreibt die Richtung, nicht ein bereits verfügbares Gesamtpaket.",
    "Produktkarte, Architekturdiagramm und verifizierte Anwendungsfälle."
  ],
  "launcher": [
    "IN ENTWICKLUNG",
    "Desktop-Anwendung",
    "Spielversionen, Welten und Mods verwalten",
    [
      [
        "Versionen & Instanzen",
        "Spielinstallationen und Welten eindeutig zuordnen."
      ],
      [
        "Mods & Modpacks",
        "Abhängigkeiten prüfen und Setups nachvollziehbar verwalten."
      ],
      [
        "Diagnose & Recovery",
        "Änderungen mit Prüfungen, Sicherung und Wiederherstellung begleiten."
      ]
    ],
    "Launcher-Bereiche werden separat qualifiziert. Hier wird kein fertiger Download zugesichert.",
    "Echte Screenshots, PASS-Nachweise, Versionen und Verfügbarkeit."
  ],
  "engine": [
    "ENTWICKLUNGSBASIS",
    "Runtime & Renderer",
    "Schnittstellen, Diagnose und native Grafikentwicklung",
    [
      [
        "Laufzeitkontext",
        "Fähigkeiten und Status an konkrete Sitzungen binden."
      ],
      [
        "Klare Verträge",
        "Versionierte Schnittstellen zwischen Engine-Komponenten."
      ],
      [
        "Renderer-Proben",
        "Native Render-Tests von Spielintegration unterscheiden."
      ]
    ],
    "Die Engine ist eine aktive Entwicklungsbasis, kein fertiger Ersatz für den Spielrenderer.",
    "Backend-Matrix, echte Integrationsgates und Messprotokolle."
  ],
  "graphics": [
    "ENTWICKLUNGS-MOD",
    "Clientseitiges Mod",
    "Grafiksteuerung und Live-Diagnose direkt in Vintage Story",
    [
      [
        "In-Game-Oberfläche",
        "Unterstützte Grafikoptionen gezielt bedienen."
      ],
      [
        "Live-Diagnose",
        "Angeforderte und angewendete Werte unterscheiden."
      ],
      [
        "Fallbacks",
        "Grenzen von Transport und Backend sichtbar ausweisen."
      ]
    ],
    "Entwicklungsarbeit für Vintage Story 1.22.7; kein genereller Release-Anspruch.",
    "Screenshots aus dem Spiel, Effektmatrix und Voraussetzungen."
  ],
  "development": [
    "FORTLAUFEND",
    "Projekttransparenz",
    "Nachweise statt unbelegter Release-Versprechen",
    [
      [
        "Umgesetzt",
        "Nur belegte Testergebnisse als abgeschlossenen Stand zeigen."
      ],
      [
        "Offen",
        "Risiken, Blocker und fehlende Gates klar kennzeichnen."
      ],
      [
        "Veröffentlicht",
        "Prototypen, lokale PASS und öffentliche Releases trennen."
      ]
    ],
    "Die Teilprojekte befinden sich in unterschiedlichen Entwicklungsphasen.",
    "Datierte Milestones und Berichte aus den zuständigen Repositories."
  ],
  "system": [
    "ÖKOSYSTEM",
    "Architekturübersicht",
    "Fünf Bereiche mit unterschiedlichen Verantwortlichkeiten",
    [
      [
        "Launcher & Graphics",
        "Verwaltung am Desktop und Grafiksteuerung im Spiel."
      ],
      [
        "Engine & Forge",
        "Runtime, Renderer-Forschung und Modul-Verträge."
      ],
      [
        "Lib System",
        "Bibliotheksmanifeste, Resolver und ein lokaler Katalog."
      ]
    ],
    "Eine pauschal abgeschlossene Integration aller Produkte ist nicht zugesichert.",
    "Belegte Schnittstellen, Versionsverträge und Abhängigkeitskarte."
  ],
  "forge": [
    "GEPLANT",
    "Modul-Schnittstelle",
    "Read-only Modul- und Bibliotheksabfragen",
    [
      [
        "CanConsume",
        "Module sollen Bibliotheksanforderungen sicher prüfen können."
      ],
      [
        "Read-only",
        "Prüfanfragen dürfen Registry-Daten nicht unbemerkt verändern."
      ],
      [
        "Verträge",
        "Abhängigkeiten explizit statt implizit koppeln."
      ]
    ],
    "Forge ist als Schnittstellenschicht geplant; keine vollständige Implementierung behauptet.",
    "Schnittstellenschema und erster qualifizierter Implementierungsnachweis."
  ],
  "libsystem": [
    "F1–F3 PROTOTYP",
    "Bibliothekssystem",
    "Deterministische Registry, Resolver und Lockfiles",
    [
      [
        "Manifeste",
        "Lokale Bibliotheken validiert registrieren."
      ],
      [
        "Abhängigkeiten",
        "Konflikte erkennen und reproduzierbare Lockfiles bilden."
      ],
      [
        "Explorer",
        "18 Einträge sind im statischen Website-Katalog verfügbar."
      ]
    ],
    "Der lokale Prototyp und der statische Explorer sind keine gehostete Registry.",
    "CLI-Beispiele, Vertragsdokumentation und weitere Katalognachweise."
  ]
};
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  function render(route) {
    const overview = document.querySelector("#subpage-overview");
    const progress = document.querySelector("#subpage-progress");
    if (!overview || !progress) return false;
    const spec = specs[route];
    if (!spec) {
      overview.replaceChildren();
      progress.replaceChildren();
      return false;
    }
    const [state, category, focus, topics, current, next] = spec;
    const summary = element("section", "tpl-summary");
    summary.setAttribute("aria-label", "Projekt-Kurzprofil");
    const intro = element("div", "tpl-summary-content");
    intro.append(element("p", "tpl-kicker", "BISMUT / PROJEKTPROFIL"),
      element("h3", "tpl-title", category),
      element("p", "tpl-copy", focus));
    const status = element("span", "tpl-status", state);
    summary.append(intro, status);

    const grid = element("section", "tpl-topics");
    grid.setAttribute("aria-label", "Drei Themenbereiche");
    for (const [heading, copy] of topics) {
      const card = element("article", "tpl-card");
      card.append(element("span", "tpl-card-number", String(grid.children.length + 1).padStart(2, "0")),
        element("h3", "tpl-card-heading", heading),
        element("p", "tpl-copy", copy));
      grid.append(card);
    }
    overview.replaceChildren(summary, grid);

    const panel = element("section", "tpl-progress");
    panel.setAttribute("aria-label", "Status und nächste Inhalte");
    panel.append(element("h3", "tpl-progress-title", "Stand & Ausblick"));
    const columns = element("div", "tpl-progress-grid");
    for (const [label, heading, copy] of [
      ["DERZEITIGER STAND", "Was wir heute sagen können", current],
      ["NÄCHSTE INHALTE", "Womit die Seite wächst", next]
    ]) {
      const section = element("article", "tpl-progress-item");
      section.append(element("p", "tpl-kicker", label),
        element("h4", "tpl-card-heading", heading),
        element("p", "tpl-copy", copy));
      columns.append(section);
    }
    panel.append(columns,
      element("p", "tpl-evidence-note",
        "Redaktionelles Template. Neue Fortschrittsangaben werden erst nach Abgleich mit Projekt-Reports veröffentlicht."));
    if (route === "libsystem") {
      const link = element("a", "tpl-action", "Katalog im Library Explorer öffnen ↗");
      link.href = "library-explorer.html";
      panel.append(link);
    }
    progress.replaceChildren(panel);
    return true;
  }
  window.renderBismutSubpageTemplate = render;
})();
