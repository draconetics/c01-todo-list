import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component{

    constructor(props){
      super(props);
      this.state={
        todo:''
      }
      this.refItems = [];
      this.refEditItems = [];
      this.updateReferences(this.props.todoList);
    }

    updateReferences = (todoList) => {
      console.log(todoList);
      if(todoList.length === this.refItems.length)
        return;
      console.log('next step')
      this.refItems = [todoList.length];
      this.refEditItems = [todoList.length];
      todoList.map((reg,index) => {
        this.refItems[index] = React.createRef();
        this.refEditItems[index] = React.createRef();
        return reg;
      });
      console.log(this.refItems)
      console.log(this.refEditItems)
    }
/* 
    static getDerivedStateFromProps = (props, state) => {
        console.log(state);
        console.log(props);
        let { refItems, refEditItems } = state;

        if(state.refItems.length !== props.todoList.length){
          props.todoList.map((reg) => {
            refItems.push(React.createRef());
            refEditItems.push(React.createRef());
            return reg;
          });
          return {
            ...state,
            refItems,
            refEditItems
          }
        }

        return null;
    } */

    insertRefTodo = () => {
      this.refItems.push(React.createRef())
      this.refEditItems.push(React.createRef());
    }

    insertTodo = (e)=>{
      e.preventDefault();
      console.log("inserting new element")
      console.log(this.state);
      const { todoList, addTodo } = this.props;
      const newTodo = {
        id: todoList.length +1,
        todo: this.state.todo
      }
      addTodo(newTodo);
   //   this.insertRefTodo();
      this.setState({todo:''}) 
    };
  
    deleteTodo = (id, index)=>{
        const {deleteTodo} = this.props;
        deleteTodo(id).then(()=>{
          //this.deleteRefTodo(index);
        });
    }
  
    editTodoByIndex = (index)=>{
      console.log(this.refItems);
      this.refItems[index].current.classList.remove('show');
      this.refEditItems[index].current.classList.add('show');
    }
  
    saveTodo =(id, index)=>{
        console.log(this.refEditItems[index].current.querySelector('input').value);
        const { editTodo } = this.props;
        let inputValue = this.refEditItems[index].current.querySelector('input').value;
        editTodo(id,inputValue);
        this.cancelSetting(index); 
    }
  
    cancelSetting = (index)=>{
      this.refItems[index].current.classList.add('show');
      this.refEditItems[index].current.classList.remove('show'); 
    }

    setTodoItem = (e) => {
      this.setState({todo:e.target.value})
    }

    updateRefItems = (index, element) => {
      if(0 <= index && index<this.refItems.length)
      this.refItems[index].current = element;
    }

    updateRefEditItems = (index, element) => {
      if(0 <= index && index<this.refEditItems.length)
      this.refEditItems[index].current = element;
    }

    render = () => {
      const { todo } = this.state;
      const { todoList } = this.props;
    
      this.updateReferences(todoList);
      return (
        <div className="todolist container" data-test="TodoList">
        <form onSubmit={(e)=>this.insertTodo(e)} className="todolist-add">
            <input type="text" value={todo} placeholder="I want to do..." onChange={(e)=>this.setTodoItem(e)}/>
            <button className="btn" type="submit">New Todo</button>
        </form>
        <div className="todolist-list">
              {
                    todoList && todoList.map((item,index)=>{
                        return (
                          <div key={item.id}>
                          <ul className="task-item show" ref={element => this.updateRefItems(index,element)}>
                              <li>
                                {item.id}
                              </li>
                              <li>
                                  <div>{item.todo}</div>
                              </li>
                              <li>
                                <div>
                                    <button className="btn" onClick={()=>this.editTodoByIndex(index)}>edit</button>
                                    <button className="btn" onClick={()=>this.deleteTodo(item.id, index)}>delete</button>
                                </div>
                              </li>
                          </ul>
                          <ul className="edit-task" ref={element => this.updateRefEditItems(index, element)}>
                              <li>
                                {item.id}
                              </li>
                              <li>
                                  <input type="text" defaultValue={item.todo}></input>
                              </li>
                              <li>
                                <div>
                                    <button className="btn" onClick={()=>this.saveTodo(item.id, index)}>Save</button>
                                    <button className="btn" onClick={()=>this.cancelSetting(index)}>Cancel</button>
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
  }// end render
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