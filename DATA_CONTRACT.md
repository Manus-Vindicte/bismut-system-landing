# Data Contract — Library Explorer

## Source

Static JSON export produced by `bismut-lib-system`:
`catalog/bismut-libraries.v1.json` (schemaVersion `1.0`).

## Website copy

The website ships a copy under `dist/` (multiple candidate paths for robust
relative fetch):

- `dist/bismut-libraries.v1.json`
- `dist/libraries.v1.json`
- `dist/data/bismut-libraries.v1.json`
- `dist/data/libraries.v1.json`
- `dist/catalog/bismut-libraries.v1.json`

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

## Consumer

`dist/explorer.js` fetches the first available candidate and renders a
searchable/filterable list. No backend, no network beyond static files.