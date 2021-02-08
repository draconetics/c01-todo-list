import React from 'react';
import PropTypes from 'prop-types';

export default function TodoListEditItem({
  item, index, saveTodo, cancelSetting, updateRefEditItems,
}) {
  return (
    <>
      <ul
        className="todolist__content-edit-item"
        ref={(element) => updateRefEditItems(index, element)}
      >
        <li>{item.id}</li>
        <li>
          <input type="text" defaultValue={item.todo} />
        </li>
        <li>
          <div>
            <button
              className="btn"
              type="button"
              onClick={() => saveTodo(item.id, index)}
            >
              Save
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => cancelSetting(index)}
            >
              Cancel
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
TodoListEditItem.propTypes = {
  item: PropTypes.shape(item).isRequired,
  index: PropTypes.number.isRequired,
  saveTodo: PropTypes.func.isRequired,
  cancelSetting: PropTypes.func.isRequired,
  updateRefEditItems: PropTypes.func.isRequired,
};
