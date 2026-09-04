<p align="center">
  <img src="assets/brand/repository-banner.png" alt="EDA InsightLab Apex - Statistical Discovery Platform" width="100%">
</p>

<p align="center">
  <a href="https://krishna-v-gowda.github.io/EDA-InsightLab-Apex/"><strong>Launch the live product</strong></a>
  ·
  <a href="docs/EDA_InsightLab_Apex_Product_Deck.pdf"><strong>View the product deck</strong></a>
  ·
  <a href="docs/DEMO_GUIDE.md"><strong>Run the guided demo</strong></a>
  ·
  <a href="docs/verification/README.md"><strong>Inspect verification evidence</strong></a>
</p>

<p align="center"><code>v1.0.1</code> · <code>local-first</code> · <code>zero backend</code> · <code>MIT</code></p>

# EDA InsightLab Apex

**EDA InsightLab Apex is a local-first statistical discovery platform that turns raw tabular data into an explainable, exportable analytical workflow.** It brings profiling, visual diagnostics, preprocessing, feature engineering, target-aware feature selection, principal component analysis, quality reasoning, and final data export into one browser application.

The product is built around a simple principle:

> **Do not rush from raw data to a model. First make the data understandable, defensible, and reproducible.**

## Product at a glance

| Discover | Prepare | Engineer | Reduce | Deliver |
|---|---|---|---|---|
| Schema, missingness, duplicates, distributions, correlations | Imputation, deduplication, IQR guardrails, encoding, scaling | Ratios, interactions, polynomial signals, bins, one-hot and z-score features | Target-aware ranking and PCA | Processed CSV, pipeline JSON, Python code, analysis storyboard |

<p align="center">
  <img src="assets/screenshots/studio.png" alt="EDA InsightLab Apex data command center" width="49%">
  <img src="assets/screenshots/feature-engineering.png" alt="EDA InsightLab Apex feature engineering lab" width="49%">
</p>
<p align="center">
  <img src="assets/screenshots/feature-selection.png" alt="Target-aware feature selection" width="49%">
  <img src="assets/screenshots/pca.png" alt="Principal component analysis workspace" width="49%">
</p>

## Verified correction cycle

The v1.0.1 release is backed by a controlled exact-source experiment, not only screenshots or README claims. TrustBench executed the shipped browser functions against independent NumPy, SciPy, pandas, and scikit-learn references plus metamorphic invariants.

| Same 16 checks | Uploaded v1.0.0 | Hardened v1.0.1 |
|---|---:|---:|
| Pass | 7 | **15** |
| Definition divergence | 2 | **0** |
| Limitation | 4 | **1** |
| Failed invariant | 3 | **0** |
| High-priority non-pass | 4 | **0** |

The remaining low-severity boundary is explicit: missing-token recognition is deterministic but not yet configurable per dataset or column. Read the [experimental controls, reports, source hashes, and exact patch](docs/verification/README.md).

## Why it exists

Exploratory analysis is often fragmented across notebooks, one-off scripts, spreadsheets, and disconnected visualizations. That makes the reasoning difficult to follow and transformations difficult to reproduce. EDA InsightLab Apex turns the journey into a visible sequence:

```text
Raw CSV
  -> profile structure and data quality
  -> explore distributions and relationships
  -> clean with explicit rationale
  -> engineer domain-relevant signals
  -> rank predictors with leakage guards
  -> reduce correlated numeric dimensions with PCA
  -> export data, code, pipeline metadata, and narrative
```

## Core capabilities

### 1. Data Command Center
- CSV upload with local browser processing
- Built-in manufacturing, experimental-design, retail, startup, and student datasets
- Schema inference for numeric, categorical, binary, and identifier columns
- Missing-value, duplicate, cardinality, distribution, and outlier diagnostics
- Transparent data-health indicator with explicit limitations

### 2. Interactive visual diagnostics
- Histograms, box plots, scatter plots, bar charts, and line charts
- Correlation heatmap and missingness map
- Hover-level explanations and interpretation captions
- Searchable data preview and column-level profiles

### 3. Explainable preprocessing
- Numeric median and categorical mode imputation
- Exact-row deduplication
- IQR-based outlier capping as an optional guardrail
- Low-cardinality one-hot encoding for predictors
- Standardized predictor features
- Protected target variable to reduce target leakage risk

### 4. Feature Engineering Lab
- Ratio features
- Interaction features
- Squared/polynomial features
- Numeric bins
- One-hot encoded predictors
- Z-score features
- Transformation inventory and undoable workflow history

### 5. Feature Selection Observatory
- Automatic preferred target for each built-in dataset
- Pearson correlation for numeric-to-numeric relevance
- Eta-squared for numeric/categorical target-predictor pairings
- Raw, full-table Cramer's V for categorical associations
- Missingness, low-variance, and redundancy penalties
- Explicit keep/review/drop recommendations
- Exclusion of the target, recorded target derivatives, and exact raw target copies

