import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, addTodo, deleteTodo, editTodo })=>{

    const [todo, setTodo] = useState("");
    const refItems = useRef([]);
    const refEditItems = useRef([]);

    const insertTodo = (e)=>{
      e.preventDefault();
      console.log("inserting new element")
      const newTodo = {
        id: todoList.length +1,
        todo
      }
      addTodo({type:'ADD',value:newTodo});
      setTodo("");
    };
  
    const deleteTodoById = (id)=>{
        deleteTodo({type:'DELETE',value:{id}});
    }
  
    const editTodoByIndex = (index)=>{
      console.log(refItems.current[index]);
      refItems.current[index].classList.remove('show');
      refEditItems.current[index].classList.add('show');
    }
  
    const saveTodo =(id, index)=>{
        console.log(refEditItems.current[index].querySelector('input').value);
        let inputValue = refEditItems.current[index].querySelector('input').value;
        editTodo({type:'EDIT',value:{id,todo:inputValue}})
        cancelSetting(index);
    }
  
    const cancelSetting = (index)=>{
      refItems.current[index].classList.add('show');
      refEditItems.current[index].classList.remove('show');
    }

    return (
        <div className="todolist container" data-test="TodoList">
        <form onSubmit={(e)=>insertTodo(e)} className="todolist-add">
            <input type="text" value={todo} placeholder="I want to do..." onChange={(e)=>setTodo(e.target.value)}/>
            <button className="btn" type="submit">New Todo</button>
        </form>
        <div className="todolist-list">
              {
                    todoList && todoList.map((item,index)=>{
                        return (
                          <div key={index}>
                          <ul className="task-item show" ref={(element) => refItems.current.push(element)} >
                              <li>
                                {item.id}
                              </li>
                              <li>
                                  <div>{item.todo}</div>
                              </li>
                              <li>
                                <div>
                                    <button className="btn" onClick={()=>editTodoByIndex(index)}>edit</button>
                                    <button className="btn" onClick={()=>deleteTodoById(index)}>delete</button>
                                </div>
                              </li>
                          </ul>
                          <ul className="edit-task" ref={(element) => refEditItems.current.push(element)}>
                              <li>
                                {item.id}
                              </li>
                              <li>
                                  <input type="text" defaultValue={item.todo}></input>
                              </li>
                              <li>
                                <div>
                                    <button className="btn" onClick={()=>saveTodo(item.id, index)}>Save</button>
                                    <button className="btn" onClick={()=>cancelSetting(index)}>Cancel</button>
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

const item = {
  id: PropTypes.any,
  todo: PropTypes.string,
};
TodoList.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape(item),
  ).isRequired,
};
export default TodoList;