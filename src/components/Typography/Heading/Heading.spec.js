import React from 'react';
import Heading from './Heading';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'



beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

describe('The Typography/Heading Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Heading />).toJSON();
            expect(tree).toMatchSnapshot();
        });

         it('should render an <h3> element if `props.weight` === undefined', () => {
             const wrapper = shallow(<Heading text={"text"} />);
             expect(wrapper.find('h3')).toHaveLength(1);
         });

         it('should render an <h{props.weight}> element if `props.weight` has a value', () => {
          const wrapper = shallow(<Heading weight={1} />);
          expect(wrapper.find('h1')).toHaveLength(1);
      });

        it('should render the `prop.text`', () => {
          const wrapper = shallow( < Heading text = "text" /> );
          expect(wrapper.find('h3').text()).toBe("text")
        });



})
})
