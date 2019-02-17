import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import UnorderedList from './UnorderedList'
import Text from '../../Typography/Text/Text'

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('The Article/Unordered Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<UnorderedList />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should not render a <ul> if `props.items` is empty', () => {
            const wrapper = shallow(<UnorderedList items={[]} />);
            expect(wrapper.find('ul')).toHaveLength(0);
        });

        it('should  render a <ul> if `props.items` is not empty', () => {
            const wrapper = shallow(<UnorderedList items={["test"]} />);
            expect(wrapper.find('ul')).toHaveLength(1);
        });

        describe('when looping through `props.items`', () => {
            it('should render a <li> src for each `props.items`', () => {
                const wrapper = shallow(<UnorderedList items={["test", "test", "test"]} />);
                expect(wrapper.find('li')).toHaveLength(3);
            });
    
            it('should render the [data-spec="unordered-item-text"] text to equal current `item`', () => {
                const wrapper = shallow(<UnorderedList items={["test1", "test2", "test3"]} />);
                const list_items = wrapper.find('li').map(node => node);
                expect(list_items[0].find('[data-spec="unordered-item-text"]').props().text).toBe("test1");
                expect(list_items[1].find('[data-spec="unordered-item-text"]').props().text).toBe("test2");
                expect(list_items[2].find('[data-spec="unordered-item-text"]').props().text).toBe("test3");
            });

            it('should render a [data-spec="unordered-item-hyphen"]', () => {
                const wrapper = shallow(<UnorderedList items={["test1"]} />);
                const list_items = wrapper.find('li').map(node => node);
                expect(list_items[0].find('[data-spec="unordered-item-hyphen"]').props().text).toBe("-");
            });
        })



    })
})
