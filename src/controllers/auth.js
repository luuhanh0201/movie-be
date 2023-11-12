import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"
import { validSignUp } from "../validates/account"
import { removeImages, uploadImage } from "./images"
dotenv.config()
const { SECRET_KEY } = process.env

export const signUp = async (req, res) => {
    try {
        const { error } = await validSignUp.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                messages: errors
            })
        }
        // Bước 2: Kiểm tra email đã tồn tại trong hệ thống hay chưa?
        const checkEmail = await User.findOne({ email: req.body.email })

        if (checkEmail) {
            return res.status(400).json({
                type: "Email",
                message: "Email này đã được đăng ký vui lòng đăng nhập!"
            })
        }
        // Bước 3: Mã hoá mật khẩu
        const hashPassword = await bcryptjs.hash(req.body.password, 10)

        // Bước 4: Tạo account cho người dùng:
        const user = await User.create({
            _id,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            avatar: req.body.avatar,
            numberPhone: req.body.numberPhone,
            role: req.body.role
        })


        // Bước 5: Trả về thông báo:
        user.password = undefined
        return res.status(200).json({
            message: "Tạo tài khoản thành công!",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: "catch: " + error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {

        // B2: Kiểm email có tồn tại trong database hay không?

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                message: "Email này chưa được đăng ký, bạn có muốn tạo tài khoản không?"
            })
        }

        // B3: So sánh password có đúng không?
        const isMatch = await bcryptjs.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                password: false,
                message: "Mật khẩu không đúng, vui lòng nhập lại!"
            })
        }
        // B4: Tạo jwt
        const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1d" })
        // B5: Response thông tin đăng nhập.
        user.password = undefined


        return res.status(200).json({
            message: "Đăng nhập thành công",
            user,
            accessToken
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const data = await User.find({})
        if (!data) {
            return res.status(404).json({
                message: "Users not found",
            })
        }
        const showUser = data.map(user => {
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                numberPhone: user.numberPhone,
                role: user.role,
            }
        });

        return res.status(200).json({
            message: " get users successfully",
            showUser

        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}
export const updateUser = async (req, res) => {
    try {
        console.log("Update");
        const { _id, email, ...updateData } = req.body;
        const data = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
        // console.log("data" + data);
        if (!data) {
            return res.status(404).json({
                message: "users not found",
            })
        }


        const base64String = req.body.avatar;
        const base64Data = base64String.replace(/^data:image\/(png|gif|jpg|jpeg);base64,/, "");
        const imageBuffer = Buffer.from(base64Data, "base64");

        const imageUrl = await uploadImage(imageBuffer);
        const user = {
            _id: data._id,
            username: data.username,
            email: data.email,
            numberPhone: data.numberPhone,
            address: data.address,
            role: data.role,
            avatar: imageUrl || data.avatar
        };
        if (imageUrl && data.avatar) {
            await removeImages(req, res, data.avatar);
        }
        return res.status(200).json({
            message: "Update successfully",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            name: "error",
            message: error.message
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const data = await User.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        data.password = undefined
        return res.status(200).json({
            message: "get one user",
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        if (!data) {
            return res.status(404).json({
                message: "user not found",
            })
        }
        return res.status(200).json({
            message: "delete one user",
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}