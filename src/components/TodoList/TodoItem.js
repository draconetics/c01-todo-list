import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoItem({ item, deleteTodo, updateTodo }) {
  const [todoContent, setTodoContent] = useState(item.todo || '');
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setTodoContent(e.target.value);

  const ItemText = () => {
    if (editMode) {
      return (
        <li>
          <input
            type="text"
            value={todoContent}
            onChange={(e) => handleChange(e)}
          />
        </li>
      );
    }
    return <li>{item.todo}</li>;
  };

  const changeToEditMode = () => setEditMode(true);
  const changeToShowMode = () => {
    setEditMode(false);
    setTodoContent(item.todo);
  };
  const updateItem = () => {
    updateTodo({ id: item.id, todo: todoContent });
    changeToShowMode();
  };

  const ItemOption = () => {
    if (editMode) {
      return (
        <li>
          <button type="button" onClick={() => updateItem()} className="btn">
            Save
          </button>
          <button type="button" onClick={() => changeToShowMode()} className="btn">
            Cancel
          </button>
        </li>
      );
    }
    return (
      <li>
        <button type="button" onClick={() => changeToEditMode()} className="btn">
          Edit
        </button>
        <button type="button" onClick={() => deleteTodo(item.id)} className="btn">
          Delete
        </button>
      </li>
    );
  };

  return (
    <ul data-test="TodoItem" className="todolist__content-row" key={item.id}>
      <li>{item.id}</li>
      {ItemText()}
      {ItemOption()}
    </ul>
  );
}

const item = {
  id: PropTypes.any,
  todo: PropTypes.string,
};
TodoItem.propTypes = {
  item: PropTypes.shape(item).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoItem;
