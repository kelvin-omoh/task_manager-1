const Task = require("../model/taskModel");

const createTask=async(req,res)=>{
    
    try {
         const task=await Task.create(req.body)
         res.status(200).json(task)
    
    } catch (error) {
        res.status(500).json({msg:error.message})
        console.log(error);
    }
      
    }
const getTasks=async(req,res)=>{
    try {
        const Tasks=await Task.find({})
        res.status(200).json(Tasks)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

const getTask=async(req,res)=>{
 try {
    const {id}= req.params;
    // res.send(id)
   const task= await Task.findById(id);
   if(!task){
    return res.status(404).json("Task not found in the database")
 
   }

 } catch (error) {
    res.status(500).json({msg:error.message})
}

}

const deleteTask=async(req,res)=>{
    try {
        const {id}= req.params
        const task =await Task.findByIdAndDelete(id)
          if(!task){
           return res.status(404).json("No Task with id:",task)
          }

        res.status(200).send("Task deleted")
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}


const updateATask=async(req,res)=>{
    try {
         const {id}=req.params
         //    const task = await Task.findByIdAndUpdate(ID,THE NEW UPDATE IN THE BODY of the request, to ensure that it runs the valid task : the task name must not be empty from the schema)
                                         
    const task = await Task.findByIdAndUpdate({_id:id}, req.body,{new:true},{runValidators:true})
    res.status(200).json(task)
    if(!task){
        return res.status(404).json("No Task with id:",task)
    }
    } catch (error) {
        res.status(500).send({msg:error.message}) 
    }
   

}

    module.exports={
        createTask,
        getTasks,
        getTask,
        deleteTask,
        updateATask
        
    }