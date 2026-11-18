# REVOR AI for Grok Build

Official REVOR AI plugin for company discovery, company research, and business contact search in Grok Build.

This repository contains the public plugin configuration and three skills. REVOR AI's hosted MCP service performs the research; the backend and datasets are not distributed with this plugin.

## Capabilities

| Skill | Purpose |
| --- | --- |
| `revor-company-discovery` | Build a persistent prospect list from an ideal customer profile and return qualified companies. |
| `revor-company-research` | Research a company using public sources and, when relevant, verified customs trade evidence. |
| `revor-contact-search` | Find role-focused business contacts at a verified company domain. |

Example requests:

- “Use Revor to find industrial automation distributors in Germany.”
- “Research this company with Revor and summarize its business and trading relationships.”
- “Find procurement contacts at example.com using Revor.”

## Install locally

Install [Grok Build](https://docs.x.ai/build), then clone this repository and load it as a local plugin:

```bash
git clone https://github.com/laiye-revor/revor-grok-plugin.git
grok --plugin-dir ./revor-grok-plugin
```

Open `/plugins` or `/skills` to inspect the plugin. Open `/mcps` to inspect the `revor` connection and authenticate through your browser. Sign in to your REVOR AI account and review the connection permissions.

This repository has not yet been listed in the official xAI marketplace. Local installation does not require a marketplace listing.

### Connect only the MCP server

If you only need tools without the bundled skills:

```bash
grok mcp add --transport http revor https://revor.ai/api/mcp
grok mcp doctor revor
```

Choose either the plugin's server or a manually configured server to avoid duplicate connections.

### Optional API key authentication

If you prefer an API key, create a suitably scoped key at [REVOR AI API Keys](https://revor.ai/my-api-keys). Set `REVOR_API_KEY` using your private shell environment or secret manager. In your user-level `~/.grok/config.toml`, configure:

```toml
[mcp_servers.revor]
url = "https://revor.ai/api/mcp"
headers = { "x-api-key" = "${REVOR_API_KEY}" }
```

The value above is a literal environment-variable reference. Never paste a key into chat, commit it, or put its actual value in a project configuration. Check `grok inspect` and `/mcps` to verify the loaded configuration and avoid duplicate servers. For initial diagnosis, use the MCP-only installation route above.

## Account, permissions, and credits

A REVOR AI account is required. Availability, rate limits, and charges depend on your account plan, permissions, and credits. Company searches, public-web research, contact searches, and customs reports may consume credits even though they do not send messages.

The three skills cover research workflows. The shared MCP service can also expose management and outreach tools according to the connection's permissions. This plugin does not itself impose a tool allowlist. Review and disable unused capabilities in your REVOR AI connection/API key settings; omitting an outreach skill does not revoke sending permissions.

## Network and data handling

- MCP endpoint: `https://revor.ai/api/mcp`.
- Browser authentication and OAuth discovery use the same `https://revor.ai` origin, including `/api/mcp-auth` and `/.well-known/` metadata routes. Browser sign-in may redirect to the identity provider you select.
- Credentials: an account-authorized OAuth connection, or an API key supplied privately in an authentication header.
- Queries, filters, company domains, and tool arguments are sent to REVOR AI for processing. Results can include public-source evidence and business contact information. Submit only data you are authorized to process.
- The plugin adds no local executable hooks, dependency installers, telemetry code, or credential-file readers. Hosted-service data handling is governed by REVOR AI's service terms and policies, available on [revor.ai](https://revor.ai).
- The MIT license covers this repository's plugin files. It does not grant access to the hosted service or redistribute its datasets.

## Validation and release status

Run the dependency-free package checks with Node.js 22 or later:

```bash
node scripts/validate.mjs
```

Checks cover the manifest, remote MCP configuration, skill metadata, local documentation links, and the expected package contents. They do not test authenticated service behavior.

Before submitting to the official marketplace, complete the [release checklist](docs/marketplace-submission.md), including an actual Grok Build OAuth and tool-call smoke test. Source preparation and a published GitHub repository do not imply marketplace approval or completed runtime testing.

## Links

- [REVOR AI](https://revor.ai)
- [MCP setup documentation](https://revor.ai/docs/mcp/install)
- [Report an issue](https://github.com/laiye-revor/revor-grok-plugin/issues)
- [Grok Build plugin documentation](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [Grok Build MCP documentation](https://docs.x.ai/build/features/mcp-servers)

## 中文说明

这是 REVOR AI 的 Grok Build 插件，提供企业发现、企业背调和联系人搜索三个 skill，复用现有远程 MCP 服务。

克隆仓库后运行 `grok --plugin-dir ./revor-grok-plugin`，在 `/mcps` 中通过浏览器登录并检查授权。研究任务可能消耗 Revor 积分；无需公开业务后端，也不要在聊天或仓库中填写密钥。

当前支持从本地目录加载，尚未上架官方市场。发布前仍需完成真实 Grok Build 授权和调用验收。
