import TaskService from '../services/TaskService'

export const updateTaskList = async (dispatch)=>{
  return await TaskService.getAll()
      .then((resp)=>{
          dispatch({type:'FETCH_TASKLIST',value:resp.data.results});
      })
  .catch(e=>console.log(e))
}

export const updateTask = async (dispatch, value)=>{
    console.log(value);
    return await TaskService.updateTask(value.id, value)
                  .then((resp)=>{
                      dispatch({type:'UPDATE_TASK',value:resp.data});
                  })
                  .catch(e=>console.log(e))
}

export const createTask = async (dispatch,value) =>{
    const newTask = {task: value}
    return await TaskService.createTask(newTask)
                  .then((resp)=>{
                      dispatch({type:'CREATE_TASK',value:resp.data});
                  })
                  .catch(e=>console.log(e))
}

export const deleteTask = async (dispatch,value) =>{
    return await TaskService.deleteTask(value)
                  .then((resp)=>{

                      dispatch({type:'DELETE_TASK',value});
                  })
                  .catch(e=>console.log(e))
}

