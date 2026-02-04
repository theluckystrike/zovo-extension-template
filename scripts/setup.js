#!/usr/bin/env node
/**
 * Zovo Extension Template - Interactive Setup Script
 * Customizes the template for a new extension
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  Skipping ${filePath} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  for (const [search, replace] of Object.entries(replacements)) {
    content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
  }

  fs.writeFileSync(filePath, content);
  console.log(`  Updated: ${path.basename(filePath)}`);
}

async function setup() {
  console.log('\n');
  console.log('  ╔═══════════════════════════════════════════╗');
  console.log('  ║                                           ║');
  console.log('  ║     Zovo Extension Template Setup         ║');
  console.log('  ║                                           ║');
  console.log('  ╚═══════════════════════════════════════════╝');
  console.log('\n');

  // Gather information
  const name = await ask('  Extension name (e.g., "Tab Manager"): ');
  const slug = await ask('  Slug (e.g., "tab-manager"): ');
  const benefit = await ask('  Primary benefit (e.g., "Save Memory & Organize Tabs"): ');
  const shortDesc = await ask('  Short description (max 132 chars): ');
  const category = await ask('  Category (productivity/utility/developer): ');

  // Validate
  if (!name || !slug) {
    console.error('\n  Error: Name and slug are required.');
    rl.close();
    process.exit(1);
  }

  console.log('\n  Setting up your extension...\n');

  // Define replacements
  const replacements = {
    '[EXTENSION_NAME]': name,
    '[EXTENSION_SLUG]': slug,
    '[Primary Benefit]': benefit || 'Boost Your Productivity',
    '[Short description under 132 characters - lead with problem/pain point]':
      shortDesc || `${name} helps you work smarter. Privacy-first, no tracking.`,
    'zovo-extension-template': `zovo-${slug}`,
  };

  // Update package.json
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.name = `zovo-${slug}`;
    pkg.description = shortDesc || `${name} - A Zovo Chrome Extension`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('  Updated: package.json');
  }

  // Update manifest.json
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    manifest.name = `${name}: ${benefit || 'Boost Productivity'} | Zovo`;
    manifest.description = shortDesc || `${name} helps you work smarter. Privacy-first.`;
    manifest.action.default_title = name;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log('  Updated: manifest.json');
  }

  // Update source files
  const filesToUpdate = [
    'src/popup/index.html',
    'src/popup/App.tsx',
    'src/options/index.html',
    'src/options/index.tsx',
    'src/background/index.ts',
    'src/content/index.ts',
    'src/onboarding/welcome.html',
    'README.md',
    'SETUP.md',
    'store/STORE_LISTING_TEMPLATE.md',
    'store/PRIVACY_POLICY_TEMPLATE.md',
  ];

  for (const file of filesToUpdate) {
    const filePath = path.join(process.cwd(), file);
    replaceInFile(filePath, replacements);
  }

  console.log('\n');
  console.log('  ╔═══════════════════════════════════════════╗');
  console.log('  ║           Setup Complete!                 ║');
  console.log('  ╚═══════════════════════════════════════════╝');
  console.log('\n');
  console.log('  Next steps:');
  console.log('');
  console.log('    1. Install dependencies:');
  console.log('       npm install');
  console.log('');
  console.log('    2. Generate icons:');
  console.log('       npm run icons');
  console.log('');
  console.log('    3. Start development:');
  console.log('       npm run dev');
  console.log('');
  console.log('    4. Load in Chrome:');
  console.log('       - Open chrome://extensions');
  console.log('       - Enable Developer Mode');
  console.log('       - Click "Load unpacked"');
  console.log('       - Select the dist/ folder');
  console.log('');
  console.log('  Happy building!');
  console.log('');

  rl.close();
}

setup().catch((err) => {
  console.error('Setup failed:', err);
  rl.close();
  process.exit(1);
});
