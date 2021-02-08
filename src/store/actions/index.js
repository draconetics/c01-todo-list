import TaskService from '../../services/TaskService'

export const fetchTaskList = async (dispatch)=>{
  return await TaskService.getAll()
      .then((resp)=>{
          console.log(resp.data.results);
          dispatch({type:'FETCH_TASKLIST',value:resp.data.results});
      })
  .catch(e=>console.log(e))
}

export const updateTask = (value) => async(dispatch)=>{
    console.log(value);
    return await TaskService.updateTask(value._id, value)
                  .then((resp)=>{
                      dispatch({type:'UPDATE_TASK',value:resp.data});
                  })
                  .catch(e=>console.log(e))
}

export const saveTask = (value) => async(dispatch) =>{
    const newTask = {task: value}
    console.log(newTask);
    return await TaskService.createTask(newTask)
                  .then((resp)=>{
                      console.log('task created');
                      dispatch({type:'CREATE_TASK',value:resp.data});
                  })
                  .catch(e=>console.log(e))
}

export const deleteTask = (value) => async(dispatch) =>{
    return await TaskService.deleteTask(value)
                  .then((resp)=>{
                      dispatch({type:'DELETE_TASK',value});
                  })
                  .catch(e=>console.log(e))
}

