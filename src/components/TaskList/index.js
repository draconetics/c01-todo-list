import { connect } from 'react-redux';
import TaskList from './TaskList';
import {
  saveTask, updateTask, fetchTaskList, deleteTask,
} from '../../store/actions';

const mapStateToProps = (state) => ({
  taskList: state.taskReducer.taskList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: () => dispatch(fetchTaskList),
  updateTask: (item) => dispatch(updateTask(item)),
  saveTask: (task) => dispatch(saveTask(task)),
  deleteTask: (id) => dispatch(deleteTask(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
