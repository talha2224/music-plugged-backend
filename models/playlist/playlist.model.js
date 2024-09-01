const mongoose = require('mongoose');


const playlistSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    private:{type:Boolean,default:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"}
})

const Playlist = mongoose.model("Playlist",playlistSchema,"Playlist")


module.exports = Playlist