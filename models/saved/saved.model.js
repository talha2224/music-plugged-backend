const mongoose = require('mongoose');


const saveSchema = mongoose.Schema({
    musicId:{type:mongoose.Schema.Types.ObjectId,ref:"Music"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"}
})


const Saved = mongoose.model("Saved",saveSchema,"Saved")


module.exports = Saved