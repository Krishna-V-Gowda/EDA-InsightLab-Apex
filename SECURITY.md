# Security Policy

## Supported version

Security and privacy fixes are applied to the latest release on the `main` branch.

## Reporting a vulnerability

Please do not publish exploitable details in a public issue. Contact the maintainer through the email associated with the GitHub profile and include:
- affected file or workflow;
- reproduction steps;
- impact;
- suggested mitigation, if available.

## Data-handling model

The current product processes uploaded CSV data locally in the browser and does not include a project-owned backend. This reduces transmission risk but does not make every device or browser trustworthy. Do not load confidential data on a shared or compromised machine.

## Secrets

This repository must never contain credentials, tokens, private keys, confidential datasets, or personal data. Revoke any exposed secret immediately and remove it from Git history.
