import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

// multer instance with configs
const uploader = multer().single('file');

// middleware to handle multer
const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  // multer instance
  uploader(req, res, (err) => {
    if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: err });
    } else {
      // Everything went fine.
      next();
    }
  });
};

export default fileUpload;