### 6. PCA workspace
- Mean imputation followed by sample-standard-deviation scaling
- Power-iteration approximation for the first two principal components
- Explained-variance indicators
- PC1/PC2 projection and optional export
- Target and target-derived columns excluded; every eligible numeric predictor included

### 7. Final Data Vault
- Final processed CSV download
- Transformation pipeline JSON
- Generated, leakage-aware Python preprocessing template
- Analysis storyboard export
- Processed-data preview and readiness caveats

## Live demo

Open the deployed product:

**https://krishna-v-gowda.github.io/EDA-InsightLab-Apex/**

For the strongest walkthrough:

1. Load **Manufacturing Quality Process**.
2. Review data health, missingness, outliers, and correlations.
3. Create a ratio or interaction feature.
4. Build the complete processed dataset.
5. Run feature selection with `Yield_pct` as the target.
6. Run PCA and add PC columns.
7. Export the processed CSV and pipeline JSON.

A full script is available in [`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md).

## Architecture

<p align="center">
  <img src="assets/diagrams/architecture.png" alt="EDA InsightLab Apex system architecture" width="88%">
</p>

The current release is a **zero-backend static web application**. CSV data is parsed, profiled, visualized, transformed, and exported in the user's browser. No dataset is sent to a project-owned server.

```text
Browser UI
  -> local CSV parser
  -> schema and profile engine
  -> SVG visualization layer
  -> preprocessing and feature pipeline
  -> selection and PCA modules
  -> local downloads
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for component-level details.

## Quick start

### Option A - open directly

Download the repository and double-click `index.html`.

### Option B - serve locally

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

No package installation, API key, database, or backend is required.

## Repository structure

```text
EDA-InsightLab-Apex/
├── index.html                    # Product entry point
├── assets/
│   ├── brand/                    # Visual identity and social preview
│   ├── css/styles.css            # Responsive product design system
│   ├── js/app.js                 # Data, statistics, UI, and export logic
│   ├── diagrams/                 # Architecture and workflow visuals
│   └── screenshots/              # Verified product views
├── datasets/                     # Demonstration CSV files
├── docs/                         # Architecture, method, deck, verification evidence
├── tests/                        # Exact-source statistical invariants
├── scripts/verify_public_build.py
├── scripts/verify_release.sh     # One-command integrity + regression gate
├── .github/workflows/            # Quality checks and Pages deployment
├── CHANGELOG.md
├── ROADMAP.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

## Methodology and responsible interpretation

The product deliberately distinguishes between **working workflow features** and **production-grade statistical validation**.

- The health score and feature-readiness score are transparent heuristics, not scientific guarantees.
- Correlation describes association, not causation.
- IQR flags are diagnostics; they do not prove that a value should be removed.
- Feature selection is a fast, explainable screening layer and should be followed by domain review and cross-validation.
- PCA is calculated on standardized numeric predictors and is intended for exploration and dimensional compression.
- Final model development still requires a leakage-safe train/validation/test strategy, train-only fitting, suitable metrics, and monitoring.

Read the full method notes in [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) and limitations in [`docs/PRIVACY_AND_LIMITATIONS.md`](docs/PRIVACY_AND_LIMITATIONS.md).

## Privacy

The current version is local-first: uploaded CSV data remains in the browser tab. The project does not include analytics trackers, authentication, cloud persistence, or a project-owned data API. Users should still avoid loading confidential data on an untrusted device and should review downloaded artifacts before sharing them.

## Quality assurance

Quality is separated into three layers:

1. **Package integrity:** required files, local references, publication boundaries, accessibility fragments, and size guardrails.
2. **Exact-source regression:** seven dependency-free Node tests extract 27 declarations from the released `app.js` and protect the repaired ingestion, statistics, association, leakage, and PCA behavior.
3. **Independent verification:** TrustBench compares the exact browser source with scientific Python references and metamorphic properties, preserving both the baseline and post-repair reports.

Run the complete local gate:

```bash
./scripts/verify_release.sh
```

See [`docs/TECHNICAL_QA.md`](docs/TECHNICAL_QA.md) and [`docs/verification/`](docs/verification/) for the executed checks and interpretation limits.

## Roadmap

The next justified work is narrower than “add more features”:

- configurable missing-token and schema contracts;
- generated edge cases for parser and numerical behavior;
- semantic equivalence across browser state, CSV, pipeline JSON, and generated Python;
- visible PCA resource/convergence diagnostics;
- leakage-safe train/test workflow automation;
- server-side computation only when measured browser limits justify it.

See [`ROADMAP.md`](ROADMAP.md) for the staged plan.

## Contributing

Thoughtful issues, reproducible bug reports, documentation improvements, and well-scoped pull requests are welcome. Start with [`CONTRIBUTING.md`](CONTRIBUTING.md) and review the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Author

**Krishna V. Gowda**  
Computer science undergraduate working on analytical reliability, machine-learning systems, and quantitative computing.

- GitHub: [@Krishna-V-Gowda](https://github.com/Krishna-V-Gowda)
- Product: [EDA InsightLab Apex](https://krishna-v-gowda.github.io/EDA-InsightLab-Apex/)

## License

Released under the [MIT License](LICENSE).
