const { albumModel } = require("../../models")
const { uploadFile } = require("../../utils/function")


const createAlbum = async (req, res) => {
    try {
        let { title, artist, category } = req.body
        let image = req.file
        let imageUrl = await uploadFile(image)
        let data = await albumModel.create({title, artist, category,image: imageUrl})
        if (data) {
            return res.status(200).json({ msg: null, data: data, code: 200 })
        }

    }
    catch (error) {
        console.log(error)
        return
    }
}

const getAlbum = async (req, res) => {
    try {
        let music = await albumModel.find({}).populate("artist").populate("category")
        return res.status(200).json({ msg: null, data: music, code: 200 })
    }
    catch (error) {
        return error
    }
}

const getSingleAlbum = async (req, res) => {
    try {
        let music = await albumModel.findById(req.params.id).populate("artist").populate("category")
        return res.status(200).json({ msg: null, data: music, code: 200 })
    }
    catch (error) {
        return error
    }
}

const getAlbumByCategory = async (req, res) => {
    try {
        let music = await albumModel.find({ category: req.params.id }).populate("artist").populate("category")
        return res.status(200).json({ msg: null, data: music, code: 200 })
    }
    catch (error) {
        return error
    }
}

const getAlbumByArtist = async (req, res) => {
    try {
        let music = await albumModel.find({ artist: req.params.id }).populate("artist").populate("category")
        return res.status(200).json({ msg: null, data: music, code: 200 })
    }
    catch (error) {
        return error
    }
}


module.exports = { createAlbum, getAlbum, getSingleAlbum, getAlbumByArtist, getAlbumByCategory }