const { likeMusicModel } = require("../../models")



const createLike = async (req, res) => {
    try {
        let save = await likeMusicModel.create(req.body)
        return res.status(200).json({ data: save, msg: null, code: 200 })
    }
    catch (error) {
        return error
    }
}

const deleteLike = async (req, res) => {
    try {
        let { musicId, userId } = req.body
        let deleted = await likeMusicModel.findOneAndDelete({ musicId, userId })

        if (!deleted) {
            return res.status(404).json({ msg: "Like not found", data: null, code: 404 })
        }

        return res.status(200).json({ msg: "Disliked successfully", data: deleted, code: 200 })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getLike = async (req, res) => {
    try {
        let data = await likeMusicModel.find({ userId: req.params.id }).populate("musicId").populate("userId")
        return res.status(200).json({ data: data, msg: null, code: 200 })
    }
    catch (error) {
        return error
    }
}


module.exports = { createLike, getLike, deleteLike }