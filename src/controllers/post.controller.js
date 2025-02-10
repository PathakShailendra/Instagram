import { generateCaptionFromImageBuffer } from "../services/ai.service.js";



export const createPost = async (req, res, next) => {
  const imageBuffer = req.file.buffer;
  const caption = await generateCaptionFromImageBuffer(imageBuffer);
  res.status(201).json({ caption });
};
