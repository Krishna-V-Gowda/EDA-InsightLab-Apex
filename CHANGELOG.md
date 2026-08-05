# Changelog

All notable changes to EDA InsightLab Apex are documented here. The project follows semantic versioning.

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
