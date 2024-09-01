const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const combineRouter = require("./routes")
const { dbConnection } = require("./database/connection")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.use(morgan("dev"))


dbConnection()
let port = process.env.PORT || 4001
app.use("/api/v1",combineRouter)
app.use("*",(req,res)=>{
    res.status(404).json({msg:"Api Not Found"})
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})