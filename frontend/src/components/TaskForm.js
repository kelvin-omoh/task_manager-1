import React from 'react'

const TaskForm = ({createTask,name,handleInputChange,isEditing,updateTask}) => {
  return (
   <form className='task-form' onSubmit={isEditing?updateTask:createTask}>
        <input type="text" placeholder='Add a task' value={name} onChange={ handleInputChange} />
        {isEditing ?
        <button type='submit'>Edit</button>
        :
        
        <button type='submit'>Add</button>
    }
        
   </form>
  )
}

export default TaskForm
