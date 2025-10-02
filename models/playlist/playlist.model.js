const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    title: { type: String, required: true },
    cover_image: { type: String, required: true },
    description: { type: String, required: true },
    private: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    music: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }]
}, { timestamps: true })

const Playlist = mongoose.model("Playlist", playlistSchema, "Playlist")

module.exports = Playlist
