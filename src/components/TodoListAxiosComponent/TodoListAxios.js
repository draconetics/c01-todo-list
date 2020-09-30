import React, {useEffect, useState} from 'react'

const TodoListAxios = (props)=>{

    useEffect(() => {
        props.updateTaskList()
    }, [])

    const [inputTask, setInputTask] = useState("");

    const saveNewTask = ()=>{
        props.createTask(inputTask);
        //props.updateTaskList();
    };

    const editTask = (id)=>{
        const taskItem=document.getElementById("taskItem-"+id);
        taskItem.classList.remove("show");
        const editTask=document.getElementById("editTask-"+id);
        editTask.classList.add("show");
    }

    const cancelEdition = (id)=>{
        const taskItem=document.getElementById("taskItem-"+id);
        taskItem.classList.add("show");
        const editTask=document.getElementById("editTask-"+id);
        editTask.classList.remove("show");
    }

    const saveEditedTask=(id)=>{
        const editedTask=document.getElementById("input-"+id);
        //props.dispatch({type:'UPDATE_TASK',value:{id,task:editedTask.value}})
        props.updateTask({id,task:editedTask.value});

  
        const taskItem=document.getElementById("taskItem-"+id);
        taskItem.classList.add("show");
        const editTask=document.getElementById("editTask-"+id);
        editTask.classList.remove("show");
    }

    const deleteTask = (id)=>{
        props.deleteTask(id);
    }

    return (
        <div className="todolist container">
            {inputTask}
        <div className="todolist-add">
            
            <input type="text" value={inputTask} placeholder="I want to do..." onChange={(e)=>setInputTask(e.target.value)}/>
            <button type="button" className="btn"  onClick={()=>saveNewTask()}>New Task</button>
        </div>
        <div className="todolist-list">
              {
                    props.taskList && props.taskList.map((item,index)=>{
                        return (
                          <div key={index}>
                          <ul className="task-item show" id={"taskItem-"+item._id} >
                              <li>
                                {item._id}
                              </li>
                              <li>
                                  <div>{item.task}</div>
                              </li>
                              <li>
                                <div>
                                    <button className="btn" onClick={()=>editTask(item._id)}>edit</button>
                                    <button className="btn" onClick={()=>deleteTask(item._id)}>delete</button>
                                </div>
                              </li>
                          </ul>
                          <ul className="edit-task" id={"editTask-"+item._id} >
                              <li>
                                {item._id}
                              </li>
                              <li>
                                    <input type="text" id={"input-" + item._id} defaultValue={item.task}></input>
                              </li>
                              <li>
                                <div>
                                    <button className="btn" onClick={()=>saveEditedTask(item._id)}>Save</button>
                                    <button className="btn" onClick={()=>cancelEdition(item._id)} >Cancel</button>
                                </div>
                              </li>
                          </ul>
                          
                          </div>
                          );
                    })
                }      
        </div>
          
      </div>
    );
}

export default TodoListAxios;