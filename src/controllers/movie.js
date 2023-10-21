import Movie from "../models/Movie"

export const getAll = async (req, res) => {
    try {
        const data = await Movie.find({})
        if (!data) {
            return res.status(404).json({
                messenger: 'Movie not found',

            })
        }

        return res.status(200).json({
            messenger: 'Movie successfully',
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
        const data = await Movie.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: "Movie not found",
            })
        }
        return res.status(200).json({
            message: "Detail movie",
            data: data
        })
    } catch (error) {
        return res.status(404).json({
            messenger: 'error',
            name: error.message
        })
    }
}