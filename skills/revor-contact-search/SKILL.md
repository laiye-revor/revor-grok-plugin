---
name: revor-contact-search
description: Find business contacts and decision-makers at a verified company domain through REVOR AI, including role-focused work emails and LinkedIn profiles when available.
---

# Revor contact search

Read [the MCP workflow](../../references/mcp-workflows.md) for authentication, tool naming, idempotency, polling, and error handling.

Use a company domain explicitly supplied by the user or supported by reliable company evidence. If only a company name is provided, resolve its official identity and employee domain with `revor_research_public_web`; ask for clarification if a same-name match remains ambiguous. Do not guess a domain from the company name.

Call `revor_find_contacts` with `domain`, relevant role terms in `positions`, a requested `limit` between 1 and 50 when provided, locale when useful, and a stable `idempotency_key`. Use the actual connected schema. Poll the returned job only while needed.

Return concise results containing name, role, company, business email, LinkedIn URL, and source or verification context only when returned. State missing fields and distinguish supported role matches from uncertain ones. Never infer an email pattern, invent a contact, or label a returned email as verified without evidence.

Do not send messages, invitations, or emails as part of contact search.
