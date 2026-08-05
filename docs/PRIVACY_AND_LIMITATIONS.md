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
- Dates, nested JSON, geospatial values, images, and free text are not deeply modeled.
- Statistical routines prioritize transparency and interaction over high-performance numerical computing.
- Health and readiness scores are heuristics.
- IQR outlier flags can identify valid rare events as well as errors.
- Association measures do not prove causation.
- Feature selection is a screening aid.
- PCA is exploratory and limited to a subset of numeric predictors.
- No model is trained in the current release.

## Appropriate use

Use the product to:
- teach and demonstrate data-science workflow;
- inspect unfamiliar tabular data;
- prototype transformations;
- communicate analytical reasoning;
- export a starting point for validated downstream work.

Do not use the current release as the sole basis for medical, safety-critical, legal, credit, employment, or regulated decisions.
