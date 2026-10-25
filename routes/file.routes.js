import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../controller/file.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { extractContent } from "../controller/Extraction.controller.js";
const routes=express.Router()

routes.post("/upload",authMiddleware,upload.single("file"), uploadFile)
routes.post("/extract",authMiddleware,upload.single("screenshort"), extractContent)

export default routes;