const { playlistModel } = require("../../models")


const createPlaylist = async (req, res) => {
    try {
        let { title, description, private,userId } = req.body
        let data = await playlistModel.create({ title, description, private,userId })
        if (data) {
            return res.status(200).json({ msg: null, data: data, code: 200 })
        }

    }
    catch (error) {
        console.log(error)
        return
    }
}

const getPlaylist = async (req, res) => {
    try {
        let music = await playlistModel.find({userId:req.params.id}).populate("userId")
        return res.status(200).json({ msg: null, data: music, code: 200 })
    }
    catch (error) {
        return error
    }
}


module.exports = { createPlaylist,getPlaylist }