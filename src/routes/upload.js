import { Router } from "express";
import { uploadImages,removeImages } from "../controllers/images";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinaryConfig";
import multer from "multer";

const routerImages = Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images-movie-preview",
        format: "jpg"
    }
})

const upload = multer({ storage: storage })
routerImages.post("/upload", upload.array("images",10), uploadImages)
routerImages.post("/remove", removeImages)

export default routerImages