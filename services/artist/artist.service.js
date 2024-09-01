const { artistModel } = require("../../models")
const { uploadFile } = require("../../utils/function")



const createArtist = async (req,res)=>{
    try {
        let {name} = req.body
        let image = req.file
        let imageUrl = await uploadFile(image)
        let create = await artistModel.create({name,image:imageUrl})
        return res.status(200).json({msg:"Artist Created",data:create,code:200})
    } 
    catch (error) {
        return error
    }
}

const getAllArtist = async(req,res)=>{
    try {
        let getAll = await artistModel.find({})
        return res.status(200).json({msg:null,data:getAll,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {createArtist,getAllArtist}