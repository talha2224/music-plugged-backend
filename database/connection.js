const mongoose = require('mongoose');
require("dotenv").config()


const dbConnection = async ()=>{
    try {
        let connection = await mongoose.connect(process.env.DBURL)
        if(!connection){
            return console.log(`Database not connected`)
        }
        return console.log(`Database connection successful`)
    } 
    catch (error) {
        console.log(error)
    }
}
module.exports = {dbConnection}