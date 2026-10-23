# Data Contract — Library Explorer

## Source

Static JSON export produced by `bismut-lib-system`:
`catalog/bismut-libraries.v1.json` (schemaVersion `1.0`).

## Website copy (canonical)

The website ships exactly one copy, the canonical catalog path:

- `dist/bismut-libraries.v1.json`

No redundant copies. `explorer.js` fetches only this path. This prevents
schema drift between copies. The website remains a consumer of the upstream
`bismut-lib-system` export; the copy is refreshed manually when the upstream
export changes.

## Top-level shape

```json
{
  "schemaVersion": "1.0",
  "generatedBy": "bismut-lib-system",
  "generatedAt": "YYYY-MM-DD",
  "entries": [ { ... } ]
}
```

## Entry fields

| Field | Type | Notes |
|---|---|---|
| id | string | stable library id (e.g. `moddb:configlib`) |
| name | string | display name |
| author | string | maintainer |
| modIdStr | string | mod id string |
| modId | string | numeric mod id (may be empty) |
| version | string | library version |
| side | string | `both` / `client` / `server` |
| vsCompatibility | string | Vintage Story version range |
| capabilities | string[] | capability tags |
| tags | string[] | free tags |
| dependencies | string[] | dependency strings |
| license | string | license (often `unknown`) |
| sourceUrl | string | source repository URL (may be empty) |
| modDbUrl | string | Mod DB URL (may be empty) |
| homepageUrl | string | homepage URL (may be empty) |
| lastVerified | string | ISO date |
| provenance | string | origin/provenance (e.g. `moddb-api-v1`), optional but displayed for attribution |

## Import (consumer side)

Fresh BLS artifacts are PascalCase (`SchemaVersion`, `Entries`, ...). The website
consumes via `scripts/import-catalog.mjs`, which validates, transforms to the
camelCase contract, checks unique IDs, and atomically replaces
`dist/bismut-libraries.v1.json`:

```
node scripts/import-catalog.mjs <path-to-bls-export/bismut-libraries.v1.json>
```

## Consumer

`dist/explorer.js` fetches the canonical path and renders a
searchable/filterable list. No backend, no network beyond static files.