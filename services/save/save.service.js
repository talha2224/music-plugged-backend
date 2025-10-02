const { saveModel, } = require("../../models");

// Helper: populate everything
const populateAll = [
    { path: "userId" },
    {
        path: "playlistId",
        populate: [
            { path: "userId" },
            {
                path: "music",
                populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
            }
        ]
    },
    {
        path: "musicId",
        populate: [{ path: "artist" }, { path: "category" }, { path: "album" }, { path: "user_id" }]
    },
    { path: "episodeId", populate: { path: "userId" } }
];

// ✅ Create Save
const createSave = async (req, res) => {
    try {
        let { userId, playlistId, musicId, episodeId } = req.body;

        let data = await saveModel.create({ userId, playlistId, musicId, episodeId });
        data = await saveModel.findById(data._id).populate(populateAll);

        return res.status(200).json({ msg: "Saved successfully", data, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// ✅ Get All Saves
const getAllSaves = async (req, res) => {
    try {
        let data = await saveModel.find().populate(populateAll);
        return res.status(200).json({ msg: null, data, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// ✅ Get Saves by User
const getSaveByUserId = async (req, res) => {
    try {
        let data = await saveModel.find({ userId: req.params.id }).populate(populateAll);
        return res.status(200).json({ msg: null, data, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// ✅ Get Single Save
const getSingleSave = async (req, res) => {
    try {
        let data = await saveModel.findById(req.params.id).populate(populateAll);
        if (!data) return res.status(404).json({ msg: "Save not found", data: null, code: 404 });
        return res.status(200).json({ msg: null, data, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// ✅ Delete Single Save
const deleteSingleSave = async (req, res) => {
    try {
        let data = await saveModel.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ msg: "Save not found", data: null, code: 404 });
        return res.status(200).json({ msg: "Save deleted", data, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

// ✅ Delete All Saves by User
const deleteAllSavesByUserId = async (req, res) => {
    try {
        await saveModel.deleteMany({ userId: req.params.id });
        return res.status(200).json({ msg: "All saves deleted for user", data: null, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong", data: null, code: 500 });
    }
};

module.exports = {
    createSave,
    getAllSaves,
    getSaveByUserId,
    getSingleSave,
    deleteSingleSave,
    deleteAllSavesByUserId
};
