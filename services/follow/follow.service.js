const {followModel } = require("../../models")



const followArtist = async (req,res)=>{
    try {
        let save = await followModel.create(req.body)
        return res.status(200).json({data:save,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


const unFollowArtist = async (req,res)=>{
    try {
        let save = await followModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({data:null,msg:"unfollow",code:200})
    } 
    catch (error) {
        return error
    }
}


const getFollowArtist = async(req,res)=>{
    try {
        let data = await followModel.find({userId:req.params.userId,artistId:req.params.artistId}).populate("artistId")
        return res.status(200).json({data:data,msg:null,code:200})
    } 
    catch (error) {
        return error
    }
}


module.exports = {followArtist,getFollowArtist,unFollowArtist}
