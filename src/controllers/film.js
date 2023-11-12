import Film from "../models/Film"


export const getAll = async (req, res) => {
    try {
        const data = await Film.find({})
        if (!data) {
            return res.status(404).json({
                messenger: 'Film not found',

            })
        }

        return res.status(200).json({
            messenger: 'Film successfully',
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            messenger: 'error',
            name: error.message
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const data = await Film.findById(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: "Film not found",
            })
        }
        return res.status(200).json({
            message: "Detail Film",
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            messenger: 'error',
            name: error.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const data = await Film.create(req.body)
        if (!data) {
            return res.status(404).json({
                message: "Add product failed",
            })
        }
        return res.status(200).json({
            message: "Create film successfully",
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const update = async (req, res) => {
    try {
        const data = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!data) {
            return res.status(404).json({
                message: "Film not found",
            })
        }
        return res.status(200).json({
            message: "Update successfully",
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
        const data = await Film.findByIdAndDelete(req.params.id)
        if (!data) {
            return res.status(404).json({
                message: "Film not found",
            })
        }
        return res.status(200).json({
            message: "Delete successfully",
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}