const express = require("express");
const Task = require("../model/taskModel");
const { createTask, getTasks, getTask, deleteTask, updateATask } = require("../controllers/TaskController");

const router=express.Router()

//Routes


    
    // //CREATE OR SAVE DATA A NEW ENTRY IN DB
    // router.post('/',createTask)
    
    // //READ A DATA
    // router.get('/',getTasks)
    // router.get('/:id',getTask)
    // router.delete('/:id',deleteTask)
    // router.put('/:id',updateATask)
     
    // OR THIS route below


    router.route('/').post(createTask).get(getTasks)
    router.route('/:id').delete(deleteTask).get(getTask).put(updateATask)


module.exports=router