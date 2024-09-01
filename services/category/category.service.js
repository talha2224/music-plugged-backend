const { categoryModel } = require("../../models");

const createCategory = async(req,res)=>{
    try {
        let create = await categoryModel.create(req.body)
        return res.status(200).json({msg:"Category Created",data:create,code:200})
    } 
    catch (error) {
        return error
    }
}


const getCategory = async(req,res)=>{
    try {
        let data = await categoryModel.find({})
        return res.status(200).json({msg:null,data:data,code:200})
    } 
    catch (error) {
        return error
    }
}

module.exports ={createCategory,getCategory}

