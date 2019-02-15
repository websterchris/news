import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Text from './Text';


beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

describe('The Typography/Text Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Text />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render a <p> element', () => {
            const wrapper = shallow(<Text text={"text"} />);
            expect(wrapper.find('p')).toHaveLength(1);
        });

        it('should render `props.text`', () => {
            const wrapper = shallow(<Text text={"text"} />);
            expect(wrapper.find('p').text()).toBe("text")
          });

})
})
