import React, {useState} from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux';
import './App.css';


function App(props) {

  const [task, setTask] = useState("");
    
  const addNewTask = ()=>{
    const newTask = {
      id: props.tasks.length +1,
      task: task
    }
    props.dispatch({type:'ADD',value:newTask});
    setTask("");
  };

  const deleteTask = (id)=>{
      props.dispatch({type:'DELETE',value:{id}});
  }

  const editTask = (id)=>{
      const taskItem=document.getElementById("taskItem-"+id);
      taskItem.classList.remove("show");
      const editTask=document.getElementById("editTask-"+id);
      editTask.classList.add("show");
  }

  const saveEditedTask=(id)=>{
      const editedTask=document.getElementById("input-"+id);
      props.dispatch({type:'EDIT',value:{id,task:editedTask.value}})

      const taskItem=document.getElementById("taskItem-"+id);
      taskItem.classList.add("show");
      const editTask=document.getElementById("editTask-"+id);
      editTask.classList.remove("show");
  }

  const cancelEdition = (id)=>{
      const taskItem=document.getElementById("taskItem-"+id);
      taskItem.classList.add("show");
      const editTask=document.getElementById("editTask-"+id);
      editTask.classList.remove("show");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="logo-container">
              <img src={logo} className="App-logo" alt="logo" />
              <div>TodoList</div>
          </div>
        </div>
      </header>
      
      <div className="todolist container">
        <div className="todolist-add">
            <input type="text" value={task} placeholder="I want to do..." onChange={(e)=>setTask(e.target.value)}/>
            <button type="button" className="btn" onClick={()=>addNewTask()}>New Task</button>
        </div>
          {
              props.tasks && props.tasks.map((item,index)=>{
                  return (
                    <div key={item.id}>
                    <ul className="task-item show" id={"taskItem-"+item.id} >
                        <li>
                          {item.id}
                        </li>
                        <li>
                            <div>{item.task}</div>
                        </li>
                        <li>
                          <div>
                              <button className="btn" onClick={()=>editTask(item.id)}>edit</button>
                              <button className="btn" onClick={()=>deleteTask(item.id)}>delete</button>
                          </div>
                        </li>
                    </ul>
                    <ul className="edit-task" id={"editTask-"+item.id} >
                        <li>
                          {item.id}
                        </li>
                        <li>
                            <input type="text" id={"input-" + item.id} defaultValue={item.task}></input>
                        </li>
                        <li>
                          <div id={"edit-buttons-"+item.id}>
                              <button className="btn" onClick={()=>saveEditedTask(item.id)}>Save</button>
                              <button className="btn" onClick={()=>cancelEdition(item.id)}>Cancel</button>
                          </div>
                        </li>
                    </ul>
                    
                    </div>
                    );
              })
          }      
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
      tasks: state
  };
}

export default connect(mapStateToProps)(App);
