import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
//import rootReducer from './reducers'
import taskReducer from './reducers/taskReducer'
import taskAxiosReducer from './reducers/taskAxiosReducer'

//const store = createStore(taskAxios);
const rootReducer = createStore(combineReducers({todoAxios: taskAxiosReducer, todo: taskReducer}))
// This would produce the following state object

ReactDOM.render(
  <Provider store={rootReducer}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
