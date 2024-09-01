const { playlistMusicModel } = require("../../models")



const saveMusic = async (req,res)=>{
    try {
        let save = await playlistMusicModel.create(req.body)
        return res.status(200).json({data:save,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


const getPlaylistMusic = async(req,res)=>{
    try {
        let data = await savedModel.find({playlistId:req.params.id}).populate("musicId").populate("userId").populate("playlistId")
        return res.status(200).json({data:data,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {saveMusic,getPlaylistMusic}