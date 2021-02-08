/* eslint-disable no-underscore-dangle */
import moxios from 'moxios';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../store/reducers/index';
import {
  fetchTaskList,
  updateTask,
  saveTask,
  deleteTask,
} from '../../store/actions/index';
import TaskService from '../../services/TaskService';

const middlewares = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const taskList = [
  {
    _id: '1',
    task: 'Example title 1',
  },
  {
    _id: '2',
    task: 'Example title 2',
  },
  {
    _id: '3',
    task: 'Example title 3',
  },
];

describe('#Task store', () => {
  beforeEach(() => {
    moxios.install(TaskService.getInstance());
  });

  afterEach(() => {
    moxios.uninstall(TaskService.getInstance());
  });

  it('should FETCH item to taskReducer.taskList', async () => {
    const store = createStoreWithMiddleware(rootReducer);
    // console.log(store);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { results: taskList } });
    });

    await store.dispatch(fetchTaskList).then(() => {
      const newState = store.getState();
      // console.log(newState);
      expect(taskList).toEqual(newState.taskReducer.taskList);
    });
  });

  it('should UPDATE item from taskReducer.taskList', async () => {
    const store = createStoreWithMiddleware(rootReducer);
    moxios.stubRequest('/tasks', {
      status: 200,
      response: { results: taskList },
    });

    const editedItem = {
      _id: '3',
      task: 'Example title 3- starin',
    };

    moxios.stubRequest('/tasks/3', {
      status: 200,
      response: editedItem,
    });

    await store.dispatch(fetchTaskList);
    await store.dispatch(updateTask(editedItem)).then(() => {
      const newState = store.getState();
      // console.log(newState);

      expect(editedItem).toEqual(newState.taskReducer.taskList[2]);
    }); // fin function
  });

  it('should CREATE new item to taskReducer.taskList', async () => {
    const store = createStoreWithMiddleware(rootReducer);
    const newItem = {
      _id: '3',
      task: 'new note created',
    };

    moxios.stubRequest('/tasks', {
      status: 200,
      response: newItem,
    });

    await store.dispatch(saveTask(newItem.task)).then(() => {
      const newState = store.getState();
      // console.log(newState);
      expect(newItem).toEqual(newState.taskReducer.taskList[0]);
    }); // fin function
  });

  it('should DELETE item from taskReducer.taskList', async () => {
    const store = createStoreWithMiddleware(rootReducer);
    const newItem = {
      _id: '3',
      task: 'new note created',
    };

    moxios.stubRequest('/tasks', {
      status: 200,
      response: newItem,
    });

    await store.dispatch(saveTask(newItem.task));

    // 2nd step: DELETE inserted item
    moxios.stubRequest(`/tasks/${newItem._id}`, {
      status: 200,
      response: newItem._id,
    });
    await store.dispatch(deleteTask(newItem._id)).then(() => {
      const { taskList: list } = store.getState().taskReducer;
      expect(list.length).toEqual(0);
    });
  });
});
