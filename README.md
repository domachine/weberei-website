## Für die Entwicklung starten

### Starten

- `npm ci`
- `docker compose up -d`
- `pm2 start`

Die Website ist nun unter http://localhost:3000 erreichbar.

### Stoppen

- `pm2 kill`
- `docker compose down -v`

## Staging starten

- `docker compose --profile staging up`

Die Website ist nun unter http://localhost:3000 erreichbar.
