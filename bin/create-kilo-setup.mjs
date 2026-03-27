#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, cpSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SOURCE_DIR = resolve(__dirname, '..');

const EXPECTED_DIRS = [
  "agents",
  "skills",
  "subagents",
  "workflows",
  "modes",
  "github",
  "references",
];

const EXPECTED_FILES = [
  "README.md",
  "AGENTS.md",
];

const targetDir = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

if (targetDir.toLowerCase() === SOURCE_DIR.toLowerCase()) {
  console.log("Kilo toolkit: Source and target directory are the same. Nothing to copy.");
  process.exit(0);
}

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Create .kilocode directory at target for project configs
const targetKiloDir = join(targetDir, '.kilocode');
if (!existsSync(targetKiloDir)) {
  mkdirSync(targetKiloDir, { recursive: true });
}

// Copy directories to .kilocode/
for (const dir of EXPECTED_DIRS) {
  const sourcePath = join(SOURCE_DIR, dir);
  const targetPath = join(targetKiloDir, dir); // Move into .kilocode/
  
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, targetPath, { recursive: true });
  }
}

// Copy files to root of target
for (const file of EXPECTED_FILES) {
  const sourcePath = join(SOURCE_DIR, file);
  const targetPath = join(targetDir, file);
  
  if (existsSync(sourcePath)) {
    copyFileSync(sourcePath, targetPath);
  }
}

console.log(`Kilo toolkit template copied to ${targetDir}`);
console.log(`Kilo configs are placed in ${targetKiloDir}`);
