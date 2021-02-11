/* eslint-disable no-underscore-dangle */
const init = {
  taskList: [],
};

const task = (state = init, action) => {
  switch (action.type) {
    case 'FETCH_TASKLIST': {
      return { ...state, taskList: action.value };
    }
    case 'CREATE_TASK': {
      return { ...state, taskList: [...state.taskList, action.value] };
    }
    case 'DELETE_TASK': {
      console.log(action.value);
      const deletedTaskList = state.taskList.filter((item) => item._id !== action.value);
      console.log(deletedTaskList);
      return { ...state, taskList: deletedTaskList };
    }
    case 'UPDATE_TASK': {
      const newTaskList = state.taskList.map((item) => {
        const editedItem = item;
        if (editedItem._id === action.value._id) {
          editedItem.task = action.value.task;
        }
        return editedItem;
      });
      return { ...state, taskList: newTaskList };
    }
    default:
      return state;
  }
};

export default task;
