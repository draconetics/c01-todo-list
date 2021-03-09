import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoItem({ item, deleteTodo, updateTodo }) {
  const [todoContent, setTodoContent] = useState(item.todo || '');
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setTodoContent(e.target.value);
  console.log('render todoitem');
  const ItemText = () => {
    if (editMode) {
      return (
        <input
          type="text"
          value={todoContent}
          onChange={(e) => handleChange(e)}
          className="todolist__input show"
        />
      );
    }
    return (
      <div>{todoContent}</div>
    );
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
        <>
          <button type="button" onClick={() => updateItem()} className="btn btn-save">
            Save
          </button>
          <button type="button" onClick={() => changeToShowMode()} className="btn">
            Cancel
          </button>
        </>
      );
    }
    return (
      <>
        <button type="button" onClick={() => changeToEditMode()} className="btn btn-edit">
          Edit
        </button>
        <button type="button" onClick={() => deleteTodo(item.id)} className="btn btn-delete">
          Delete
        </button>
      </>
    );
  };

  return (
    <ul data-test="TodoItem" className="todolist__content-row">
      <li>{item.id}</li>
      <li>{ItemText()}</li>
      <li>{ItemOption()}</li>
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

export default React.memo(TodoItem);
