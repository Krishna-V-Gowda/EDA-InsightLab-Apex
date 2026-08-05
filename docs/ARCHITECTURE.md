# Architecture

## Current release

EDA InsightLab Apex is a static, zero-backend browser application.

```text
index.html
  -> product shell and semantic interface
assets/css/styles.css
  -> responsive design system and visual states
assets/js/app.js
  -> data generation, CSV parsing, profiling, charts,
     preprocessing, feature engineering, selection, PCA, exports
browser memory
  -> active dataset and transformation state
browser download APIs
  -> processed CSV, JSON pipeline, Python template, report
```

## Runtime sequence

1. The user selects a built-in dataset or uploads a CSV.
2. Rows are normalized into JavaScript objects.
3. The schema engine infers numeric, categorical, binary, and identifier columns.
4. The profile engine calculates quality diagnostics and descriptive statistics.
5. The visualization layer renders SVG charts and interpretation text.
6. Transformations update an in-memory dataset and append pipeline history.
7. Selection and PCA use predictor-only inputs with target-leakage guards.
8. Export modules create downloadable artifacts locally.

## State model

The application maintains:
- original data;
- active transformed data;
- inferred schema and profile;
- selected target;
- engineered feature inventory;
- cleaning/pipeline history;
- undo snapshots;
- PCA output;
- quiz and interface state.

## Privacy boundary

No uploaded row is intentionally transmitted by project code. External network access is only used when a user follows a link such as the GitHub repository. The application does not include analytics tracking or a data API.

## Production evolution

A production architecture should separate concerns:

```text
Web client
  -> authenticated API gateway
  -> validated preprocessing/statistics service
  -> asynchronous job queue for large data
  -> encrypted object storage and metadata database
  -> experiment registry and audit log
  -> monitoring, lineage, access control, retention policy
```

The server layer should use reference statistical libraries, schema contracts, test fixtures, task-aware train-only fitting, and reproducible versioned runs.
