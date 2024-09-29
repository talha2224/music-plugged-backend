const mongoose = require('mongoose');


const accountSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    subId:{type:String,default:null},
    subEndDate:{type:Number,default:null},
    // prefrrence:{type:[mongoose.Schema.Types.ObjectId],ref:"Artist"}
})


const Account = mongoose.model("Account",accountSchema,"Account")


module.exports = Account