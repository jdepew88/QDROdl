#!/usr/bin/env bash
# Run ON the server after you've already pulled code.
# Purpose: apply DB migrations and restart app safely.
#
# Usage:
#   chmod +x scripts/restart-and-migrate.sh
#   ./scripts/restart-and-migrate.sh
#
# Optional flags:
#   --skip-build   Skip `npm run build` (faster, less safe)
#   --restart      Use `pm2 restart` instead of zero-downtime `pm2 reload`
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SKIP_BUILD=0
USE_RESTART=0
for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=1 ;;
    --restart) USE_RESTART=1 ;;
    *)
      echo "Unknown arg: $arg"
      echo "Usage: ./scripts/restart-and-migrate.sh [--skip-build] [--restart]"
      exit 1
      ;;
  esac
done

echo "==> prisma generate"
npx prisma generate

if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null | wc -l)" -gt 0 ]; then
  echo "==> prisma migrate deploy"
  npx prisma migrate deploy
fi

if [ "$SKIP_BUILD" -eq 0 ]; then
  echo "==> npm run build"
  npm run build
else
  echo "==> skipping build (--skip-build)"
fi

if pm2 describe qdrodl-site >/dev/null 2>&1; then
  if [ "$USE_RESTART" -eq 1 ]; then
    echo "==> pm2 restart qdrodl-site --update-env"
    pm2 restart qdrodl-site --update-env
  else
    echo "==> pm2 reload qdrodl-site --update-env"
    pm2 reload qdrodl-site --update-env
  fi
else
  echo "==> pm2 start ecosystem.config.cjs"
  pm2 start ecosystem.config.cjs
fi

pm2 save
echo "Done."

