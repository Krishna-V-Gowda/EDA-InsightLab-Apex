# Guided Demo

## 90-second version

1. Open the product and choose **Manufacturing Quality Process**.
2. Point to rows, columns, missingness, duplicates, outlier pressure, and data health.
3. Open the correlation heatmap or a scatter plot.
4. Create `Temperature_C / Pressure_bar` or an interaction feature.
5. Click **Build Complete Preprocessed Dataset**.
6. Run feature selection with `Yield_pct` as the target.
7. Run PCA and add PC columns.
8. Open Final Data Vault and export the processed CSV.

Close with:

> EDA InsightLab Apex does not stop at charts. It turns the reasoning before modeling into a guided, inspectable, and exportable product workflow.

## Five-minute version

### Problem
Raw data is rarely immediately model-ready. The highest-risk mistakes often occur in missingness, leakage, feature construction, and assumptions before modeling.

### Evidence
Show the profile, distribution, outlier, missingness, and correlation views. Explain one observation without claiming causality.

### Transformation
Create a feature and explain its possible domain meaning. Run preprocessing and show that the target is protected.

### Selection and reduction
Explain that feature ranking is a transparent screening heuristic. Run PCA and explain standardization, variance, and dimension reduction.

### Delivery
Download the final CSV, pipeline JSON, and Python template. Explain that the next step is leakage-safe model development with train-only fitting.

## Technical questions to expect

**Is this production-ready?**  
The complete browser workflow is functional. Production use needs validated libraries, automated statistical tests, secure persistence, access control, data lineage, and scalable compute.

**Where is AI?**  
The current product is an explainable statistical-discovery system. A responsible AI copilot is a roadmap feature that should be grounded in computed evidence and user approval.

**Does the score predict model accuracy?**  
No. It summarizes preprocessing readiness and data-quality signals. Model performance requires a real task, split strategy, cross-validation, and appropriate metrics.

**Why local-first?**  
It keeps the demonstration simple and avoids automatically transmitting uploaded CSV rows to a project-owned server.
