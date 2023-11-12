import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: false
    },
    numberPhone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "member",
        required: false
    },
    description:{
        type: String,
        required: false
    }

}, {
    timestamps: true, versionKey: false
})

export default mongoose.model('User', userSchema)