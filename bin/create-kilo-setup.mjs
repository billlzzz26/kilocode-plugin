#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, cpSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SOURCE_DIR = resolve(__dirname, '..');

const EXPECTED_DIRS = [
  "agents",
  "skills",
  "workflows",
  "modes",
  "github",
  "references",
];

const EXPECTED_FILES = [
  "README.md",
  "AGENTS.md",
];

const arg = process.argv[2];
const subcommand = (arg === 'modes' || arg === 'skills' || arg === 'help' || arg === '-h' || arg === '--help') ? arg : null;
const targetDir = (!arg || arg.startsWith('-')) 
  ? process.cwd() 
  : (arg === 'modes' || arg === 'skills' || arg === 'help') 
    ? process.cwd() 
    : resolve(arg);

async function main() {
  if (subcommand === 'modes' || subcommand === 'skills') {
    await handleSubcommand(subcommand);
    return;
  }
  
  if (subcommand === 'help' || subcommand === '-h' || subcommand === '--help') {
    printHelp();
    return;
  }

  await copyTemplate(targetDir);
}

async function handleSubcommand(subcommand) {
  const action = process.argv[3];
  
  if (subcommand === 'modes') {
    await handleModes(action);
  } else if (subcommand === 'skills') {
    await handleSkills(action);
  }
}

async function handleModes(action) {
  const { BUILTIN_MODES } = await import('../packages/cli/src/modes.js');
  
  if (!action || action === 'list') {
    console.log('\n📋 Available Modes:');
    console.log('==================');
    BUILTIN_MODES.forEach(m => {
      console.log(`  ${m.slug.padEnd(20)} - ${m.description}`);
    });
    console.log('\nTo use a mode: /mode <slug>');
    return;
  }
  
  if (action === 'export') {
    const fs = await import('node:fs');
    const modesDir = join(SOURCE_DIR, 'modes');
    if (existsSync(modesDir)) {
      const files = fs.readdirSync(modesDir).filter(f => f.endsWith('.json'));
      console.log('\n📤 Exported modes to .kilocode/modes/:');
      files.forEach(f => console.log(`  - ${f}`));
    }
    return;
  }
  
  if (action === 'create' || action === 'init') {
    console.log('\n✨ Use this template to create a new mode:');
    console.log('---');
    const example = BUILTIN_MODES[0];
    console.log(JSON.stringify(example, null, 2));
    console.log('\nCreate file: modes/<your-mode>.json');
    return;
  }
  
  console.log(`Unknown mode action: ${action}`);
  console.log('Available: list, export, create');
}

async function handleSkills(action) {
  const { BUILTIN_SKILLS } = await import('../packages/cli/src/skills.js');
  
  if (!action || action === 'list') {
    console.log('\n🛠️  Available Skills:');
    console.log('===================');
    BUILTIN_SKILLS.forEach(s => {
      console.log(`  ${s.name.padEnd(20)} - ${s.description}`);
    });
    console.log('\nTo use a skill: /use <skill-name>');
    return;
  }
  
  if (action === 'create' || action === 'init') {
    console.log('\n✨ Use this template to create a new skill:');
    console.log('---');
    const example = BUILTIN_SKILLS[0];
    console.log(JSON.stringify(example, null, 2));
    console.log('\nCreate file: skills/<your-skill>/SKILL.md');
    return;
  }
  
  console.log(`Unknown skill action: ${action}`);
  console.log('Available: list, create');
}

async function copyTemplate(target) {
  if (target.toLowerCase() === SOURCE_DIR.toLowerCase()) {
    console.log("Kilo toolkit: Source and target directory are the same. Nothing to copy.");
    process.exit(0);
  }

  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  const targetKiloDir = join(target, '.kilocode');
  if (!existsSync(targetKiloDir)) {
    mkdirSync(targetKiloDir, { recursive: true });
  }

  for (const dir of EXPECTED_DIRS) {
    const sourcePath = join(SOURCE_DIR, dir);
    const destPath = join(targetKiloDir, dir);
    
    if (existsSync(sourcePath)) {
      cpSync(sourcePath, destPath, { recursive: true });
    }
  }

  for (const file of EXPECTED_FILES) {
    const sourcePath = join(SOURCE_DIR, file);
    const destPath = join(target, file);
    
    if (existsSync(sourcePath)) {
      copyFileSync(sourcePath, destPath);
    }
  }

  console.log(`Kilo toolkit template copied to ${target}`);
  console.log(`Kilo configs are placed in ${targetKiloDir}`);
}

function printHelp() {
  console.log(`
Kilo Toolkit CLI
================

Usage:
  kilo-toolkit [target-dir]           Copy template to target directory
  kilo-toolkit modes [action]         Manage modes (list, create, export)
  kilo-toolkit skills [action]        Manage skills (list, create)
  kilo-toolkit help                   Show this help

Examples:
  kilo-toolkit                        Copy to current directory
  kilo-toolkit my-app                 Copy to my-app directory
  kilo-toolkit modes list             List all available modes
  kilo-toolkit skills list            List all available skills
  kilo-toolkit modes create          Show mode creation template
`);
}

main().catch(console.error);