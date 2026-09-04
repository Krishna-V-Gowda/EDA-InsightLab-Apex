# Privacy, Boundaries, and Limitations

## Privacy model

Uploaded datasets are held in browser memory. The project includes no project-owned backend, cloud database, user account, or analytics tracker. Exports are created with browser download APIs.

This design reduces unnecessary data transmission, but users remain responsible for:

- device security;
- browser extensions;
- local file permissions;
- screen sharing;
- downloaded artifacts;
- compliance with organizational policy.

## Current boundaries

- Best suited to small and medium tabular CSV datasets.
- Numeric parsing uses general browser-number conventions.
- The missing-token vocabulary is hard-coded; values such as `-` may be legitimate domain categories.
- Dates, nested JSON, geospatial values, images, and free text are not deeply modeled.
- Schema inference uses heuristics and does not replace data contracts or manual overrides.
- Statistical routines prioritize transparency and interaction over high-performance numerical computing.
- Health and readiness scores are heuristics.
- IQR outlier flags can identify valid rare events as well as errors.
- Raw Cramer's V is uncorrected and can be optimistic in small or sparse contingency tables.
- Association measures do not prove causation.
- Feature selection is a screening aid; exact target copies are blocked, but broader leakage classes still require review.
- PCA includes all eligible numeric predictors, returns only two components, and has no explicit wide-table resource guard or convergence residual.
- No model is trained in the current release.

## Verification boundary

The v1.0.1 exact-source suite protects seven repaired behaviors, and the independent TrustBench run reports 15 passes out of 16 checks. That evidence does not certify every input or the entire browser application. Current reports do not verify:

- all malformed CSV dialects;
- every floating-point edge case;
- transformation equivalence across UI state, CSV, JSON, and generated Python;
- DOM behavior across all browsers;
- accessibility conformance;
- large-file latency and memory limits;
- downstream predictive validity.

The complete before/after record is preserved in [`verification/`](verification/).

## Appropriate use

Use the product to:

- teach and demonstrate data-science workflow;
- inspect unfamiliar tabular data;
- prototype transformations;
- communicate analytical reasoning;
- export a starting point for validated downstream work.

Do not use the current release as the sole basis for medical, safety-critical, legal, credit, employment, or regulated decisions.
