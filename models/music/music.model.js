const mongoose = require('mongoose');


const musicSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
    coverImage: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    genre: { type: String, default: null },
    release_date: { type: String, default: null },
    icrc_code: { type: String, default: null },
    lyrics: { type: String, default: null },
    music: { type: String, required: true },

    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album", default: null },
    listners: { type: Number, default: 0 },
    musicType: { type: String, default: "audio" }

}, { timestamps: true })


const Music = mongoose.model("Music", musicSchema, "Music")


module.exports = Music