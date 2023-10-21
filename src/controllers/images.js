import cloudinary from "../configs/cloudinaryConfig"

export const uploadImages = async (req, res) => {
    try {
        const images = req.files.map(file => file.path);

        const uploadedImages = []

        for (let image of images) {
            const results = await cloudinary.uploader.upload(image);
            console.log(results);
            uploadedImages.push({
                url: results.secure_url,
                publicId: results.public_id,
            });
        }
        return res.status(200).json({
            message: "Uploaded images successfully",
            datas: uploadedImages
        })
    } catch (error) {
        return res.status(404).json({
            messages: error.message
        })
    }
}
export const removeImages = async (req, res) => {

}