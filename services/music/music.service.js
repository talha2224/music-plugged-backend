const { uploadFile } = require("../../utils/function")
const { musicModel } = require("../../models")


const createMusic = async (req,res)=>{
    try {
        let {title,description,artist,category,listners,album} = req.body
        if (req?.files?.image[0] && req?.files?.song[0]){
            let image = req?.files?.image[0]
            let song = req?.files?.song[0]
            let imageUrl = await uploadFile(image)
            let musicUrl = await uploadFile(song)
            let data = await musicModel.create({title,description,artist,listners,category,coverImage:imageUrl,music:musicUrl,album})
            if(data){
                return res.status(200).json({msg:null,data:data,code:200})
            }
        }
        else{
            return res.status(400).json({data:null,msg:"Please upload image and audio",code:400})
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const getMusic = async (req,res)=>{
    try {
      let music = await musicModel.find({}).populate("artist").populate("category").populate("album")
      return res.status(200).json({msg:null,data:music,code:200})  
    } 
    catch (error) {
        return error
    }
}

const getSingleMusic = async (req,res)=>{
    try {
      let music = await musicModel.findById(req.params.id).populate("artist").populate("category").populate("album")
      return res.status(200).json({msg:null,data:music,code:200})  
    } 
    catch (error) {
        return error
    }
}

const getMusicByCategory = async (req,res)=>{
    try {
      let music = await musicModel.find({category:req.params.id}).random().populate("artist").populate("category").populate("album")
      return res.status(200).json({msg:null,data:music,code:200})  
    } 
    catch (error) {
        return error
    }
}

const getMusicByArtist = async (req,res)=>{
    try {
      let music = await musicModel.find({artist:req.params.id}).random().populate("artist").populate("category").populate("album")
      return res.status(200).json({msg:null,data:music,code:200})  
    } 
    catch (error) {
        return error
    }
}

const getMusicByAlbum= async (req,res)=>{
    try {
      let music = await musicModel.find({album:req.params.id}).random().populate("artist").populate("category").populate("album")
      return res.status(200).json({msg:null,data:music,code:200})  
    } 
    catch (error) {
        return error
    }
}

module.exports = {createMusic,getMusic,getSingleMusic,getMusicByArtist,getMusicByCategory,getMusicByAlbum}