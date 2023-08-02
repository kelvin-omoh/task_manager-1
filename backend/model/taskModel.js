const mongoose=require("mongoose")

const TaskSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:[true,"Please add a task"]
        },
        completed:{
            type:Boolean,
            require:true,
            default:false,
        }
    },
    {
        timestamps:true
    }
)

//to create the model
const  Task=mongoose.model('Task',TaskSchema);
module.exports=Task
