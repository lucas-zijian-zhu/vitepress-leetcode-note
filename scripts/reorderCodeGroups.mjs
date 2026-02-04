#!/usr/bin/env node

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ORDER = ["typescript", "kotlin", "java", "swift", "python"];
const CANONICAL = new Map([
  ["ts", "typescript"],
  ["typescript", "typescript"],
  ["kotlin", "kotlin"],
  ["java", "java"],
  ["swift", "swift"],
  ["py", "python"],
  ["python", "python"],
]);

async function main() {
  const { targets, dryRun } = parseArgs(process.argv.slice(2));
  if (targets.length === 0) {
    targets.push(path.resolve(process.cwd(), "docs"));
  }

  const files = new Set();
  for (const target of targets) {
    await collectMarkdownFiles(path.resolve(target), files);
  }

  if (files.size === 0) {
    console.log("No markdown files found.");
    return;
  }

  const stats = {
    filesScanned: 0,
    filesModified: 0,
    codeGroupsFound: 0,
    codeGroupsReordered: 0,
  };

  for (const file of [...files].sort()) {
    await processFile(file, dryRun, stats);
  }

  logSummary(stats, dryRun);
}

function parseArgs(args) {
  const targets = [];
  let dryRun = false;

  for (const arg of args) {
    if (arg === "--dry-run" || arg === "-n") {
      dryRun = true;
    } else {
      targets.push(arg);
    }
  }

  return { targets, dryRun };
}

async function collectMarkdownFiles(entry, files) {
  let entryStat;
  try {
    entryStat = await stat(entry);
  } catch {
    console.warn(`Skipping missing path: ${entry}`);
    return;
  }

  if (entryStat.isFile()) {
    if (entry.endsWith(".md") && !entry.includes(`${path.sep}.vitepress${path.sep}`)) {
      files.add(entry);
    }
    return;
  }

  if (!entryStat.isDirectory()) {
    return;
  }

  const entries = await readdir(entry, { withFileTypes: true });
  for (const dirent of entries) {
    if (dirent.name === ".vitepress" || dirent.name === "node_modules") {
      continue;
    }
    await collectMarkdownFiles(path.join(entry, dirent.name), files);
  }
}

async function processFile(file, dryRun, stats) {
  const original = await readFile(file, "utf8");
  const result = reorderCodeGroups(original);

  stats.filesScanned += 1;
  stats.codeGroupsFound += result.groupsFound;
  stats.codeGroupsReordered += result.groupsReordered;

  if (!result.changed) {
    return;
  }

  if (!dryRun) {
    await writeFile(file, result.content, "utf8");
  }

  stats.filesModified += dryRun ? 0 : 1;
  console.log(`${dryRun ? "[dry-run] " : ""}Reordered code groups in ${path.relative(process.cwd(), file)}`);
}

function reorderCodeGroups(content) {
  let groupsFound = 0;
  let groupsReordered = 0;
  let changed = false;

  const pattern = /(^[ \t]*)(:{3,4})\s*code-group([\s\S]*?)^\1\2\s*$/gm;

  const updated = content.replace(pattern, (match, indent, colons, body) => {
    groupsFound += 1;
    const replacement = reorderSingleGroup(indent ?? "", colons ?? "::::", body ?? "");

    if (replacement == null) {
      return match;
    }

    groupsReordered += 1;
    changed = true;
    return replacement;
  });

  return { content: updated, groupsFound, groupsReordered, changed };
}

function reorderSingleGroup(indent, colons, body) {
  const newline = body.includes("\r\n") ? "\r\n" : "\n";
  const blockRegex = /```([a-zA-Z0-9]+)([^\n]*)\n([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = blockRegex.exec(body)) !== null) {
    blocks.push({
      text: match[0],
      canonical: toCanonical(match[1]),
      index: blocks.length,
    });
  }

  if (blocks.length === 0) {
    return null;
  }

  const ordered = ORDER.flatMap((key) =>
    blocks.filter((block) => block.canonical === key),
  );
  const remaining = blocks.filter(
    (block) => !ORDER.includes(block.canonical ?? ""),
  );
  const combined = [...ordered, ...remaining];

  const changed = combined.some((block, idx) => block !== blocks[idx]);
  if (!changed) {
    return null;
  }

  const joined = combined.map((block) => block.text).join(`${newline}${newline}`);
  return `${indent}${colons} code-group${newline}${newline}${joined}${newline}${newline}${indent}${colons}`;
}

function toCanonical(lang) {
  if (!lang) {
    return null;
  }
  return CANONICAL.get(lang.toLowerCase()) ?? null;
}

function logSummary(stats, dryRun) {
  const prefix = dryRun ? "[dry-run] " : "";
  console.log(
    `${prefix}Scanned ${stats.filesScanned} files, found ${stats.codeGroupsFound} code groups, reordered ${stats.codeGroupsReordered}.`,
  );
  if (!dryRun) {
    console.log(`${prefix}Modified ${stats.filesModified} files.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
