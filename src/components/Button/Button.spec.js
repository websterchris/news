import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Button from './Button';


beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

describe('The Button Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Button />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render a <button> element', () => {
            const wrapper = shallow(<Button text={"text"} />);
            expect(wrapper.find('button')).toHaveLength(1);
        });

        it('should render `props.text`', () => {
            const wrapper = shallow(<Button text={"text"} />);
            expect(wrapper.find('button').text()).toBe("text")
        });

        it('should pass `props.onClick` to onClick', () => {
            const onClick = jest.fn();
            const wrapper = shallow(<Button onClick={onClick} />);
            wrapper.find('button').simulate('click');
            expect(onClick).toHaveBeenCalledTimes(1);
        });

})
})
