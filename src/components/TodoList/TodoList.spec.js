import React from 'react';
import { mount, shallow } from 'enzyme';
import TodoList from './TodoList'

describe("#TodoList",()=>{
    describe("#TodoList Render", ()=>{
        
        let wrapper;

        beforeAll((done)=>{
            let props = {
                todoList:[], 
                addTodo:jest.fn(), 
                deleteTodo:jest.fn(), 
                editTodo:jest.fn()
            }
            wrapper = mount(<TodoList {...props}/>)
            done();
        })
        it('should render Menu without errors',()=>{
            const addTodoComponent = wrapper.find(`[data-test='TodoList']`);
            expect(addTodoComponent).toHaveLength(1);
        })
    })

    describe("#TodoList Events", ()=>{
        
        let wrapper;
        let spyAddTodo;

        beforeAll((done)=>{
            spyAddTodo = jest.fn();
            let props = {
                todoList:[{id:1,todo:"example01"},{id:2,todo:"example02"}], 
                addTodo:spyAddTodo, 
                deleteTodo:jest.fn(), 
                editTodo:jest.fn()
            }
            wrapper = mount(<TodoList {...props}/>)
            done();
        })
        it('should add new todo item', () => {
            const inputForm = wrapper.find('form input');
            expect(inputForm).toHaveLength(1);
            inputForm.simulate('change', { target: { value: 'new todo' } });

            const createButton = wrapper.findWhere((node) => node.type() === 'button' && node.text() === 'New Todo');
            expect(createButton).toHaveLength(1);
            createButton.simulate('click', {preventDefault: () => {}});
            
            console.log(wrapper.debug());
            
            expect(spyAddTodo).toHaveBeenCalledTimes(1);
            /* 
            expect(wrapper.find('.custom-modal h3').text()).toBe(
              'Create new register',
            ); */
          });
    })
})