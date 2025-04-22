import fs from 'fs/promises';
import path from 'path';

export const deleteFile = async filePath => {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
};
