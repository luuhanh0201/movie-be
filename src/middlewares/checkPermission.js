import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();
const { SECRET_KEY } = process.env;
export const checkRole = async (req, res, next) => {
    try {
        console.log("Middleware");
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                message: "Bạn chưa đăng nhập!",
            });
        }
        // console.log("token: " + token)
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({
                message: "Token Error!",
            })
        }
        const user = await User.findById(decoded._id);
        console.log("Permission: " + user)
        if (!user) {
            return res.status(404).json({
                message: "User không tồn tại trong hệ thống!",
            });
        }
        // console.log(user)
        if (user.role === "member") {
            return res.status(403).json({
                message: "Bạn không có quyền hạn gì cả!"
            })
        }
        if (user.role === "manager" && req.body.role === "admin") {
            return res.status(403).json({
                message: "Bạn không có quyền này !"
            })
        }

        next()

    } catch (error) {
        return res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}