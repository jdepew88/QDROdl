#!/usr/bin/env bash
# Run ON the Linode after SSH (not on Windows). From repo root on server:
#   chmod +x scripts/deploy-server.sh
#   ./scripts/deploy-server.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

git pull

npm ci
npx prisma generate

if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null | wc -l)" -gt 0 ]; then
  # Apply any committed migrations to the VPS database.
  npx prisma migrate deploy
fi

npm run build

if pm2 describe qdrodl-site >/dev/null 2>&1; then
  pm2 reload qdrodl-site --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
