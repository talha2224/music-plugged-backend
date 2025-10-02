const { playlistModel } = require("../../models")
const { uploadFile } = require("../../utils/function")

const createPlaylist = async (req, res) => {
    try {
        let { title, description, private, userId, music } = req.body
        let image = req.files?.image?.[0]
        let cover_image = image ? await uploadFile(image) : null
        if (music && typeof music === "string") {
            try {
                music = JSON.parse(music)
            } catch (err) {
                return res.status(400).json({ msg: "Invalid music format", data: null, code: 400 })
            }
        }

        let data = await playlistModel.create({ title, description, private, userId, music, cover_image })
        data = await playlistModel.findById(data._id)
            .populate("userId")
            .populate({
                path: "music",
                populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
            })

        return res.status(200).json({ msg: null, data, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}


const getPlaylist = async (req, res) => {
    try {
        let playlists = await playlistModel.find({ userId: req.params.id })
            .populate("userId")
            .populate({
                path: "music",
                populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
            })
        return res.status(200).json({ msg: null, data: playlists, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

const getSinglePlaylist = async (req, res) => {
    try {
        let playlist = await playlistModel.findById(req.params.id)
            .populate("userId")
            .populate({
                path: "music",
                populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
            })
        if (!playlist) return res.status(404).json({ msg: "Playlist not found", data: null, code: 404 })
        return res.status(200).json({ msg: null, data: playlist, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

const getPublicPlaylists = async (req, res) => {
    try {
        let playlists = await playlistModel.find({ private: false })
            .populate("userId")
            .populate({
                path: "music",
                populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
            })
        return res.status(200).json({ msg: null, data: playlists, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

const addMusicToPlaylist = async (req, res) => {
    try {
        let { playlistId, musicId } = req.body
        let playlist = await playlistModel.findByIdAndUpdate(
            playlistId,
            { $addToSet: { music: musicId } },
            { new: true }
        ).populate("userId").populate({
            path: "music",
            populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
        })
        if (!playlist) return res.status(404).json({ msg: "Playlist not found", data: null, code: 404 })
        return res.status(200).json({ msg: "Music added to playlist", data: playlist, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

const removeMusicFromPlaylist = async (req, res) => {
    try {
        let { playlistId, musicId } = req.body
        let playlist = await playlistModel.findByIdAndUpdate(
            playlistId,
            { $pull: { music: musicId } },
            { new: true }
        ).populate("userId").populate({
            path: "music",
            populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
        })
        if (!playlist) return res.status(404).json({ msg: "Playlist not found", data: null, code: 404 })
        return res.status(200).json({ msg: "Music removed from playlist", data: playlist, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

const updatePlaylist = async (req, res) => {
    try {
        let { playlistId, title, description, private } = req.body
        let playlist = await playlistModel.findByIdAndUpdate(
            playlistId,
            { title, description, private },
            { new: true }
        ).populate("userId").populate({
            path: "music",
            populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
        })
        if (!playlist) return res.status(404).json({ msg: "Playlist not found", data: null, code: 404 })
        return res.status(200).json({ msg: "Playlist updated", data: playlist, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 })
    }
}

module.exports = {
    createPlaylist,
    getPlaylist,
    getSinglePlaylist,
    getPublicPlaylists,
    addMusicToPlaylist,
    removeMusicFromPlaylist,
    updatePlaylist
}
