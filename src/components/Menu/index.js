import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg';
import './index.css';

export default () => (
  <header className="App-header" data-test="Menu">
    <div className="main-nav">
      <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
        <div>TodoList</div>
      </div>
      <ul className="main-menu">
        <li><NavLink exact activeClassName="active" to="/">Todo List</NavLink></li>
        <li><NavLink activeClassName="active" to="/todolist-axios">Todo List with Axios</NavLink></li>
      </ul>
    </div>
  </header>
);
