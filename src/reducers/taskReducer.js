const getId = ()=>{
    return Number.parseInt(new Date().getTime()*Math.random()).toString();
}

const init = [
    { id:getId(), task:"do somethins interneting"},
    { id:getId(), task:"do something special"},
    { id:getId(), task:"wakeup early"},
    { id:getId(), task:"do not sleep"},
]

const todos = (state = init, action) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: getId(),
            task: action.value.task
          }
        ]
      case 'DELETE':
          return state.filter(item=>item.id !== action.value.id);
      case 'EDIT':
        const newTaskList = state.map(item=>{

            if(item.id === action.value.id){
                console.log(item);
                item.task = action.value.task;
            }
            return item;
        });
        
        return  [...newTaskList];
      default:
        return state
    }
  }
  
  export default todos