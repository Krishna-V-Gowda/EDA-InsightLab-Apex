# Contributing to EDA InsightLab Apex

Thank you for helping improve the project.

## Before opening an issue
- Search existing issues.
- Reproduce the problem with a built-in dataset where possible.
- Record browser, operating system, dataset size, and exact steps.
- Remove confidential or personally identifiable data from examples.

## Development setup

```bash
git clone https://github.com/Krishna-V-Gowda/EDA-InsightLab-Apex.git
cd EDA-InsightLab-Apex
python -m http.server 8000
```

Open `http://localhost:8000`.

## Quality checks

```bash
python scripts/verify_public_build.py
node --check assets/js/app.js
```

Then test at minimum:
1. Load the manufacturing dataset.
2. Create a ratio feature.
3. Run complete preprocessing.
4. Run feature selection.
5. Run PCA and add PC columns.
6. Export the processed CSV.
7. Check desktop and mobile layouts.

## Pull-request expectations
- Keep changes focused and explain the user problem.
- State the statistical or product rationale.
- Add or update documentation.
- Include before/after screenshots for interface changes.
- Describe limitations and edge cases.
- Never commit real confidential datasets, credentials, API keys, or personal data.

## Commit style

Use clear, imperative commits:

```text
feat: add schema override controls
fix: protect selected target during encoding
docs: clarify PCA assumptions
test: add public asset validation
```
