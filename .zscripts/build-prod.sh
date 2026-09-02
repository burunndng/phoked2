#!/bin/bash
# Production build: compiles Next.js, flattens the standalone output
# (Next nests it due to multiple lockfiles upstream), and bundles the
# static assets into a self-contained dist/ directory.
#
# Result: dist/server.js runnable with `node dist/server.js`
# Note: the app is DB-free — curriculum data is static TypeScript.
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

echo "▶ Verifying…"
test -f dist/server.js || { echo "✗ dist/server.js missing"; exit 1; }

echo ""
echo "✅ Build complete."
echo "   Production server:  cd dist && node server.js"
echo "   Size:"
du -sh dist 2>/dev/null | cut -f1 | sed 's/^/                        /'
