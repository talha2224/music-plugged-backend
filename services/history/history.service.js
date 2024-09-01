const {historyModel } = require("../../models")



const createHistory = async (req,res)=>{
    try {
        let save = await historyModel.create(req.body)
        return res.status(200).json({data:save,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


const getHistory = async(req,res)=>{
    try {
        let data = await historyModel.find({userId:req.params.id}).populate("musicId").populate("userId")
        return res.status(200).json({data:data,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {createHistory,getHistory}