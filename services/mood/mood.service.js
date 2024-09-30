const {moodModel } = require("../../models")



const createMood = async (req,res)=>{
    try {
        let save = await moodModel.create(req.body)
        return res.status(200).json({data:save,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


const getMood = async(req,res)=>{
    try {
        let data = await moodModel.find({})
        return res.status(200).json({data:data,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {createMood,getMood}
