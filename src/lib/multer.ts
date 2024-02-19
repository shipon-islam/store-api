import { Request } from "express";
import createError from "http-errors";
import multer, { diskStorage } from "multer";
import path from "path";

export const multerUploader = (
  maxFileSize: number,
  acceptedFileType: string[]
) => {
  const storage = diskStorage({
    // destination: (req, file, cb) => {
    //   const uploadFile = path.join(__dirname, `/../../public/${folder}`);
    //   cb(null, uploadFile);
    // },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const fileName = file.originalname.replace(extname, "");
      const uniqueFilename =
        fileName.replace(" ", "_") + "_" + Date.now() + extname;
      cb(null, uniqueFilename);
    },
  });
  const filefilter = (req: Request, file: any, cb: any) => {
    if (acceptedFileType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      //convert ["image/jpg","image/png"] to jpg,png
      const mimetype = acceptedFileType
        .join(",")
        .replace(new RegExp("image/", "gi"), "");
      cb(createError(`Only ${mimetype} format supported`));
    }
  };
  const uploader = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: { fileSize: maxFileSize },
  });
  return uploader;
};
