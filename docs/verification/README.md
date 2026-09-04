# Statistical correctness transition — v1.0.1

This directory preserves the controlled verification cycle used to harden the browser-side statistical engine. It is evidence, not a retrospective marketing summary.

## Experimental control

Both runs used:

- the same 16 TrustBench checks;
- the same deterministic fixtures and tolerances;
- the same independent NumPy, SciPy, pandas, and scikit-learn references;
- the same exact-source Node adapter;
- `SOURCE_DATE_EPOCH=1788393600` for stable report timestamps;
- content hashes for the complete `assets/js/app.js` subject.

Only the Apex implementation changed.

| Result | Uploaded v1.0.0 source | Hardened v1.0.1 source |
|---|---:|---:|
| Pass | 7 | 15 |
| Definition divergence | 2 | 0 |
| Limitation | 4 | 1 |
| Failed invariant | 3 | 0 |
| High-priority non-pass | 4 | 0 |
| Source SHA-256 | `a15f8c9830c2…` | `51a9853d2a46…` |

The remaining item is intentionally not hidden: the import layer uses a deterministic but hard-coded missing-token vocabulary. Dataset- and column-level overrides are not yet available.

## Repaired behavior

The v1.0.1 patch:

1. preserves duplicate CSV fields through deterministic header suffixing;
2. names and implements adjusted Fisher–Pearson skewness;
3. protects unique numeric columns with identifier-like names;
4. computes raw Cramer's V across the complete observed contingency table without encounter-order truncation;
5. evaluates categorical predictors against numeric outcomes with eta-squared group separation;
6. blocks exact raw target copies independently of names or recorded feature lineage;
7. mean-imputes before sample scaling for PCA;
8. includes every eligible numeric predictor rather than silently stopping after ten.

## Evidence map

- [`trustbench-before-v1.0.1.md`](trustbench-before-v1.0.1.md) — human-readable baseline report.
- [`trustbench-before-v1.0.1.json`](trustbench-before-v1.0.1.json) — machine-readable baseline evidence.
- [`trustbench-after-v1.0.1.md`](trustbench-after-v1.0.1.md) — human-readable post-repair report.
- [`trustbench-after-v1.0.1.json`](trustbench-after-v1.0.1.json) — machine-readable post-repair evidence.
- [`transition-manifest.json`](transition-manifest.json) — hashes, methodology version, and result counts.
- [`statistical-correctness-v1.0.1.patch`](statistical-correctness-v1.0.1.patch) — exact source transition.

## Local regression gate

Apex ships a dependency-free Node regression layer that extracts declarations from the released `app.js` rather than testing a copied implementation:

```bash
./scripts/verify_release.sh
```

The independent cross-language reports require the separate TrustBench verifier and its scientific Python dependencies. Internal regression tests prevent known failures from returning; TrustBench provides independent differential and metamorphic evidence.

## Interpretation boundary

Fifteen passing fixtures do not prove correctness for every dataset. The reports explicitly leave browser interaction, generated-Python equivalence, complete transformation lineage, accessibility, and large-file performance outside this verification slice. Those require separate experiments rather than broader claims.
