/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      editTask: {
        _id: '',
        task: '',
      },
    };
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    const { fetchTaskList } = this.props;
    fetchTaskList();
  }

  handleInput(e) {
    this.setState({ task: e.target.value });
  }

  handleEditTask(e) {
    e.preventDefault();
    const { editTask } = this.state;
    this.setState({ editTask: { ...editTask, task: e.target.value } });
  }

  updateTask(e) {
    e.preventDefault();
    const { updateTask } = this.props;
    const { editTask } = this.state;
    if (editTask.task.trim() === '') {
      this.modalRef.current.classList.toggle('show');
      return;
    }

    updateTask(editTask);
    this.modalRef.current.classList.toggle('show');
  }

  saveTask(e) {
    e.preventDefault();
    console.log('save');
    const { saveTask } = this.props;
    const { task } = this.state;
    if (task.trim() === '') {
      return;
    }
    saveTask(task);
    this.setState({ task: '' });
  }

  editTask(item) {
    console.log(item);
    this.modalRef.current.classList.toggle('show');
    this.setState({ editTask: item });
  }

  cancel(e) {
    e.preventDefault();
    console.log(this.modalRef.current);
    this.modalRef.current.classList.toggle('show');
  }

  deleteTask(id) {
    const { deleteTask } = this.props;
    deleteTask(id);
  }

  asignReference(element) {
    this.modalRef.current = element;
  }

  render() {
    const { task, editTask } = this.state;
    const { taskList } = this.props;

    return (
      <div className="tasklist container" data-test="TaskList">
        <form className="tasklist__form" onSubmit={(e) => this.saveTask(e)}>
          <input
            type="text"
            onChange={(e) => this.handleInput(e)}
            value={task}
          />
          <button type="submit" className="btn">
            Add new task
          </button>
        </form>
        <div className="tasklist__content">
          {taskList
            && taskList.map((item, index) => (
              <div key={item._id}>
                <ul className="tasklist__item">
                  <li>{index + 1}</li>
                  <li>{item.task}</li>
                  <li>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => this.editTask(item)}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => this.deleteTask(item._id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            ))}
        </div>
        <div className="modal" ref={(element) => this.asignReference(element)}>
          <div className="modal__content">
            <div className="modal__title">Edit your item</div>
            <form className="modal__form" onSubmit={(e) => this.updateTask(e)}>
              <input
                type="text"
                value={editTask.task}
                onChange={(e) => this.handleEditTask(e)}
              />
              <button type="submit" className="btn">
                save
              </button>
              <button type="button" className="btn" onClick={(e) => this.cancel(e)}>
                cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } // end render
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
