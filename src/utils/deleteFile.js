import fs from 'fs/promises';
import AppError from './appError.js';

const deleteFile = async filePath => {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log(`Deleted file: ${filePath}`);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`File not found, skipping deletion: ${filePath}`);
      return false;
    }
    throw new AppError(`Failed to delete file: ${filePath}`, 500);
  }
};

export default deleteFile;
