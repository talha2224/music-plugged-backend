const mongoose = require('mongoose');


const followSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    artistId:{type:mongoose.Schema.Types.ObjectId,ref:"Artist"}
})


const Follow = mongoose.model("Follow",followSchema,"Follow")


module.exports = Follow