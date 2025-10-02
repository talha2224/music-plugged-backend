const mongoose = require("mongoose");

const saveSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    playlistId: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist", default: null },
    musicId: { type: mongoose.Schema.Types.ObjectId, ref: "Music", default: null },
    episodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", default: null }
}, { timestamps: true });

const Save = mongoose.model("Save", saveSchema, "Save");

module.exports = Save;
