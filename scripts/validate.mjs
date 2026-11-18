import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => readFile(path.join(root, name), "utf8");
const manifest = JSON.parse(await read(".grok-plugin/plugin.json"));
assert.equal(manifest.name, "revor-ai");
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(manifest.license, "MIT");
assert.equal(manifest.repository, "https://github.com/laiye-revor/revor-grok-plugin");
assert.ok(manifest.description && manifest.author?.name);
assert.equal(new URL(manifest.homepage).hostname, "revor.ai");

const mcp = JSON.parse(await read(".mcp.json"));
assert.deepEqual(Object.keys(mcp.mcpServers), ["revor"]);
assert.deepEqual(mcp.mcpServers.revor, { type: "http", url: "https://revor.ai/api/mcp" });

const skills = ["revor-company-discovery", "revor-company-research", "revor-contact-search"];
assert.deepEqual((await readdir(path.join(root, "skills"))).sort(), [...skills].sort());
for (const name of skills) {
  const content = await read(`skills/${name}/SKILL.md`);
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  assert.ok(frontmatter, `${name}: missing frontmatter`);
  assert.ok(frontmatter[1].split(/\r?\n/).includes(`name: ${name}`), `${name}: incorrect name`);
  assert.match(frontmatter[1], /^description: .+/m);
  assert.ok(content.includes("../../references/mcp-workflows.md"), `${name}: missing workflow reference`);
  assert.doesNotMatch(content, /\b(?:TODO|TBD)\b/, `${name}: unfinished scaffold`);
}

// 发布门禁只允许声明式插件和可读源码；不把运行时调用或凭据探测放入校验。
async function validateFiles(directory = root) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (item.name === ".git") continue;
    assert.ok(!item.isSymbolicLink(), `Unexpected symlink: ${item.name}`);
    const absolute = path.join(directory, item.name);
    if (item.isDirectory()) {
      assert.ok(!["node_modules", "hooks"].includes(item.name), `Unexpected directory: ${item.name}`);
      await validateFiles(absolute);
      continue;
    }
    assert.ok(!item.name.startsWith(".env"), `Secret configuration must not ship: ${item.name}`);
    const content = await readFile(absolute, "utf8");
    assert.doesNotMatch(content, /sk-revor-[a-zA-Z0-9_-]{12,}/, `Possible credential: ${item.name}`);
    if (!item.name.endsWith(".md")) continue;
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      const local = path.resolve(directory, target.split("#")[0]);
      const relative = path.relative(root, local);
      assert.ok(relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), `Link escapes package: ${target}`);
      assert.ok((await stat(local)).isFile(), `Broken link: ${target}`);
    }
  }
}
await validateFiles();
for (const required of ["README.md", "LICENSE", "references/mcp-workflows.md", "docs/marketplace-submission.md"]) {
  assert.ok((await read(required)).trim(), `Missing content: ${required}`);
}
console.log(`Package valid: ${manifest.name} ${manifest.version}, ${skills.length} skills, 1 remote MCP server.`);
