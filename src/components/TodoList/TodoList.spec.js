import React from 'react';
import { mount } from 'enzyme';
import TodoList from './TodoList';

describe('#TodoList', () => {
  describe('#TodoList Render', () => {
    let wrapper;

    beforeAll((done) => {
      const props = {
        todoList: [{ id: 1, todo: 'example01' }, { id: 2, todo: 'example02' }],
        addTodo: jest.fn(),
        deleteTodo: jest.fn(),
        editTodo: jest.fn(),
      };
      /* eslint-disable react/jsx-props-no-spreading */
      wrapper = mount(<TodoList {...props} />);
      done();
    });
    it('should render TodoList component without errors', () => {
      const addTodoComponent = wrapper.find('[data-test=\'TodoList\']');
      expect(addTodoComponent).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render form to add new todo list', () => {
      const inputAddTodo = wrapper.find('.todolist form input');
      expect(inputAddTodo).toHaveLength(1);

      const buttonAddTodo = wrapper.find('.todolist form button');
      expect(buttonAddTodo).toHaveLength(1);
    });

    it('should render all rows of content in todoList', () => {
      const todolistContentRow = wrapper.find('.todolist__content .todolist__content-row');
      expect(todolistContentRow).toHaveLength(wrapper.props().todoList.length);
      // expect(createButton).toHaveLength(4);
    });
  });

  describe('#TodoList Events', () => {
    let wrapper;
    let spyAddTodo;
    let props;

    beforeAll((done) => {
      spyAddTodo = jest.fn();
      props = {
        todoList: [{ id: 1, todo: 'example01' }, { id: 2, todo: 'example02' }],
        addTodo: spyAddTodo,
        deleteTodo: jest.fn(),
        editTodo: jest.fn(),
      };
      /* eslint-disable react/jsx-props-no-spreading */
      wrapper = mount(<TodoList {...props} />);
      done();
    });
    it('should add new todo item', () => {
      /* eslint-disable react/jsx-props-no-spreading */
      wrapper = mount(<TodoList {...props} />);

      const inputForm = wrapper.find('.todolist__form input');
      expect(inputForm).toHaveLength(1);
      inputForm.simulate('change', { target: { value: 'new todo' } });

      const form = wrapper.find('form').first();
      expect(form).toHaveLength(1);
      form.simulate('submit', { preventDefault: jest.fn() });

      expect(spyAddTodo).toHaveBeenCalledTimes(1);
    });
  });
});
