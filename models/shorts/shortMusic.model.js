const mongoose = require("mongoose");

const shortMusicSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    title: { type: String, required: true },
    location: [{ type: String }],
    hashtags: [{ type: String }],
    video_url: { type: String, required: true },
}, { timestamps: true });

const ShortMusic = mongoose.model("ShortMusic", shortMusicSchema, "ShortMusic");

module.exports = ShortMusic;
