import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ep: {
        type: [Number],
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    trailer: {
        type: String,
        required: true,
    },
    ratting: {
        type: String,
        required: true,
    },
    film: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    }

})

export default mongoose.model("Movie", MovieSchema)