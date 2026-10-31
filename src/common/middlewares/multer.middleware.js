import multer from "multer";

export const fileTypes = {
  images: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
  pdf: ["application/pdf"],
  video: ["video/mp4",]
}

export const upload = () => {
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()} - ${file.originalname}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    const allowTypes = ["image/jpg", "image/jpeg"];
    if (!allowTypes.includes(file.mimetype)) {
      return cb(new Error("invalid image"), false);
    }
    cb(null, true);
  };
  return multer({ storage, fileFilter });
};
