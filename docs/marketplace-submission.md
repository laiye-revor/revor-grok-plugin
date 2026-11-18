# Marketplace release checklist

This plugin targets [Grok Build's official marketplace](https://github.com/xai-org/plugin-marketplace). Publishing this source repository alone does not list the plugin.

## Runtime acceptance

Complete these checks in a real Grok Build session before submitting:

- Install the plugin with `grok plugin install <path-or-git-url>`, inspect all three skills and the `revor` server.
- Complete browser OAuth, then check tool discovery and a lightweight account/credits read using a tool actually exposed by the server.
- With an account authorized to incur research charges, run one company research task and one prospect discovery task. Confirm result retrieval and the distinct prospect preparation/search lifecycles.
- Check that unauthorized, insufficient-permission, and insufficient-credit responses are surfaced without duplicate creation calls. Exercise these only with dedicated test credentials or existing error states; do not change production account data just to induce errors.
- If documenting API key support, verify the environment-variable header configuration privately and confirm that logs do not expose credentials.
- Review connection permissions, particularly any sending or account-management capabilities exposed by the shared service.

These are release gates, not claims that runtime acceptance has already passed. This repository's CI validates the package only.

## Submit the catalog entry

Follow the current upstream [CONTRIBUTING.md](https://github.com/xai-org/plugin-marketplace/blob/main/CONTRIBUTING.md). Fork the marketplace and add an entry to `.grok-plugin/marketplace.json` using this shape, replacing `sha` with the full lowercase 40-character commit hash you actually tested:

```json
{
  "name": "revor-ai",
  "description": "Find target companies, research businesses with public-web and customs evidence, and identify business contacts through REVOR AI.",
  "source": {
    "source": "url",
    "url": "https://github.com/laiye-revor/revor-grok-plugin.git",
    "sha": "FULL_40_CHARACTER_TESTED_COMMIT_SHA"
  },
  "homepage": "https://revor.ai",
  "keywords": ["revor", "revor ai", "revor.ai"],
  "domains": ["revor.ai"]
}
```

Get the published commit using:

```bash
git ls-remote https://github.com/laiye-revor/revor-grok-plugin.git HEAD
```

In the marketplace checkout, run:

```bash
python3 scripts/generate-plugin-index.py
python3 scripts/validate-catalog.py
python3 scripts/generate-plugin-index.py --check
```

Commit both the catalog change and generated component index. Open the PR using upstream's template and report actual validation results, including runtime gaps. Updates require a new pinned SHA and regenerated index.
