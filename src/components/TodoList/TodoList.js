import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import TodoListForm from './TodoListForm';
import TodoListItem from './TodoListItem';
import TodoListEditItem from './TodoListEditItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    };
    this.refItems = [];
    this.refEditItems = [];
    const { todoList } = this.props;
    this.updateReferences(todoList);
  }

  setTodoItem(e) {
    console.log('setTodoItem');
    this.setState({ todo: e.target.value });
  }

  cancelSetting(index) {
    this.refItems[index].current.classList.add('show');
    this.refEditItems[index].current.classList.remove('show');
  }

  saveTodo(id, index) {
    const { editTodo } = this.props;
    const inputValue = this.refEditItems[index].current.querySelector('input')
      .value;
    editTodo(id, inputValue);
    this.cancelSetting(index);
  }

  editTodoByIndex(index) {
    console.log('edit by reference');
    this.refItems[index].current.classList.remove('show');
    this.refEditItems[index].current.classList.add('show');
  }

  deleteTodo(id) {
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
    //   this.insertRefTodo();
    this.setState({ todo: '' });
  }

  insertRefTodo() {
    this.refItems.push(React.createRef());
    this.refEditItems.push(React.createRef());
  }

  updateReferences(todoList) {
    if (
      todoList.length === this.refItems.length
      && todoList === this.refEditItems.length
    ) { return; }

    this.refItems = [todoList.length];
    this.refEditItems = [todoList.length];
    todoList.map((reg, index) => {
      this.refItems[index] = React.createRef();
      this.refEditItems[index] = React.createRef();
      return reg;
    });
  }

  updateRefItems(index, element) {
    if (index >= 0 && index < this.refItems.length) { this.refItems[index].current = element; }
  }

  updateRefEditItems(index, element) {
    if (index >= 0 && index < this.refEditItems.length) {
      this.refEditItems[index].current = element;
    }
  }

  render() {
    const { todo } = this.state;
    const { todoList } = this.props;
    this.updateReferences(todoList);
    return (
      <div className="todolist container" data-test="TodoList">
        <TodoListForm
          todo={todo}
          insertTodo={this.insertTodo}
          setTodoItem={this.setTodoItem}
        />
        <div className="todolist__content">
          {todoList
            && todoList.map((item, index) => (
              <div className="todolist__content-row" key={item.id}>
                <TodoListItem
                  index={index}
                  item={item}
                  editTodoByIndex={this.editTodoByIndex}
                  deleteTodo={this.deleteTodo}
                  updateRefItems={this.updateRefItems}
                />
                <TodoListEditItem
                  item={item}
                  index={index}
                  saveTodo={this.saveTodo}
                  cancelSetting={this.cancelSetting}
                  updateRefEditItems={this.updateRefEditItems}
                />
              </div>
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
