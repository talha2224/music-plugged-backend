const { episodesModel } = require("../../models");
const { uploadFile } = require("../../utils/function");

// CREATE EPISODE
const createEpisode = async (req, res) => {
    try {
        let { title, description, userId } = req.body;
        let image = req.files?.image?.[0];
        let audio_file = req.files?.audio?.[0];
        let cover_image = image ? await uploadFile(image) : null;
        let audio = image ? await uploadFile(audio_file) : null;
        let data = await episodesModel.create({ title, description, userId, cover_image, audio });
        data = await episodesModel.findById(data._id).populate("userId");

        return res.status(200).json({ msg: null, data, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// GET ALL EPISODES
const getAllEpisodes = async (req, res) => {
    try {
        let episodes = await episodesModel.find()
            .populate("userId");
        return res.status(200).json({ msg: null, data: episodes, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// GET SINGLE EPISODE
const getSingleEpisode = async (req, res) => {
    try {
        let episode = await episodesModel.findById(req.params.id)
            .populate("userId");
        if (!episode) return res.status(404).json({ msg: "Episode not found", data: null, code: 404 });
        return res.status(200).json({ msg: null, data: episode, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// GET EPISODES BY USER
const getEpisodesByUser = async (req, res) => {
    try {
        let episodes = await episodesModel.find({ userId: req.params.userId })
            .populate("userId");
        return res.status(200).json({ msg: null, data: episodes, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// DELETE EPISODE
const deleteEpisode = async (req, res) => {
    try {
        let episode = await episodesModel.findByIdAndDelete(req.params.id);
        if (!episode) return res.status(404).json({ msg: "Episode not found", data: null, code: 404 });
        return res.status(200).json({ msg: "Episode deleted successfully", data: episode, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

module.exports = {
    createEpisode,
    getAllEpisodes,
    getSingleEpisode,
    getEpisodesByUser,
    deleteEpisode
};
