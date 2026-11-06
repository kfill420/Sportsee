# Sportsee - Front

## Installation

```bash
pnpm install
```

## Lancement

Avec l'API (backend lancé sur `http://localhost:8000`) :

```bash
pnpm dev
```

Avec les données mockées (`public/mocks`), sans backend :

```bash
pnpm dev:mock
```

L'application est disponible sur `http://localhost:5173`.

## Configuration

Variables facultatives, dans un fichier `.env` :

```
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```
