import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../utils/appError.js';

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ensureFolderExists = async folderPath => {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (_) {
    throw new AppError('Failed to create upload folder', 500);
  }
};

const createStorage = modelPath =>
  multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'uploads', modelPath);
      await ensureFolderExists(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = uuidv4();
      const extension = MIME_TYPES[file.mimetype] || 'bin';
      cb(null, `${uniqueName}.${extension}`);
    },
  });

const fileFilter = (req, file, cb) => {
  cb(
    MIME_TYPES[file.mimetype]
      ? null
      : new AppError(
          'Invalid file type. Only jpg, jpeg, png, webp allowed',
          400,
        ),
    !!MIME_TYPES[file.mimetype],
  );
};

const createUploader = modelPath =>
  multer({
    storage: createStorage(modelPath),
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
  });

export const uploadSingle = (fieldName, model = 'temp') => {
  const upload = createUploader(model);
  return (req, res, next) =>
    upload.single(fieldName)(req, res, err => (err ? next(err) : next()));
};
