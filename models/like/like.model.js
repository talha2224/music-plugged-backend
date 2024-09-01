const mongoose = require('mongoose');


const likeSchema = mongoose.Schema({
    musicId:{type:mongoose.Schema.Types.ObjectId,ref:"Music"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"}
},{timestamps:true})


const Like = mongoose.model("Like",likeSchema,"Like")


module.exports = Like