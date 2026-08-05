# Technical QA Record

## Verified public workflow

The release candidate was exercised through this path:

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

## Automated checks

Run:

```bash
python scripts/verify_public_build.py
node --check assets/js/app.js
```

## Release acceptance criteria

- No broken local asset references.
- No public academic/course/mentor branding.
- No file exceeds GitHub browser-upload limits used by this release package.
- Required metadata, navigation, main landmark, H1, and skip link are present.
- Desktop and mobile screenshots represent the released code.
