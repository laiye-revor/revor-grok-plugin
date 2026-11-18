---
name: revor-company-research
description: Research a company with REVOR AI public-web evidence and relevant customs trade data for background checks, supplier or buyer diligence, and meeting preparation.
---

# Revor company research

Read [the MCP workflow](../../references/mcp-workflows.md) for authentication, tool naming, idempotency, polling, and error handling.

Start with `revor_research_public_web`. Supply one or two focused `queries`, including the user's exact company name or domain, plus a stable `idempotency_key`. Resolve the official identity, location, domain, products, business model, and evidence relevant to the user's question. Disambiguate same-name businesses before combining records.

For a general business summary, public evidence may be sufficient. Add customs research when trade activity is relevant to the question or the user requests it:

1. Choose an explicit date range and distinguish `company_role` (the subject is importer or exporter in a trade row) from `catalog` (imports or exports data directory). They are independent: an exporter can appear in destination-country import records. Use the user's dates, or the latest rolling year if unspecified.
2. Call `revor_customs_company_candidates` with the supported company name, role, catalog, dates, and relevant filters. Catalog comparison is coverage evidence; it does not automatically select the paid report route.
3. Match candidate identity against public evidence. Before a paid report, require a positive exact-filter count for the chosen name, role, catalog, dates, and filters. A count alone does not establish legal identity.
4. Use `revor_customs_full_report` for the verified route, preserving the exact name and filters. Prefer one full report over overlapping section calls. Never silently change route or filters after candidate verification.

If no reliable customs match exists, state that coverage limit. Missing customs data is not proof of business risk or absence of trade.

Return a decision-oriented report in the user's language, citing sources and separating facts, inference, and unresolved questions. Research contacts only when useful to the user's requested scope, using a verified company domain with `revor_find_contacts`. Do not contact anyone or start outreach.
