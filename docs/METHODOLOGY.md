# Methodology

## Schema inference

For each column, the product measures non-missing values, numeric-conversion ratio, unique count, and unique proportion.

- Numeric columns require a strong numeric-conversion ratio and sufficient observations.
- Near-unique nonnumeric columns are treated as identifiers.
- Near-unique numeric columns with identifier-like names such as `account_id`, `user_id`, UUID, GUID, or key fields are also protected as identifiers.
- Yes/no and true/false style fields are treated as binary.
- Remaining fields are treated as categorical.

Name-based identifier protection is deliberately conservative. It reduces accidental treatment of keys as measurements but can still produce false positives or miss domain-specific identifiers; user-controlled schema overrides remain planned.

## Missing-value semantics

The parser currently recognizes null values, blank strings, `NA`, `N/A`, `NULL`, `-`, and `?` as missing. This vocabulary is deterministic but not yet configurable by dataset or column. A dash can be a legitimate category in some domains, so the active policy must be reviewed before analysis.

## Descriptive statistics

Numeric profiles include count, minimum, maximum, mean, median, linearly interpolated quartiles, interquartile range, sample standard deviation (`ddof=1`), adjusted Fisher–Pearson skewness, and 1.5×IQR outlier counts. Categorical profiles include frequency counts, mode, cardinality, and missingness.

## Association

- **Pearson correlation** is used for numeric-to-numeric linear association on pairwise-complete values.
- **Eta-squared** estimates numeric separation across categorical groups. It is used in both numeric-predictor/categorical-target and categorical-predictor/numeric-target screening directions.
- **Raw, uncorrected Cramer's V** summarizes categorical association over the complete observed contingency table. It does not apply the small-sample bias correction.

These measures support exploration. They do not establish causality and can be distorted by data quality, sampling, nonlinearity, confounding, sparse categories, or small samples.

## Data-health indicator

The data-health value applies visible penalties for missing cells, exact duplicate rows, and numeric IQR outlier pressure. It is a product heuristic that helps prioritize review; it is not a certified data-quality standard.

## Preprocessing

The complete preprocessing action performs:

1. median imputation for numeric missing values;
2. mode imputation for categorical missing values;
3. exact-row deduplication;
4. optional IQR-fence capping for numeric extremes;
5. one-hot encoding of selected low-cardinality categorical predictors;
6. standardized copies of numeric predictors.

The selected target is protected from predictor encoding and scaling. For downstream modeling, preprocessing parameters must still be fitted on training data only.

## Feature engineering

The Feature Engineering Lab can create:

- ratios `A / B` with denominator guards;
- interactions `A * B`;
- squared features `A^2`;
- quantile-style numeric bins;
- one-hot indicator features;
- standardized z-score features.

Every feature is recorded in the visible inventory and pipeline history.

## Feature selection

The screening score combines:

- target relevance under a type-appropriate association measure;
- missingness penalty;
- low-variance penalty;
- numeric redundancy penalty;
- a small baseline for interpretability.

The target, name- or lineage-derived target features, and exact value copies of the target are excluded. Exact-copy detection does not cover every leakage mechanism: near-copies, monotonic encodings, post-outcome fields, temporal leakage, and externally derived proxies still require domain review.

Results are labeled **Keep**, **Review**, or **Drop** for fast exploration. This is not a substitute for nested cross-validation, stability selection, regularization, permutation importance, or domain review.

## Principal component analysis

PCA uses every eligible numeric predictor in the active browser dataset. The application:

1. mean-imputes missing numeric predictor values;
2. applies sample-standard-deviation scaling to the filled columns;
3. builds the covariance matrix;
4. approximates the first eigenvector through 80 fixed power iterations;
5. deflates the covariance matrix;
6. approximates the second component;
7. projects rows into PC1/PC2 space;
8. reports approximate explained variance.

The target and target-derived columns are excluded. The implementation is independently checked against a scikit-learn full-SVD reference on complete and missing-value fixtures, but it remains an educational browser implementation: only two components are returned, convergence diagnostics are not exposed, and very wide matrices do not yet have a visible resource guard.

## Verification status

The v1.0.1 source is covered by seven dependency-free exact-source regression tests and a separate 16-case TrustBench differential/metamorphic suite. The post-repair run records 15 passes, zero definition divergences, one low-severity limitation, and zero failed invariants. See [`verification/README.md`](verification/README.md) for hashes, fixtures, reports, and interpretation boundaries.

## Model readiness

The exported dataset is processed and reproducible, but final model readiness depends on:

- an explicit prediction target and business decision;
- leakage review;
- representative sampling;
- train/validation/test strategy;
- train-only preprocessing fit;
- task-appropriate metrics;
- bias, robustness, and drift evaluation.
