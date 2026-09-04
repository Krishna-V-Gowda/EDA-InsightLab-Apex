#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

python3 scripts/verify_public_build.py
node --check assets/js/app.js
node --check tests/support/exact_source_runtime.mjs
node --test tests/*.test.mjs
printf 'Apex release verification passed.\n'
