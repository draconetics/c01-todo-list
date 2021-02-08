import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import todoReducer from './todoReducer';

export default combineReducers({
  taskReducer, todoReducer,
});
