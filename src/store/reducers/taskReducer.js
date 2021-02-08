const init = {
    taskList:[]
}

const task = (state = init, action) => {
    switch (action.type) {
      case 'FETCH_TASKLIST':
        return {...state, taskList:action.value};
      case 'CREATE_TASK':
        return {...state, taskList:[...state.taskList, action.value]}
      case 'DELETE_TASK':
          return {...state, taskList:state.taskList.filter(item=>item._id !== action.value)}
      case 'UPDATE_TASK':
        const newTaskList = state.taskList.map(item=>{
        
              if(item._id === action.value._id){
                  
                  item.task = action.value.task;
              }
              return item;
          });
          return {...state, taskList:newTaskList}
          
      default:
        return state
    }
  }
  
  export default task