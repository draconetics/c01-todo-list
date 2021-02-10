import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import TodoListForm from './TodoListForm';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    };

    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.setTodoItem = this.setTodoItem.bind(this);
    this.insertTodo = this.insertTodo.bind(this);
  }

  setTodoItem(e) {
    console.log('setTodoItem');
    this.setState({ todo: e.target.value });
  }

  updateTodo(item) {
    const { editTodo } = this.props;
    editTodo(item);
  }

  deleteTodo(id) {
    console.log(this.props);
    const { deleteTodo } = this.props;
    deleteTodo(id);
  }

  insertTodo(e) {
    e.preventDefault();
    const { todoList, addTodo } = this.props;
    const { todo } = this.state;
    const newTodo = {
      id: todoList.length + 1,
      todo,
    };
    addTodo(newTodo);
    this.setState({ todo: '' });
  }

  render() {
    const { todo } = this.state;
    const { todoList } = this.props;
    return (
      <div className="todolist container" data-test="TodoList">
        <TodoListForm
          todo={todo}
          insertTodo={this.insertTodo}
          setTodoItem={this.setTodoItem}
        />
        <div className="todolist__content">
          {todoList
            && todoList.map((item) => (
                <TodoItem
                  item={item}
                  deleteTodo={this.deleteTodo}
                  updateTodo={this.updateTodo}
                />
            ))}
        </div>
      </div>
    );
  } // end render
}

const item = {
  id: PropTypes.any,
  todo: PropTypes.string,
};
TodoList.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape(item)).isRequired,
};
export default TodoList;
