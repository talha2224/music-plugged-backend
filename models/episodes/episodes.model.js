const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
    title: { type: String, required: true },
    cover_image: { type: String, required: true },
    audio: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true }
}, { timestamps: true });

const Episode = mongoose.model("Episode", episodeSchema, "Episode");

module.exports = Episode;
