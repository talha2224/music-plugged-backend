const {likeMusicModel } = require("../../models")



const createLike = async (req,res)=>{
    try {
        let save = await likeMusicModel.create(req.body)
        return res.status(200).json({data:save,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


const getLike = async(req,res)=>{
    try {
        let data = await likeMusicModel.find({userId:req.params.id}).populate("musicId").populate("userId")
        return res.status(200).json({data:data,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {createLike,getLike}