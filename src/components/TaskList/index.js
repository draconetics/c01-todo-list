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
        updateTask: (item)=>dispatch(updateTask(item)),
        saveTask: (task) =>dispatch(saveTask(task)),
        deleteTask: (id) => dispatch(deleteTask(id)),
    };
  }; 
  
  export default connect(mapStateToProps, mapDispatchToProps)(TaskList);