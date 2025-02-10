import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 5 },
});


export const handleFileUpload = upload.single('image');