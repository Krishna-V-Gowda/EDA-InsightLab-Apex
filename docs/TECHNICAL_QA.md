# Technical QA Record

## Verification layers

The release uses three distinct gates rather than treating one smoke test as proof of correctness.

### 1. Public-package integrity

`python scripts/verify_public_build.py` checks required files, local references, public-copy boundaries, metadata/accessibility fragments, and file-size limits.

### 2. Exact-source regression tests

`node --test tests/*.test.mjs` extracts 27 declarations from the released `assets/js/app.js` into an isolated Node VM. The seven tests protect:

1. source fingerprint agreement and fail-closed extraction;
2. duplicate-header preservation and adjusted Fisher–Pearson skewness;
3. numeric identifier protection;
4. full-table, row-order-invariant Cramer's V;
5. target-aware categorical screening and exact target-copy exclusion;
6. all-column, mean-impute-then-scale PCA behavior;
7. the currently documented missing-token contract.

These tests exercise shipped functions rather than a parallel rewrite.

### 3. Independent differential and metamorphic verification

TrustBench runs the exact same browser source against NumPy, SciPy, pandas, and scikit-learn references and property checks. Under the controlled 16-case suite:

| Classification | Uploaded v1.0.0 | Hardened v1.0.1 |
|---|---:|---:|
| Pass | 7 | 15 |
| Definition divergence | 2 | 0 |
| Limitation | 4 | 1 |
| Failed invariant | 3 | 0 |
| High-priority non-pass | 4 | 0 |

The remaining limitation is the non-configurable missing-token vocabulary. Reports, JSON evidence, hashes, and the exact patch are stored in [`verification/`](verification/).

## Verified public workflow

The v1.0.1 source was also exercised through this product path:

1. Load the manufacturing dataset.
2. Confirm meaningful default target: `Yield_pct`.
3. Create ratio, interaction, and squared features.
4. Confirm feature-inventory containment with long names.
5. Run complete preprocessing.
6. Confirm target is not encoded or standardized as a predictor.
7. Run feature selection and confirm target-derived features are excluded.
8. Run PCA and add PC columns.
9. Open Final Data Vault and verify processed-data metadata.
10. Scan generated report text for removed academic branding.
11. Verify desktop and 390px mobile layouts have no horizontal overflow.
12. Verify JavaScript has no syntax errors.

## One-command local gate

```bash
./scripts/verify_release.sh
```

It executes the public-package verifier, JavaScript syntax checks, exact-source harness syntax checks, and all Node regression tests.

## Release acceptance criteria

- No broken local asset references.
- No public academic/course/mentor branding.
- No file exceeds the repository's browser-upload guardrail.
- Required metadata, navigation, main landmark, H1, and skip link are present.
- Exact-source regression tests pass.
- Independent evidence is regenerated when statistical behavior changes.
- Documentation names estimators, operation order, and remaining limitations.
- Desktop and mobile screenshots represent the released code.
