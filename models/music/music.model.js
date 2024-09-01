const mongoose = require('mongoose');


const musicSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    artist:{type:mongoose.Schema.Types.ObjectId,ref:"Artist"},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    album:{type:mongoose.Schema.Types.ObjectId,ref:"Album",default:null},
    listners:{type:Number,required:true},
    coverImage:{type:String,required:true},
    music:{type:String,required:true}
},{timestamps:true})


const Music = mongoose.model("Music",musicSchema,"Music")


module.exports = Music