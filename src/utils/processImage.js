import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import AppError from './appError.js';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const processImage = async (
  file,
  options = { width: 1000, format: 'webp', quality: 80 },
) => {
  const { width, format, quality } = options;
  const filename = `${uuidv4()}.${format}`;
  const outputPath = path.join(UPLOAD_DIR, 'courses', filename);

  try {
    await fs.mkdir(path.join(UPLOAD_DIR, 'courses'), { recursive: true });

    await sharp(file.path)
      .resize({ width })
      .toFormat(format, { quality })
      .toFile(outputPath);

    await fs.unlink(file.path).catch(err => {
      if (err.code !== 'ENOENT') {
        console.warn(`Failed to delete original file: ${file.path}`, err);
      }
    });

    return filename;
  } catch (error) {
    await fs.unlink(outputPath).catch(() => {});
    throw new AppError(`Failed to process image: ${error.message}`, 500);
  }
};

export default processImage;
