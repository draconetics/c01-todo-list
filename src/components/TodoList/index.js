import TodoList from './TodoList'
import {connect} from 'react-redux';

export function mapStateToProps(state) {
    return {
        todoList: state.todoReducer
    };
}

export const mapDispatchToProps = (dispatch)=>{
  
    return {
      addTodo: (newTodo) => dispatch({type:'ADD',value:newTodo}),
      deleteTodo: async (id) => await dispatch({type:'DELETE',value:{id}}),
      editTodo: (id, newTodo) => dispatch({type:'EDIT',value:{id,todo:newTodo}})
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);