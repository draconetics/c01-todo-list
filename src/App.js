import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainMenu from './components/MenuComponent'
import TodoList from './components/TodoListComponent'
import TodoListAxios from './components/TodoListAxiosComponent'

function App(props) {



  return (
    <div className="App">
      <Router>
        <MainMenu></MainMenu>
        <Switch>
          <Route exact path="/">
              <TodoList></TodoList>   
          </Route>
          <Route path="/todolist-axios">
              <TodoListAxios></TodoListAxios>   
          </Route>
          
        </Switch>
   
      </Router>
    </div>
  );
}


export default App;
