import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Navigation from './Navigation';


beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('The Navigation Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Navigation />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render a `previous article` element if  `props.showPrevious` is true', () => {
            const wrapper = shallow(<Navigation showPrevious={true} />);
            expect(wrapper.find('[data-spec="previous-article-button"]')).toHaveLength(1);
        });

        it('should not render a `previous article` element if  `props.showPrevious` is false', () => {
            const wrapper = shallow(<Navigation showPrevious={false} />);
            expect(wrapper.find('[data-spec="previous-article-button"]')).toHaveLength(0);
        });

        it('should render a `next article` element if  `props.showNext` is true', () => {
            const wrapper = shallow(<Navigation showNext={true} />);
            expect(wrapper.find('[data-spec="next-article-button"]')).toHaveLength(1);
        });

        it('should not render a `next article` element if  `props.showNext` is false', () => {
            const wrapper = shallow(<Navigation showNext={false} />);
            expect(wrapper.find('[data-spec="next-article-button"]')).toHaveLength(0);
        });

        describe('previous-article-button', () => {
            it('should call `props.onPreviousArticle` when clicked', () => {
                const onPreviousArticle = jest.fn();
                const wrapper = shallow(<Navigation showPrevious={true} onPreviousArticle={onPreviousArticle} />);
                wrapper.find('[data-spec="previous-article-button"]').simulate('click');
                expect(onPreviousArticle).toHaveBeenCalledTimes(1);
            });
        })

        describe('next-article-button', () => {
            it('should call `props.onNextArticle` when clicked', () => {
                const onNextArticle = jest.fn();
                const wrapper = shallow(<Navigation showNext={true} onNextArticle={onNextArticle} />);
                wrapper.find('[data-spec="next-article-button"]').simulate('click');
                expect(onNextArticle).toHaveBeenCalledTimes(1);
            });
        })

    })
})
