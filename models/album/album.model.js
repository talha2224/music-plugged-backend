const mongoose = require('mongoose');


const albumSchema = mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    artist:{type:mongoose.Schema.Types.ObjectId,ref:"Artist"},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
})


const Album = mongoose.model("Album",albumSchema,"Album")


module.exports = Album