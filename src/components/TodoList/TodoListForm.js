import React from 'react';
import PropTypes from 'prop-types';

export default function TodoListForm({ todo, insertTodo, setTodoItem }) {
  return (
    <>
      <form onSubmit={(e) => insertTodo(e)} className="todolist__form">
        <input type="text" value={todo} placeholder="I want to do..." onChange={(e) => setTodoItem(e)} />
        <button className="btn" type="submit">New Todo</button>
      </form>
    </>
  );
}
TodoListForm.propTypes = {
  todo: PropTypes.string.isRequired,
  insertTodo: PropTypes.func.isRequired,
  setTodoItem: PropTypes.func.isRequired,
};
