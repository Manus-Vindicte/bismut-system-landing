# FINAL RELEASE REPORT — Bismut Landing

Date: 2026-10-23
Repository: bismus-landing
Baseline: 04f0973 → HEAD 04f0973 (no new commit in this gate; runner re-run only)

## 1. Integration Runner

- Command: `node scripts/integration-runner.mjs`
- Result: **PASS**
- Protocol: `docs/evidence/integration-run-1792719946560.json`

### Producer (BLS)
- Repo: `bismut-lib-system`
- HEAD: `f91565468f8d9a5ced4d9b9fe3daa2174f7e6ab9`
- Clean: yes
- Export input: `catalog/bismut-libraries.v1.json`
- Export SHA-256: `ee816732a37e8aff364dc8c352b89630adfccbbf3aef209900c1db092162954b`
- Entry count: 18

### Consumer (Website)
- Repo: `bismus-landing`
- HEAD: `04f09735716ba121612b30b3cf8cc66e0f277569`
- Clean: yes (before runner)
- Imported catalog: `dist/bismut-libraries.v1.json`
- Imported SHA-256: `0c56b8cfb5f07c46b468d31fb002740cea9f44d86a9a8f2f2ae7c5315e14827d`
- Entry count: 18
- Unique IDs: 18

## 2. Tests

- Node unit tests: `node --test tests/*.test.cjs` → **16/16 PASS**
- Playwright E2E: `npx playwright test` → **27/27 PASS**
  - Viewports: 1280×720, 1920×1080, 375×667
  - Coverage: crystal 6 facets, product pages, explorer fetch/render, search, empty results, side filter, no horizontal overflow, keyboard focus, screenshots

## 3. Browser Evidence

Screenshots in `docs/evidence/`:
- `pw-desktop-1280-index.png`, `pw-desktop-1280-explorer.png`
- `pw-desktop-1920-explorer.png`, `pw-desktop-1920-index.png`
- `pw-mobile-375-index.png`, `pw-mobile-375-explorer.png`
- `shot-1280x720-index.html.png`, `shot-1280x720-library-explorer.html.png`, `shot-1920x1080-library-explorer.html.png`

No browser console errors observed during page loads.

## 4. Remaining Risks

- Forge is a planned product; no dedicated repository exists. Descriptions marked as development status.
- Interactive E2E beyond Playwright's scripted assertions (e.g., full keyboard tab chains) covered at basic level only.
- BLS export uses volatile `GeneratedAt` timestamp; treated as normalized by import (preserved as-is). Not a blocker.
- No push or deployment performed (per task limits).

## 5. Release Recommendation

**APPROVED for local release.** All mandatory gates green. No critical blockers.

Git status: clean
HEAD: 04f09735716ba121612b30b3cf8cc66e0f277569