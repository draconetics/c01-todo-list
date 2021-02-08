import React from 'react';
import PropTypes from 'prop-types';

export default function TodoListItem({
  index,
  item,
  editTodoByIndex,
  deleteTodo,
  updateRefItems
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
            <button className="btn" onClick={() => editTodoByIndex(index)}>
              edit
            </button>
            <button className="btn" onClick={() => deleteTodo(item.id, index)}>
              delete
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}

TodoListItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
  editTodoByIndex: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateRefItems: PropTypes.any.isRequired
};
