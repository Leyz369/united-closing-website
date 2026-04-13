import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const publicDir = './public';
const maxSizeKB = 500;
const quality = 80;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const fileName = basename(filePath, ext);
  const outputPath = join(publicDir, `${fileName}.webp`);

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  try {
    const stats = await stat(filePath);
    const sizeKB = stats.size / 1024;

    console.log(`Processing: ${basename(filePath)} (${sizeKB.toFixed(0)} KB)`);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    let resizeWidth = metadata.width;
    if (sizeKB > maxSizeKB) {
      const scaleFactor = Math.sqrt(maxSizeKB / sizeKB);
      resizeWidth = Math.floor(metadata.width * scaleFactor);
    }

    await image
      .resize(resizeWidth, null, { withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    const newStats = await stat(outputPath);
    const newSizeKB = newStats.size / 1024;

    console.log(`  ✓ Converted to WebP: ${newSizeKB.toFixed(0)} KB (${((1 - newSizeKB / sizeKB) * 100).toFixed(1)}% reduction)`);

  } catch (error) {
    console.error(`  ✗ Error processing ${basename(filePath)}:`, error.message);
  }
}

async function processDirectory() {
  console.log('Starting image optimization...\n');

  const files = await readdir(publicDir);

  for (const file of files) {
    const filePath = join(publicDir, file);
    const stats = await stat(filePath);

    if (stats.isFile()) {
      await optimizeImage(filePath);
    }
  }

  console.log('\nOptimization complete!');
}

processDirectory().catch(console.error);
