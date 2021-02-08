import React from 'react';
import { mount } from 'enzyme';
import TaskList from './TaskList';

describe('#TaskList', () => {
  describe('#TaskList Render', () => {
    let wrapper;

    beforeAll((done) => {
      const props = {
        taskList: [{ _id: 1, task: 'example01' }, { _id: 2, task: 'example02' }],
        fetchTaskList: jest.fn(),
        updateTask: jest.fn(),
        saveTask: jest.fn(),
        deleteTask: jest.fn(),
      };
      /* eslint-disable react/jsx-props-no-spreading */
      wrapper = mount(<TaskList {...props} />);
      done();
    });

    it('should render component', () => {
      const taskList = wrapper.find('[data-test="TaskList"]');
      expect(taskList).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
