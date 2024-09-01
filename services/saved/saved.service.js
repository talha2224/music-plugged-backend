const { savedModel } = require("../../models")



const saveMusic = async (req,res)=>{
    try {
        let save = await savedModel.create(req.body)
        return res.status(200).json({data:save,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


const getSaveMusic = async(req,res)=>{
    try {
        let data = await savedModel.find({userId:req.params.id}).populate("musicId").populate("userId")
        return res.status(200).json({data:data,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {saveMusic,getSaveMusic}