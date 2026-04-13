import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const publicDir = './public';

async function getImageDimensions() {
  const files = await readdir(publicDir);
  const webpFiles = files.filter(f => f.endsWith('.webp'));

  console.log('Image Dimensions:\n');

  for (const file of webpFiles.sort()) {
    try {
      const metadata = await sharp(join(publicDir, file)).metadata();
      console.log(`"${file}": { width: ${metadata.width}, height: ${metadata.height} },`);
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  }
}

getImageDimensions().catch(console.error);
