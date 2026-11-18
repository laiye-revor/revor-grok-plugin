---
name: revor-company-discovery
description: Find and qualify target companies, prospects, suppliers, or buyers with REVOR AI from an ideal customer profile, geography, industry, or business criteria.
---

# Revor company discovery

Read [the MCP workflow](../../references/mcp-workflows.md) for authentication, tool naming, idempotency, polling, and error handling.

Translate the user's requested geography, product, industry, business model, and qualification criteria into a clear natural-language query. Ask only for a missing constraint that materially changes the search; preserve all supplied exclusions.

Use `revor_create_prospect_list` with `target_kind: "company"`, the query, locale when useful, and a stable `idempotency_key`. Supported counts are 25, 100, 500, and 1000, subject to the account plan. Do not silently round a requested count up to a larger paid search; explain the supported size or omit `count` to use the service default when the user has not specified one.

Save `webset.id`. Check `revor_get_prospect_list` for discovery progress, and use `revor_get_prospect_search_plan` if the criteria or plan need inspection. Do not treat the preparation job's completion as search completion or repeatedly create lists.

Read results with `revor_list_prospects`, passing `webset_id`, `match: "qualified"`, and an appropriate `detail`. Page using the returned cursor. Limits are 50 for compact detail, 25 for standard, and 10 for full evidence.

Return companies directly with their domains, supported fit explanations, and evidence links when available. Label partial results while discovery is still running. Do not equate candidate presence with verified qualification, promise an exact result count, automatically start Find More, or perform contact lookup or outreach unless separately requested.
