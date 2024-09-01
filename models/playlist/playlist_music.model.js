const mongoose = require('mongoose');


const playlistMusicSchema = mongoose.Schema({
    musicId:{type:mongoose.Schema.Types.ObjectId,ref:"Music"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    playlistId:{type:mongoose.Schema.Types.ObjectId,ref:"Playlist"},
})


const PlaylistMusic = mongoose.model("PlaylistMusic",playlistMusicSchema,"PlaylistMusic")


module.exports = PlaylistMusic