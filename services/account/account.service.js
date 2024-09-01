const { accountModel } = require("../../models");
const bcrypt = require("bcryptjs")









const registerUser = async (req,res)=>{
    try {
        let {name,email,password} = req.body
        console.log(name,email,password,'name,email,password')
        let userExits = await accountModel.findOne({email:email})
        if(userExits){
            return res.status(403).json({msg:"User Exits",data:null,code:403})
        }
        let hash = await bcrypt.hash(password,10)
        let create = await accountModel.create({name,email,password:hash})
        console.log(create,'create')
        return res.status(200).json({msg:"User Created",data:create,code:200})
    } 
    catch (error) {
        return error
    }
}

const loginUser = async (req,res)=>{
    try {
        let {email,password} = req.body
        let userExits = await accountModel.findOne({email:email})
        if(!userExits){
            return res.status(404).json({msg:"User Not Exits",data:null,code:404})
        }
        let compare = await bcrypt.compare(password,userExits.password)
        if(compare){
            return res.status(200).json({msg:"User Login",data:userExits,code:200})
        }
        return res.status(403).json({msg:"Invalid Credentials",data:null,code:403})
    } 
    catch (error) {
        return error
    }
}


const getUser = async(req,res)=>{
    try {
        let userExits = await accountModel.findById(req.params.id)
        if(!userExits){
            return res.status(404).json({msg:"User Not Exits",data:null,code:404})
        }
        return res.status(200).json({msg:null,data:userExits,code:200})
        
    } 
    catch (error) {
        return error
    } 
}

module.exports = {registerUser,loginUser,getUser}