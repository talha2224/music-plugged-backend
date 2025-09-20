const mongoose = require('mongoose');


const eventSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    event_link:{type:String,required:true,},
    event_date:{type:String,required:true,},
    event_time:{type:String,required:true,},
    event_duration:{type:String,required:true,},
    event_location:{type:String,required:true},
    other_details:{type:String,default:{}}
})


const Event = mongoose.model("Event",eventSchema,"Event")


module.exports = Event