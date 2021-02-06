import { combineReducers } from 'redux';
import taskAxiosReducer from './taskAxiosReducer'
import todoReducer from './todoReducer'

export default combineReducers({
    todoAxios: taskAxiosReducer, todoReducer
});