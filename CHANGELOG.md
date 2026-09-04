# Changelog

All notable changes to EDA InsightLab Apex are documented here. The project follows semantic versioning.

## [1.0.1] - 2026-09-03

### Corrected
- Preserved duplicate CSV fields by deterministically suffixing repeated headers.
- Replaced the mixed skewness formula with adjusted Fisher–Pearson skewness.
- Protected unique numeric columns with identifier-like names from measurement workflows.
- Reimplemented raw Cramer's V over complete sparse counts, removing encounter-order truncation.
- Added eta-squared relevance for categorical predictors against numeric targets.
- Excluded exact value copies of the target independently of names or recorded lineage.
- Standardized PCA after mean imputation and removed the silent ten-predictor cap.

### Verified
- Added seven dependency-free exact-source Node regression tests.
- Added one-command release verification through `scripts/verify_release.sh`.
- Preserved controlled TrustBench before/after reports, machine-readable evidence, source hashes, and the exact patch under `docs/verification/`.
- Improved the 16-case result from 7 passes, 2 divergences, 4 limitations, and 3 failed invariants to 15 passes, 0 divergences, 1 limitation, and 0 failed invariants.

### Remaining limitation
- Missing-token recognition is deterministic but not yet configurable by dataset or column.

## [1.0.0] - 2026-08-05

### Added
- Local-first CSV upload and five guided sample datasets.
- Automatic schema inference and dataset profiling.
- Missingness, duplicate, outlier, distribution, and correlation diagnostics.
- Interactive histogram, box, scatter, bar, line, heatmap, and missingness views.
- Explainable cleaning actions with transformation history.
- Ratio, interaction, squared, binned, one-hot, and standardized feature creation.
- Target-aware feature ranking with leakage guards.
- PCA projection with explained-variance indicators and PC export.
- Final processed CSV, pipeline JSON, Python template, and storyboard export.
- Responsive dark/light interface, command palette, and guided tour.
- GitHub Pages workflow and automated public-build checks.

### Improved
- Target variables are protected from predictor transformations.
- Target-derived columns are excluded from feature selection and PCA.
- Built-in datasets receive meaningful default targets.
- Long engineered-feature names stay contained within the feature inventory.
- Mobile horizontal overflow is eliminated.

### Known limitations
- Statistical routines are implemented for interactive education and prototyping, not regulated production use.
- Large datasets should be processed through a server-side or analytical-computing architecture.
- Feature-selection scores are screening heuristics, not estimates of predictive accuracy.
