#!/usr/bin/env node
/**
 * Zovo Extension Template - Icon Generator
 * Converts SVG icons to PNG for Chrome extension
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');
const SIZES = [16, 48, 128];

async function generateIcons() {
  console.log('\n  Generating PNG icons from SVGs...\n');

  // Check if sharp is available
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('  Error: sharp is not installed. Run "npm install" first.');
    process.exit(1);
  }

  // Check if source SVG exists
  const sourceSvg = path.join(ICONS_DIR, 'icon-128.svg');
  if (!fs.existsSync(sourceSvg)) {
    console.error(`  Error: Source SVG not found: ${sourceSvg}`);
    process.exit(1);
  }

  for (const size of SIZES) {
    const pngPath = path.join(ICONS_DIR, `icon-${size}.png`);

    try {
      await sharp(sourceSvg)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      console.log(`  Created: icon-${size}.png`);
    } catch (err) {
      console.error(`  Error creating icon-${size}.png:`, err.message);
    }
  }

  console.log('\n  Done!\n');
}

generateIcons().catch((err) => {
  console.error('Icon generation failed:', err);
  process.exit(1);
});
