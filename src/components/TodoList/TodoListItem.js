import React from 'react';
import PropTypes from 'prop-types';

export default function TodoListItem({
  index,
  item,
  editTodoByIndex,
  deleteTodo,
  updateRefItems,
}) {
  return (
    <>
      <ul
        className="todolist__content-item show"
        ref={(element) => updateRefItems(index, element)}
      >
        <li>{item.id}</li>
        <li>
          <div>{item.todo}</div>
        </li>
        <li>
          <div>
            <button type="button" className="btn" onClick={() => editTodoByIndex(index)}>
              edit
            </button>
            <button type="button" className="btn" onClick={() => deleteTodo(item.id)}>
              delete
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}

const item = {
  id: PropTypes.any,
  todo: PropTypes.string,
};
TodoListItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape(item).isRequired,
  editTodoByIndex: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateRefItems: PropTypes.func.isRequired,
};
