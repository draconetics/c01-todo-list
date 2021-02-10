import { connect } from 'react-redux';
import TodoList from './TodoList';

export function mapStateToProps(state) {
  return {
    todoList: state.todoReducer,
  };
}

export const mapDispatchToProps = (dispatch) => ({
  addTodo: (newTodo) => dispatch({ type: 'ADD', value: newTodo }),
  deleteTodo: (id) => dispatch({ type: 'DELETE', value: { id } }),
  editTodo: (item) => dispatch({ type: 'EDIT', value: item }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
