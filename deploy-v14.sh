#!/usr/bin/env bash
# Deploy the /v14 "Warm Editorial × Kinetic" GSAP homepage to Vercel via push-to-Git.
#
# Run from the prepzy-next folder, on your own machine (where your GitHub
# credential is cached — this cannot run from Cowork, which has no token):
#
#   bash deploy-v14.sh          # SAFE: pushes a preview branch -> Vercel gives a Preview URL
#   bash deploy-v14.sh main     # pushes straight to production -> prepzy-ten.vercel.app/v14
#
# Stages only the v14 files + the shared, additive config changes
# (Fraunces font, new tokens, pz14 CSS, the gsap dependency). Your existing
# routes (/, /v6, /v13, ...) are untouched by these additive edits.
set -e
cd "$(dirname "$0")"

TARGET="${1:-preview}"

# 1. Clear any stale git lock (harmless if absent; you own it locally)
rm -f .git/index.lock 2>/dev/null || true

# 2. Make sure gsap is installed locally + the lockfile is in sync (Vercel uses npm ci)
if [ ! -d node_modules/gsap ]; then
  echo "Installing dependencies (gsap was added)..."
  npm install
fi

# 3. Commit identity (scoped to this repo only)
[ -z "$(git config user.email)" ] && git config user.email "joel.prakash@globuslearn.com"
[ -z "$(git config user.name)" ]  && git config user.name "Joel Prakash"

# 4. Files: the new v14 route + component, and the shared additive changes
FILES=(
  src/app/components/HomeV14.tsx
  src/app/v14
  src/app/globals.css
  src/app/layout.tsx
  src/prepzy-kit/styles/tokens.css
  package.json
  package-lock.json
)

# 5. Pick the target branch
if [ "$TARGET" = "main" ]; then
  git checkout main
  BRANCH=main
else
  BRANCH=v14-gsap
  git checkout -B "$BRANCH"
fi

# 6. Stage only the v14 work, commit, push
git add "${FILES[@]}"
git commit -m "Add v14 — Warm Editorial × Kinetic GSAP homepage (Fraunces + Poppins)" || echo "(nothing new to commit)"
git push -u origin "$BRANCH"

echo ""
echo "Pushed '$BRANCH'. Vercel builds in ~1-2 min."
if [ "$BRANCH" = "main" ]; then
  echo "Live at: https://prepzy-ten.vercel.app/v14"
else
  echo "Grab the Preview URL from the Vercel dashboard (or the PR) and add /v14 to it."
fi
