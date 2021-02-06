import React from 'react';
import logo from '../../logo.svg';
import {NavLink} from 'react-router-dom'
import './index.css'

export default ()=>{
    return (
        <header className="App-header" data-test="Menu">
            <div className="main-nav">
                <div className="logo-container">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>TodoList</div>
                </div>
                <ul className="main-menu">
                    <li><NavLink exact={true} activeClassName='active' to='/'>Todo List</NavLink></li>
                    <li><NavLink activeClassName='active' to='/todolist-axios'>Todo List with Axios</NavLink></li>
                </ul>
            </div>
        </header>
    );
}
