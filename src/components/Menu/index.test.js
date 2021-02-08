import React from 'react';
import { shallow } from 'enzyme';
import Menu from './index';

describe('#Menu', () => {
  describe('#Menu Render', () => {
    let appWrapper;

    beforeAll((done) => {
      appWrapper = shallow(<Menu />);
      done();
    });
    it('should render Menu without errors', () => {
      const addTodoComponent = appWrapper.find('[data-test=\'Menu\']');
      expect(addTodoComponent).toHaveLength(1);
    });
  });
});
