const mongoose = require('mongoose');


const artistSchema = mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
})


const Artist = mongoose.model("Artist",artistSchema,"Artist")


module.exports = Artist