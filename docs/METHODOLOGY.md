# Methodology

## Schema inference

For each column, the product measures non-missing values, numeric-conversion ratio, unique count, and unique proportion.
- Numeric columns require a strong numeric-conversion ratio and sufficient observations.
- Near-unique non-numeric columns are treated as identifiers.
- Yes/no and true/false style fields are treated as binary.
- Remaining fields are treated as categorical.

Schema inference is a convenience layer, not a substitute for domain-controlled data contracts.

## Descriptive statistics

Numeric profiles include count, minimum, maximum, mean, median, quartiles, interquartile range, sample standard deviation, skewness, and IQR outlier counts. Categorical profiles include frequency counts, mode, cardinality, and missingness.

## Association

- **Pearson correlation** is used for numeric-to-numeric linear association.
- **Eta-squared** estimates numeric separation across categorical target groups.
- **Cramer's V** summarizes categorical association.

These measures support exploration. They do not establish causality and can be distorted by data quality, sampling, nonlinearity, or confounding.

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

The selected target is protected from predictor encoding and scaling.

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
- target relevance;
- missingness penalty;
- low-variance penalty;
- numeric redundancy penalty;
- a small baseline for interpretability.

The target and target-derived features are excluded. Results are labeled **Keep**, **Review**, or **Drop** for fast exploration. This is not a substitute for nested cross-validation, stability selection, regularization, permutation importance, or domain review.

## Principal component analysis

PCA uses up to ten standardized numeric predictor features. The application:
1. standardizes the predictors;
2. builds the covariance matrix;
3. approximates the first eigenvector through power iteration;
4. deflates the covariance matrix;
5. approximates the second component;
6. projects rows into PC1/PC2 space;
7. reports approximate explained variance.

The target and target-derived columns are excluded. A production implementation should be validated against a reference linear-algebra library and include numerical-stability tests.

## Model readiness

The exported dataset is processed and reproducible, but final model readiness depends on:
- an explicit prediction target and business decision;
- leakage review;
- representative sampling;
- train/validation/test strategy;
- train-only preprocessing fit;
- task-appropriate metrics;
- bias, robustness, and drift evaluation.
