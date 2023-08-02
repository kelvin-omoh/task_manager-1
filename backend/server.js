const dotenv=require('dotenv').config()
const express=require("express")
const connectDB=require("./config/connectDB")
const Task = require('./model/taskModel')
const TaskRoute=require("./routes/taskRouter")
const cors=require("cors")
//connecting db by calling the function in the server file
connectDB()
const app=express()


//middle ware
app.use(express.json())
app.use(cors(
    {
        origin:['http://localhost:3000/','google.com','http://enaikele-stack-app.onrender.com/']
    }
))
app.use('/api/tasks',TaskRoute)

const PORT=process.env.PORT || 8000




const startServer=async()=>{
    try {
        /*This means that before the app listens to the port its waits for
        the connect db functions to get executed before it
        */
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`Server Running on port: ${PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}
//calling the start server function
startServer()