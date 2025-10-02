const { uploadFile } = require("../../utils/function")
const { musicModel, likeMusicModel } = require("../../models")

const attachLikes = async (musicArray) => {
    return Promise.all(musicArray.map(async (m) => {
        let likes = await likeMusicModel.find({ musicId: m._id }, "userId")
        let likeUsers = likes.map(l => l.userId)
        return {
            ...m._doc,
            likes: likes.length,
            likeUsers
        }
    }))
}

const createMusic = async (req, res) => {
    try {
        let { title, description, artist, category, listners, album, musicType, user_id, genre, release_date, icrc_code, lyrics } = req.body
        if (req?.files?.image?.[0] && req?.files?.song?.[0]) {
            let image = req.files.image[0]
            let song = req.files.song[0]

            let imageUrl = await uploadFile(image)
            let musicUrl = await uploadFile(song)

            let data = await musicModel.create({
                user_id, genre, release_date, icrc_code, lyrics, title, description, artist, listners,
                category, coverImage: imageUrl, music: musicUrl, album, musicType
            })

            if (data) {
                return res.status(200).json({ msg: null, data: data, code: 200 })
            }
        } else {
            return res.status(400).json({ data: null, msg: "Please upload image and audio", code: 400 })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

const getMusic = async (req, res) => {
    try {
        let music = await musicModel.find({})
            .populate("artist")
            .populate("category")
            .populate("album")
            .populate("user_id")

        let musicWithLikes = await attachLikes(music)

        return res.status(200).json({ msg: null, data: musicWithLikes, code: 200 })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getSingleMusic = async (req, res) => {
    try {
        let music = await musicModel.findById(req.params.id)
            .populate("artist")
            .populate("category")
            .populate("album")

        if (!music) return res.status(404).json({ msg: "Music not found", data: null, code: 404 })

        let likes = await likeMusicModel.find({ musicId: music._id }, "userId")
        let likeUsers = likes.map(l => l.userId)

        return res.status(200).json({
            msg: null,
            data: { ...music._doc, likes: likes.length, likeUsers },
            code: 200
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getMusicByCategory = async (req, res) => {
    try {
        let music = await musicModel.find({ category: req.params.id })
            .populate("artist")
            .populate("category")
            .populate("album")

        let musicWithLikes = await attachLikes(music)

        return res.status(200).json({ msg: null, data: musicWithLikes, code: 200 })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getMusicByArtist = async (req, res) => {
    try {
        let music = await musicModel.find({ artist: req.params.id })
            .populate("artist")
            .populate("category")
            .populate("album")

        let musicWithLikes = await attachLikes(music)

        return res.status(200).json({ msg: null, data: musicWithLikes, code: 200 })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getMusicByUserId = async (req, res) => {
    try {
        let music = await musicModel.find({ user_id: req.params.id })
            .populate("user_id")
            .populate("artist")
            .populate("category")
            .populate("album")

        let musicWithLikes = await attachLikes(music)

        return res.status(200).json({ msg: null, data: musicWithLikes, code: 200 })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getMusicByAlbum = async (req, res) => {
    try {
        let music = await musicModel.find({ album: req.params.id })
            .populate("artist")
            .populate("category")
            .populate("album")

        let musicWithLikes = await attachLikes(music)

        return res.status(200).json({ msg: null, data: musicWithLikes, code: 200 })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


module.exports = {
    createMusic,
    getMusic,
    getSingleMusic,
    getMusicByArtist,
    getMusicByCategory,
    getMusicByAlbum,
    getMusicByUserId
}
