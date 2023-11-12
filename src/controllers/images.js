import cloudinary from "../configs/cloudinaryConfig"

export const uploadImage = async (imageBuffer) => {
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload_stream(
            { folder: 'Movie-Review' }, // Đặt tên folder cần lưu trữ
            (error, result) => {
                if (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                } else {
                    console.log('Upload successful:', result);
                }
            }
        ).end(imageBuffer);
        const imageUrl = cloudinaryResponse.secure_url;
        return imageUrl;
    } catch (error) {

        throw ("Error", error);
    }
};


export const removeImages = async (req, res) => {
    try {
        // Lấy public ID của hình ảnh cũ từ yêu cầu hoặc từ cơ sở dữ liệu
        const oldImagePublicId = req.body.oldImagePublicId; // Thay bằng cách lấy public ID từ yêu cầu hoặc cơ sở dữ liệu
        console.log(oldImagePublicId);
        if (!oldImagePublicId) {
            return res.status(400).json({ message: "Old image public ID is required." });
        }

        // Xóa hình ảnh cũ từ Cloudinary
        const deletionResponse = await cloudinary.uploader.destroy(oldImagePublicId);

        if (deletionResponse.result === "ok") {
            return res.status(200).json({ message: "Old image deleted successfully." });
        } else {
            return res.status(500).json({ message: "Failed to delete old image." });
        }
    } catch (error) {
        console.error('Error removing old image:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};