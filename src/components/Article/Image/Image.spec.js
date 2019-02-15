import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Image from './Image'

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('The Article/Image Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Image />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render a <div> with an <img/> child', () => {
            const wrapper = shallow(<Image />);
            const img_container = wrapper.find('div')
            expect(img_container).toHaveLength(1);
            expect(img_container.find('img')).toHaveLength(1);
        });

        it('should assign <img> src to `props.src`', () => {
            const wrapper = shallow(<Image src={"test"} />);
            expect(wrapper.find('img').props().src).toBe("test");
        });

        it('should assign <img> alt to `props.alt`', () => {
            const wrapper = shallow(<Image alt={"test"} />);
            expect(wrapper.find('img').props().alt).toBe("test");
        });

        it('should assign <img> height to `props.height`', () => {
            const wrapper = shallow(<Image height={"10"} />);
            expect(wrapper.find('img').props().height).toBe("10");
        });

        it('should assign <img> width to `props.width`', () => {
            const wrapper = shallow(<Image width={"20"} />);
            expect(wrapper.find('img').props().width).toBe("20");
        });
    })
})
