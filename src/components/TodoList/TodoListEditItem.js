import React from 'react';
import PropTypes from 'prop-types';

export default function TodoListEditItem({item, index, saveTodo, cancelSetting, updateRefEditItems}) {
  return (
    <>
      <ul
        className="todolist__content-edit-item"
        ref={(element) => updateRefEditItems(index, element)}
      >
        <li>{item.id}</li>
        <li>
          <input type="text" defaultValue={item.todo}></input>
        </li>
        <li>
          <div>
            <button
              className="btn"
              onClick={() => saveTodo(item.id, index)}
            >
              Save
            </button>
            <button className="btn" onClick={() => cancelSetting(index)}>
              Cancel
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}


TodoListEditItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    saveTodo: PropTypes.func.isRequired,
    cancelSetting: PropTypes.func.isRequired,
    updateRefEditItems: PropTypes.func.isRequired
}