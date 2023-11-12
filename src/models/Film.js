import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    typeFirm: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    film: {
        type: String,
        required: true
    },
    ep: {
        type: Number,
        required: true
    },
    userRating: {
        type: Number,
        required: false
    },
    releaseDate: {
        type: String,
        required: false
    },
    view: {
        type: Number,
        default: 0,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    idCategory: {
        type: String,
        required: true
    },
    idComments: {
        type: String,
        required: false
    }

}, { version: true, timestamps: true })

export default mongoose.model("Film", MovieSchema)