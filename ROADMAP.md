# Product Roadmap

## Product principles

1. Keep the workflow explainable.
2. Make every transformation inspectable and exportable.
3. Separate analytical evidence from automated recommendation.
4. Treat privacy, leakage prevention, and reproducibility as product features.

## v1.1 - Validation and test coverage
- Unit tests for descriptive statistics, association measures, and PCA outputs.
- Golden-dataset comparisons against NumPy, pandas, SciPy, and scikit-learn.
- Stronger CSV parsing, schema overrides, and data-type controls.
- Improved accessibility and keyboard navigation.

## v1.2 - Task-aware modeling workspace
- Explicit regression/classification task setup.
- Leakage-safe train/validation/test split.
- Train-only preprocessing fit and transform.
- Baseline models with cross-validation and appropriate metrics.
- Explainable residual, calibration, and error-analysis views.

## v2.0 - Scalable analytical service
- Python/FastAPI computation layer.
- Larger dataset support and streaming previews.
- Project persistence, dataset versioning, and reproducible runs.
- Authentication, role controls, audit logs, and secure storage.
- Configurable pipelines using validated statistical libraries.

## v2.5 - Governed AI copilot
- Natural-language explanations grounded in computed statistics.
- Suggested transformations with evidence, uncertainty, and approval steps.
- Anomaly prioritization and narrative report drafting.
- Retrieval-grounded method guidance and source citations.
- Guardrails against unsupported claims and data leakage.

## v3.0 - Collaborative discovery platform
- Shared workspaces and review comments.
- Experiment tracking and model lineage.
- Data-source connectors and scheduled refreshes.
- Team templates for manufacturing, operations, customer analytics, and research.
