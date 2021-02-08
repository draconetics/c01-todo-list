import TaskList from './TaskList'
import { saveTask, updateTask, fetchTaskList, deleteTask } from '../../store/actions'
import { connect } from 'react-redux';


  const mapStateToProps = state =>{
      return {
          taskList: state.taskReducer.taskList
      }
  }
 
  const mapDispatchToProps = dispatch => {
    return {
        fetchTaskList: ()=>dispatch(fetchTaskList),
        updateTask: (value)=>dispatch(updateTask(value)),
        saveTask: (value) =>dispatch(saveTask(value)),
        deleteTask: (value) => dispatch(deleteTask(value)),
    };
  }; 
  
  export default connect(mapStateToProps, mapDispatchToProps)(TaskList);