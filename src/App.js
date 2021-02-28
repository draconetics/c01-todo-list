import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainMenu from './components/Menu';
import TodoList from './components/TodoList';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Router>
        <MainMenu />
        <Switch>
          <Route exact path="/">
            <TodoList />
          </Route>
          <Route path="/tasklist">
            <TaskList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
