import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Article from './Article';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('The ArticleRanking/Article Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Article />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render a single [data-spec="article-rank-item"] element', () => {
            const wrapper = shallow(<Article />);
            expect(wrapper.find('[data-spec="article-rank-item"]')).toHaveLength(1);
        });

        it('should render a single [data-spec="article-rank-title"] element', () => {
            const wrapper = shallow(<Article />);
            expect(wrapper.find('[data-spec="article-rank-title"]')).toHaveLength(1);
        });

        it('should render a single [data-spec="article-rank-ranks"] element', () => {
            const wrapper = shallow(<Article />);
            expect(wrapper.find('[data-spec="article-rank-ranks"]')).toHaveLength(1);
        });

        it('should render  3 [data-spec="article-rank-rank"] elements', () => {
            const wrapper = shallow(<Article />);
            expect(wrapper.find('[data-spec="article-rank-rank"]')).toHaveLength(3);
        });


    })

    describe('[data-spec="article-rank-rank"]', () => {
        it('should call `props.onRankChange` when clicked', () => {
            const onRankChange = jest.fn();
            const wrapper = shallow(<Article onRankChange={onRankChange} />);
            wrapper.find('[data-spec="article-rank-rank"]').map( node => node.simulate('click'));
            expect(onRankChange).toHaveBeenCalledTimes(3);
        });
    })


})
