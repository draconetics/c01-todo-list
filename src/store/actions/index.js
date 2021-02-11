/* eslint-disable no-underscore-dangle */
import TaskService from '../../services/TaskService';

export const fetchTaskList = async (dispatch) => {
  await TaskService.getAll()
    .then((resp) => {
      dispatch({ type: 'FETCH_TASKLIST', value: resp.data.results });
    })
    .catch((e) => console.log(e));
};

export const updateTask = (item) => async (dispatch) => {
  await TaskService.updateTask(item._id, item)
    .then((resp) => {
      dispatch({ type: 'UPDATE_TASK', value: resp.data });
    })
    .catch((e) => console.log(e));
};

export const saveTask = (task) => async (dispatch) => {
  const newTask = { task };
  await TaskService.createTask(newTask)
    .then((resp) => {
      dispatch({ type: 'CREATE_TASK', value: resp.data });
    })
    .catch((e) => console.log(e));
};

export const deleteTask = (id) => async (dispatch) => {
  await TaskService.deleteTask(id)
    .then((resp) => {
      console.log(typeof resp.data);
      console.log(resp.data);
      dispatch({ type: 'DELETE_TASK', value: resp.data.deleted });
    })
    .catch((e) => console.log(e));
};
