import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/files/');
  },
});

const uploadFile = multer({ storage });

const deleteFile = (filePath: string) => {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.log(error);
  }
};

export { uploadFile, deleteFile };
