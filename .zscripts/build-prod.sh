#!/bin/bash
# Production build: compiles Next.js, flattens the standalone output
# (Next nests it due to multiple lockfiles upstream), and bundles the
# database + static assets into a self-contained dist/ directory.
#
# Result: dist/server.js runnable with `node dist/server.js`
set -euo pipefail

cd "$(dirname "$0")/.."
PROJECT_DIR="$(pwd)"

echo "▶ Building Next.js (standalone)…"
NEXT_TELEMETRY_DISABLED=1 npx next build

echo "▶ Locating standalone output…"
# Next may nest the standalone output under a path mirroring the inferred
# workspace root. Find the actual server.js (skip the nested next/dist ones).
NESTED_DIR="$(find .next/standalone -name server.js -not -path '*/node_modules/*' -printf '%h\n' | head -1)"
if [ -z "$NESTED_DIR" ]; then
  echo "✗ Could not locate standalone server.js"; exit 1
fi
echo "  found at: $NESTED_DIR"

echo "▶ Assembling flat dist/…"
rm -rf dist
mkdir -p dist

# Move the standalone server + node_modules + package.json up to dist/
cp -r "$NESTED_DIR/." dist/
# Ensure static assets are in place (.next/static) and public/
cp -r .next/static dist/.next/static
cp -r public dist/public 2>/dev/null || true

echo "▶ Bundling the database…"
mkdir -p dist/db
cp db/custom.db dist/db/custom.db

echo "▶ Aliasing the Prisma generated client…"
# Next.js 16 + Turbopack standalone emits a require for a hash-named module
# (e.g. @prisma/client-<hash>) that is NOT included in the standalone output.
# Extract that hash from the built chunks and create an alias package that
# re-exports the real generated client (.prisma/client).
PRISMA_HASH="$(grep -rho '@prisma/client-[a-f0-9]\{16\}' dist/.next/server/chunks/ 2>/dev/null | sort -u | head -1 | sed 's/@prisma\/client-//')"
if [ -n "$PRISMA_HASH" ]; then
  echo "  built code expects hash: $PRISMA_HASH"
  ALIAS_DIR="dist/node_modules/@prisma/client-$PRISMA_HASH"
  mkdir -p "$ALIAS_DIR"
  cat > "$ALIAS_DIR/package.json" <<PJ
{ "name": "@prisma/client-$PRISMA_HASH", "version": "1.0.0", "main": "index.js" }
PJ
  cat > "$ALIAS_DIR/index.js" <<EJ
// Alias: re-export the real generated Prisma client.
module.exports = require('../../.prisma/client');
EJ
  echo "  alias created at: $ALIAS_DIR"
else
  echo "  (no prisma hash found in chunks — skipping alias)"
fi

# Write a .env into dist so the production server finds the DB via an
# absolute path (Prisma resolves SQLite paths relative to CWD; an absolute
# path is unambiguous regardless of where the server is launched from).
ABS_DB="$PROJECT_DIR/dist/db/custom.db"
cat > dist/.env <<EOF
DATABASE_URL="file:$ABS_DB"
NEXT_TELEMETRY_DISABLED=1
EOF

echo "▶ Verifying…"
test -f dist/server.js || { echo "✗ dist/server.js missing"; exit 1; }
test -f dist/db/custom.db || { echo "✗ dist/db/custom.db missing"; exit 1; }

echo ""
echo "✅ Build complete."
echo "   Production server:  cd dist && node server.js"
echo "   Database:           dist/db/custom.db"
echo "   Size:"
du -sh dist 2>/dev/null | cut -f1 | sed 's/^/                        /'
