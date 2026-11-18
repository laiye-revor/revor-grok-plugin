# REVOR AI for Grok Build

The official [REVOR AI](https://revor.ai) plugin for Grok Build. Discover target companies, research businesses, and find decision-makers directly from your conversation.

## Capabilities

| Skill | Description |
| --- | --- |
| `revor-company-discovery` | Find and qualify companies by industry, geography, business model, and ideal customer profile. |
| `revor-company-research` | Research company backgrounds, products, markets, and trading relationships using public sources and customs data. |
| `revor-contact-search` | Identify relevant business contacts, with work emails and LinkedIn profiles where available. |

Example requests:

- “Use Revor to find industrial automation distributors in Germany.”
- “Research Siemens with Revor and summarize its business and trading relationships.”
- “Find procurement contacts at example.com using Revor.”

## Installation

With [Grok Build](https://docs.x.ai/build) installed, clone the repository and load the plugin:

```bash
git clone https://github.com/laiye-revor/revor-grok-plugin.git
grok --plugin-dir ./revor-grok-plugin
```

Open `/mcps`, select `revor`, and sign in to your REVOR AI account through the browser. The bundled skills are available in `/skills`.

### MCP-only setup

To connect the REVOR AI MCP server directly:

```bash
grok mcp add --transport http revor https://revor.ai/api/mcp
grok mcp doctor revor
```

Use this as an alternative to the bundled plugin connection.

### Optional API key authentication

Create a key at [REVOR AI API Keys](https://revor.ai/my-api-keys) and set it as `REVOR_API_KEY` in your environment or secret manager. Add the following to your user-level `~/.grok/config.toml`:

```toml
[mcp_servers.revor]
url = "https://revor.ai/api/mcp"
headers = { "x-api-key" = "${REVOR_API_KEY}" }
```

Grok resolves `${REVOR_API_KEY}` from your environment. Keep the key out of chat messages and source control.

## Service access

A REVOR AI account is required. Research and discovery tasks may consume credits. Feature availability and usage limits depend on your plan and connection permissions.

Manage permitted capabilities in your REVOR AI connection or API key settings. The shared MCP service may expose additional account-management and outreach tools when enabled for your connection.

## Connection and data

The plugin connects to `https://revor.ai/api/mcp` using OAuth or an API key. OAuth discovery and authorization use `https://revor.ai/.well-known/` and `https://revor.ai/api/mcp-auth`; browser sign-in may use your selected identity provider.

Queries, filters, company domains, and tool arguments are sent to REVOR AI for processing under its service terms and policies. Results may include public-source evidence, customs records, and business contact information.

## Documentation and support

- [REVOR AI](https://revor.ai)
- [MCP setup documentation](https://revor.ai/docs/mcp/install)
- [Report an issue](https://github.com/laiye-revor/revor-grok-plugin/issues)

## License

[MIT](LICENSE). The license applies to the plugin files in this repository. Access to REVOR AI services and data is subject to the applicable service terms.
