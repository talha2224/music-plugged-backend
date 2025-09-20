const { shortMusicModel } = require("../../models");
const { uploadFile } = require("../../utils/function");

// Create Short Music
const createShortMusic = async (req, res) => {
    try {
        const { user_id, title, location, hashtags } = req.body;

        if (!req.file) {
            return res.status(400).json({ msg: "Video file is required", code: 400 });
        }

        // Upload video using your uploadFile func
        const videoUrl = await uploadFile(req.file);

        const create = await shortMusicModel.create({
            user_id,
            title,
            location: Array.isArray(location) ? location : JSON.parse(location || "[]"),
            hashtags: Array.isArray(hashtags) ? hashtags : JSON.parse(hashtags || "[]"),
            video_url: videoUrl
        });

        return res.status(200).json({ msg: "Short Music Created", data: create, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

// Get All Short Music
const getAllShortMusic = async (req, res) => {
    try {
        const all = await shortMusicModel.find({})
            .populate("user_id", "name profile_image");

        return res.status(200).json({ msg: null, data: all, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

// Get Short Music by User Id
const getShortMusicByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const music = await shortMusicModel.find({ user_id: userId })
            .populate("user_id", "name profile_image");

        return res.status(200).json({ msg: null, data: music, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

// Get Single Short Music
const getSingleShortMusic = async (req, res) => {
    try {
        const { id } = req.params;
        const music = await shortMusicModel.findById(id)
            .populate("user_id", "name profile_image");

        if (!music) {
            return res.status(404).json({ msg: "Short Music not found", code: 404 });
        }

        return res.status(200).json({ msg: null, data: music, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

// Delete Short Music
const deleteShortMusic = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await shortMusicModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ msg: "Short Music not found", code: 404 });
        }

        return res.status(200).json({ msg: "Short Music Deleted", code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

module.exports = {
    createShortMusic,
    getAllShortMusic,
    getShortMusicByUser,
    getSingleShortMusic,
    deleteShortMusic
};
