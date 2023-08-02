import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import loader from "../assets/loader.gif"
  
const TaskList = ({URL}) => {
    const[tasks,setTasks]=useState([])
    const[completedTask,setCompletedTask]=useState(false)
    const[isLoading,setIsloading]=useState(false)
    const[isEditing,setisEditing]=useState(false)
    const[taskID,setTaskID]=useState('')
    const[formData,setFormData]=useState({
        name:"",
        completed:false
    })

    const {name}=formData
    const handleInputChange=(e)=>{
         const {name,value}=e.target
         setFormData({...formData,name:value})
    }

    const createTask=async(e)=>{
    e.preventDefault()
    if(name===""){
        return toast.error("Input field cannot be empty")
    }
    try {
        await axios.post(URL+"/api/tasks",formData)
        toast.success("Task added")
        setFormData({...formData,name:''})
    } catch (error) {
     toast.error(error.message)   
    }
    console.log(formData );
    }


useEffect(()=>{
    const ctask=tasks.filter(task=>{
        return task.completed ===true
    })
    setCompletedTask(ctask)

},[tasks])

    const getTasks=async()=>{
        setIsloading(false)
        try {
          const {data}=  await axios.get("/api/tasks")
          setTasks(data)
          setIsloading(true)
        } catch (error) {
            toast.error(error)
            setIsloading(false)
        }
    }

    useEffect(()=>{
        getTasks()
     },[])





     const deleteTask=async(id)=>{
      try {
        await axios.delete(URL+"/api/tasks/"+id)
        getTasks()
        
      } catch (error) {
        toast.error(error) 
      }
     }


     const getSingleTask=async(task)=>{
      setFormData({name:task.name,completed:false})
      setTaskID(task._id)
      setisEditing(true)
     }



     const updateTask=async(e)=>{
       e.preventDefault()
       if(name===""){
       return  toast.error("Input field can not be empty")
       }
       try {
        await axios.put(URL+"/api/tasks/"+taskID,formData)

        setFormData({...formData,name:''})
        setisEditing(false)
        getTasks()
       } catch (error) {
        toast.error(error) 
       }
     }



     const setToComplete=async(task)=>{
        const newFormData={name:task.name,completed:true}
        try {
            await axios.put(URL+"/api/tasks/"+task._id,newFormData)
            getTasks()
        } catch (error) {
            toast.error(error) 
        }
     }
  return (
    <div>
        <ToastContainer/>
     
      <h2>Task Manager</h2>
      <TaskForm updateTask={updateTask} isEditing={isEditing} name={name} createTask={createTask} handleInputChange={handleInputChange}/>


{tasks.length>0&&
<div className="--flex-between --pb">
         <p>
            <b>Total task:</b>
            {tasks.length}
            </p>
         <p>
            <b>Completed task:</b>
            {completedTask.length}
            </p>
      </div>
}
      
      <hr />
    

      {!isLoading&&
      <>
        <div className="--flex-center">
            <img src={loader} alt='loading'/>
        </div>
      </>}

      {!isLoading && tasks.length===0?
    <>
    <p className=' --py'>No task added ,please add a task</p>
    </>  :
    <>
    {tasks.map((task,i)=>(
        <>
        <Task setToComplete={setToComplete} getSingleTask={getSingleTask} task={task} deleteTask={deleteTask} id={task._id} name={task.name} index={i} completed={task.completed}/>
        </>
    ))}
    </>
    
    }
    </div>
  )
}

export default TaskList
