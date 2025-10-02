const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    room_admin_id:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    room_title:{type:String,required:true},
    room_image:{type:String,required:true},
    allow_chats:{type:String,required:true},
    allow_chats:{type:String,required:true},
    allow_chats:{type:String,required:true},
})


const PlaylistMusic = mongoose.model("PlaylistMusic",playlistMusicSchema,"PlaylistMusic")


module.exports = PlaylistMusic