import { generateCaptionFromImageBuffer } from "../services/ai.service.js";
import { uploadFile } from "../services/cloudStorage.service.js";



export const createPost = async (req, res, next) => {
  const imageBuffer = req.file.buffer;
  const filedata = await uploadFile(imageBuffer);
  res.status(201).json({ filedata });
};
