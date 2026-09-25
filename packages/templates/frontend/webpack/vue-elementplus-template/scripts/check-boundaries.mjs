#!/usr/bin/env node
// Verifies the workspace architecture rules by reading package.json files only.
// Zero dependencies. Rules are documented in docs/guides/dependency-rules.md.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const KINDS = ["apps", "packages", "tools"];
const FORBIDDEN_NAMES = new Set(["shared", "utils", "util", "common", "helpers", "misc"]);
const REQUIRED_SCRIPTS = {
  apps: ["dev", "build", "lint", "typecheck", "test"],
  packages: ["build", "lint", "typecheck", "test"],
  // tools/* holds dev-time config, not runtime code: it still honours the same
  // script contract so `pnpm -r <script>` behaves uniformly, but scripts are
  // allowed to be no-ops (see tools/config-eslint/package.json).
  tools: ["build", "lint", "typecheck", "test"],
};
const DEP_FIELDS = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

const errors = [];
const fail = (message) => errors.push(message);

// 1. The workspace globs must be exactly apps/* and packages/*.
//    Adding a new root (e.g. templates/) to the workspace is an architectural change.
const workspaceFile = readFileSync(join(root, "pnpm-workspace.yaml"), "utf8").split("\n");
const globs = [];
let inPackages = false;
for (const line of workspaceFile) {
  if (/^packages:\s*$/.test(line)) {
    inPackages = true;
    continue;
  }
  if (!inPackages) continue;
  const match = line.match(/^\s+-\s+["']?([^"'#\s]+)["']?/);
  if (match) globs.push(match[1]);
  else if (/^\S/.test(line)) inPackages = false;
}
const expectedGlobs = KINDS.map((kind) => `${kind}/*`);
if (globs.length !== expectedGlobs.length || !expectedGlobs.every((g) => globs.includes(g))) {
  fail(
    `pnpm-workspace.yaml: workspace globs must be exactly [${expectedGlobs.join(", ")}], found [${globs.join(", ")}]. ` +
      `Changing them is an architectural decision: update this script and add an ADR.`,
  );
}

// 2. Load projects.
const projects = [];
for (const kind of KINDS) {
  const dir = join(root, kind);
  if (!existsSync(dir)) continue;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = `${kind}/${entry.name}`;
    const pkgPath = join(dir, entry.name, "package.json");
    if (!existsSync(pkgPath)) {
      fail(`${path}: missing package.json`);
      continue;
    }
    projects.push({ kind, path, dirName: entry.name, pkg: JSON.parse(readFileSync(pkgPath, "utf8")) });
  }
}

const byName = new Map(projects.map((p) => [p.pkg.name, p]));
const scopes = new Set();

for (const project of projects) {
  const { kind, path, dirName, pkg } = project;

  // 3. Naming: "@scope/<directory name>", one scope for the whole repository.
  const match = typeof pkg.name === "string" && pkg.name.match(/^(@[^/]+)\/(.+)$/);
  if (!match) {
    fail(`${path}: package name must look like "@scope/${dirName}", found "${pkg.name}"`);
  } else {
    scopes.add(match[1]);
    if (match[2] !== dirName) fail(`${path}: package name "${pkg.name}" must end with "/${dirName}"`);
    if (kind === "packages" && FORBIDDEN_NAMES.has(match[2])) {
      fail(`${path}: "${match[2]}" is a forbidden package name. Name packages after a capability.`);
    }
  }

  // 4. Every project honours the same script contract, so each can run independently.
  for (const script of REQUIRED_SCRIPTS[kind]) {
    if (!pkg.scripts?.[script]) fail(`${path}: missing required script "${script}"`);
  }

  // 5. Packages document their responsibility.
  if (kind === "packages" && !existsSync(join(root, path, "README.md"))) {
    fail(`${path}: missing README.md (state what it is and is not responsible for)`);
  }

  // 6. Dependency direction: apps -> packages -> nothing internal upwards.
  for (const field of DEP_FIELDS) {
    for (const [depName, spec] of Object.entries(pkg[field] ?? {})) {
      const target = byName.get(depName);
      if (!target) continue;
      if (target === project) fail(`${path}: depends on itself`);
      if (!String(spec).startsWith("workspace:")) {
        fail(`${path}: internal dependency "${depName}" must use the workspace: protocol, found "${spec}"`);
      }
      if (target.kind === "apps") {
        fail(`${path}: must not depend on app "${depName}" (apps are never dependencies)`);
      }
      if (kind === "tools" && (target.kind === "apps" || target.kind === "packages")) {
        fail(`${path}: tools/* must not depend on ${target.kind}/* ("${depName}")`);
      }
    }
  }
}

if (scopes.size > 1) fail(`multiple package scopes in use: ${[...scopes].join(", ")}`);

// 7. No dependency cycles between internal projects.
const graph = new Map(
  projects.map((p) => [
    p.pkg.name,
    DEP_FIELDS.flatMap((field) => Object.keys(p.pkg[field] ?? {})).filter((name) => byName.has(name)),
  ]),
);
const visiting = new Set();
const done = new Set();
function visit(name, trail) {
  if (done.has(name)) return;
  if (visiting.has(name)) {
    fail(`dependency cycle: ${[...trail.slice(trail.indexOf(name)), name].join(" -> ")}`);
    return;
  }
  visiting.add(name);
  for (const next of graph.get(name) ?? []) visit(next, [...trail, name]);
  visiting.delete(name);
  done.add(name);
}
for (const name of graph.keys()) visit(name, []);

if (errors.length > 0) {
  console.error(`Boundary check failed (${errors.length}):\n`);
  for (const error of errors) console.error(`  x ${error}`);
  process.exit(1);
}
console.log(`Boundary check passed: ${projects.length} project(s), no violations.`);
