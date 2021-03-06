const getId = () => Number.parseInt((new Date().getTime() * Math.random()), 10).toString();

const init = [
  { id: getId(), todo: 'do somethins interneting' },
  { id: getId(), todo: 'do something special' },
  { id: getId(), todo: 'wakeup early' },
  { id: getId(), todo: 'do not sleep' },
];

const todoList = (state = init, action) => {
  switch (action.type) {
    case 'ADD': {
      return [
        ...state,
        {
          id: getId(),
          todo: action.value.todo,
        },
      ];
    }
    case 'DELETE': {
      return state.filter((item) => item.id !== action.value.id);
    }
    case 'EDIT': {
      const newTodoList = state.map((item) => {
        const editItem = item;
        if (editItem.id === action.value.id) {
          editItem.todo = action.value.todo;
        }
        return editItem;
      });

      return [...newTodoList];
    }
    default:
      return state;
  }
};

export default todoList;
