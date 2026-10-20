# Bismut System landing page

Standalone presentation concept owned by this Site. Source and deployable static files live in `dist/`; `.openai/hosting.json` binds the private Site. No launcher, engine or graphics repository is modified. Main is this new Site's source branch.

Design follows the supplied PrismHero reference: dark background, serif headline, faceted crystal, soft spectral highlights. The crystal is now a stable SVG navigation surface with six individually focusable, labeled facets. Translucent gradients suggest glass; this does not implement the reference's physical Three.js transmission material.

Navigation selects one view inside a fixed viewport. Facets route to idea, launcher, engine, graphics, development and system overview; inactive content is hidden/inert. A polygon expands across the stage and contracts as the selected content enters, while the crystal shifts to the side. Hash URLs, browser history, focus restoration, Escape and reduced-motion preference are supported. Content scrolls within the active view when necessary. No downloads, waitlist, or external product integrations are claimed. Google Fonts is optional; local fallbacks are defined.

## Crystal motion — 2026-10-20

The home-view crystal now floats, tilts gently in 3D, and varies its brightness. Pointer position adds a small amount of parallax. Motion pauses while the pointer or keyboard focus is on the navigation, while the document is hidden, and during content morphs. A reduced-motion preference disables the continuous animation. This is local-only work; no Site source upload or deployment is intended.

## Facet navigation — 2026-10-20

User-requested change: replace the scrolling landing page with menu-selected content views and morph transitions. Owned files: `dist/index.html`, `dist/style.css`, `dist/app.js`, and this document. Starting branch `main`, clean baseline `f113764`. No product repository changes.

Verification: `node --test tests/navigation.test.cjs` checks view selection, hidden/inert state, focus restoration, browser-history handling, Escape, reduced motion and rapid transition cancellation in a minimal DOM fixture. JavaScript syntax and whitespace checks also apply. These are logic tests, not browser or layout acceptance. Live browser verification of the user-opened file URL is blocked by the browser URL policy (only HTTP/HTTPS is permitted); no alternate route is used to bypass that restriction. Visual and real-browser interaction acceptance remain unverified.

## Content review — 2026-10-20

Corrected the name to Bismut in visible text, metadata and canvas. Content now identifies Vintage Story, Launcher-owned environments/worlds/modpacks, optional Engine integration, native renderer development, and the client-side Graphics Mod. Development status remains explicit. Existing Site identity and URL are retained.

Read-only sources: Launcher `docs/PROGRAM_BOARD.md`, `docs/architecture/ADR-001_LAUNCHER_READY_TO_CONNECT.md`, `docs/architecture/update-and-publishing.md`, and existing ModpackCreator source; Engine `README.md`, `docs/PROGRAM_BOARD.md`, `.docs/ENGINE_OWNERSHIP_BOUNDARY_V1.md` and `src/runtime-control-process.mjs`; Graphics Mod `README.md`, `modinfo.json`, and `src/BismutGraphicsModSystem.cs`. Deployed content contains independently written product summaries only, excluding local evidence, third-party source and machine details.

Reviewed revisions: Launcher `a9ade3287f73c1ac1320e8aca96109a221e71705`, Engine `25cb0b182ab9ebb39d5eeb802c11a81c48e6132d`, Graphics Mod `5386e488dee5b86b8e3354198a5cb9374eb0a582`. Product repositories were not modified. Launcher contained pre-existing work in progress. Documents vary in age, so no release readiness or universal rendering capability is inferred.
