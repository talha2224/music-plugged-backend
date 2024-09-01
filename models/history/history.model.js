const mongoose = require('mongoose');


const historySchema = mongoose.Schema({
    musicId:{type:mongoose.Schema.Types.ObjectId,ref:"Music"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"}
},{timestamps:true})


const History = mongoose.model("History",historySchema,"History")


module.exports = History