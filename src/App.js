import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainMenu from './components/Menu'
import TodoList from './components/TodoList'
import TodoListAxios from './components/TodoListAxiosComponent'

function App(props) {

  return (
    <div className="App">
      <Router>
        <MainMenu></MainMenu>
        <Switch>
          <Route exact path="/">
              <TodoList />   
          </Route>
          <Route path="/todolist-axios">
              <TodoListAxios />   
          </Route>
          
        </Switch>
   
      </Router>
    </div>
  );
}


export default App;
