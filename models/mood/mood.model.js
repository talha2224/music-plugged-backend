const mongoose = require('mongoose');


const moodSchema = mongoose.Schema({
    title:{type:String,required:true},
})


const Mood = mongoose.model("Mood",moodSchema,"Mood")


module.exports = Mood