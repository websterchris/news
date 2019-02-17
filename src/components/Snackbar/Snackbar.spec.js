import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Snackbar from './Snackbar';
import Text from '../Typography/Text/Text'


beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

describe('The Snackbar Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Snackbar />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render a [data-spec="snackbar-container"] element', () => {
            const wrapper = shallow(<Snackbar text={"text"} />);
            expect(wrapper.find('[data-spec="snackbar-container"]')).toHaveLength(1);
        });

        it('should render two Text elements', () => {
            const wrapper = shallow(<Snackbar text={"text"} />);
            expect(wrapper.find(Text)).toHaveLength(2);
        });

        it('should pass `props.text` to [data-spec="snackbar-text"]', () => {
            const wrapper = shallow(<Snackbar text={"text"} />);
            expect(wrapper.find('[data-spec="snackbar-text"]').props().text).toBe("text")
        });

        it('should call `props.onClose` when [data-spec="snackbar-close"] is clicked', () => {
            const onClose = jest.fn();
            const wrapper = shallow(<Snackbar onClose={onClose} />);
            wrapper.find('[data-spec="snackbar-close"]').simulate('click');
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it('should call `props.onClose` after `props.duration` has elapsed ', () => {
            const onClose = jest.fn();
            const wrapper = shallow(<Snackbar onClose={onClose} duration={10}/>);
            setTimeout(() => {
                expect(onClose).toHaveBeenCalledTimes(1);
            }, 15)
            
        });

})
})
