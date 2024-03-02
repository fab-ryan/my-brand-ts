import { FileFilterCallback } from 'multer';
import multer from 'multer';


export const filterFile = (file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


export const multerUploads = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb: FileFilterCallback) => {
    filterFile(file, cb);
  },
});
