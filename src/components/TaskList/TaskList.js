import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css'

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      editTask:{
        _id:'',
        task:''
      }
    };
    this.modalRef=React.createRef();
  }

  componentDidMount() {
    const {fetchTaskList} = this.props;
    fetchTaskList()
  }

  saveTask(e) {
    e.preventDefault();
    console.log("save")
    const {saveTask} = this.props;
    const {task} = this.state;
    saveTask(task);
    this.setState({task:''})
  }

  updateTask(e){
    e.preventDefault();
    const {updateTask} = this.props;
    const {editTask} = this.state;
    updateTask(editTask);
    this.modalRef.current.classList.toggle('show');
  }

  handleInput(e){
    this.setState({task: e.target.value})
    
  }

  handleEditTask(e){
    e.preventDefault();
    const {editTask} = this.state;
    this.setState({editTask:{...editTask,task:e.target.value}})

  }

  editTask(item){
    console.log(item)
    this.modalRef.current.classList.toggle('show');
    this.setState({editTask:item})
    
  }

  cancel(e){
    e.preventDefault();
    console.log(this.modalRef.current)
    this.modalRef.current.classList.toggle('show');
  }

  deleteTask(id){
    const { deleteTask } = this.props;
    deleteTask(id);
  }

  render = () => {
    const { task, editTask } = this.state;
    const { taskList } = this.props;

    return (
      <div className="tasklist container" data-test="TaskList">
        <form className="tasklist__form" onSubmit={(e)=>this.saveTask(e)}>
          <input type="text"  onChange={e=>this.handleInput(e)} value={task}/>
          <button type="submit" className="btn">Add new task</button>
        </form>
        <div className="tasklist__content">
          {taskList &&
            taskList.map((item, index) => {
              return (
                <ul key={index}>
                  <li>{index+1}</li>
                  <li>{item.task}</li>
                  <li><button className="btn" onClick={()=>this.editTask(item)}>Edit</button></li>
                  <li><button className="btn" onClick={()=>this.deleteTask(item._id)}>Delete</button></li>
                </ul>
              );
            })}
        </div>
        <div className="modal" ref={element=>this.modalRef.current = element}>
            <div className="modal__content">
              <div className="modal__title">Edit your item</div>
              <form className="modal__form" onSubmit={(e)=>this.updateTask(e)}>
                <input type="text" value={editTask.task} onChange={(e)=>this.handleEditTask(e)} />
                <button type="submit" className="btn">save</button>
                <button className="btn" onClick={(e)=>this.cancel(e)}>cancel</button>
              </form>
            </div>
        </div>
      </div>
    );
  }; // end render
}

const item = {
  _id: PropTypes.any,
  task: PropTypes.string,
};
TaskList.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape(item)).isRequired,
  fetchTaskList: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
export default TaskList;
