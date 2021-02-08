import TaskService from '../../services/TaskService'

export const fetchTaskList = async (dispatch)=>{
  return await TaskService.getAll()
      .then((resp)=>{
          dispatch({type:'FETCH_TASKLIST',value:resp.data.results});
      })
  .catch(e=>console.log(e))
}

export const updateTask = (item) => async(dispatch)=>{
    return await TaskService.updateTask(item._id, item)
                  .then((resp)=>{
                      dispatch({type:'UPDATE_TASK',value:resp.data});
                  })
                  .catch(e=>console.log(e))
}

export const saveTask = (task) => async(dispatch) =>{
    const newTask = {task: task}
    console.log(newTask);
    return await TaskService.createTask(newTask)
                  .then((resp)=>{
                      dispatch({type:'CREATE_TASK',value:resp.data});
                  })
                  .catch(e=>console.log(e))
}

export const deleteTask = (id) => async(dispatch) =>{
    return await TaskService.deleteTask(id)
                  .then((resp)=>{
                      dispatch({type:'DELETE_TASK',value:String(resp.data)});
                  })
                  .catch(e=>console.log(e))
}

