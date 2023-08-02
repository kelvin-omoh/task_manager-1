import React from 'react'
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa'
const Task = ({setToComplete, id,task,getSingleTask,name,index,completed,deleteTask}) => {
  return (
    <div  key={id} className={`${task.completed ? 'task completed':'task'}`}>
      <p>
        
        <b>{index+1}. </b>
       {name}
      </p>
      <div className="task-icons">
        <FaCheckDouble onClick={()=>setToComplete(task)}  color="green" />
        <FaEdit onClick={()=>getSingleTask(task)} color="purple" />
        <FaRegTrashAlt onClick={()=>deleteTask(id)} color="red" />
      </div>
    </div>
  )
}

export default Task
