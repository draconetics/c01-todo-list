import TodoListAxios from './TodoListAxios'
import { createTask, updateTask, updateTaskList, deleteTask } from '../../actions'
import { connect } from 'react-redux';


  const mapStateToProps = state =>{
      return {
          taskList: state.todoAxios.taskList
      }
  }
 
  const mapDispatchToProps = dispatch => {
    return {
        updateTaskList: ()=>updateTaskList(dispatch),
        updateTask: (value)=>updateTask(dispatch,value),
        createTask: (value) =>createTask(dispatch,value),
        deleteTask: (value) => deleteTask(dispatch,value)
    };
  }; 
  
  export default connect(mapStateToProps, mapDispatchToProps)(TodoListAxios);