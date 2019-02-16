import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import ArticleClass from '../../lib/Article'

import ArticleRanking from './ArticleRanking';
import Heading from '../Typography/Heading/Heading'
import AR_ArticleComponent from './Article/Article'

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('The ArticleRanking Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<ArticleRanking />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('should render the headings', () => {
            const wrapper = shallow(<ArticleRanking />);
            expect(wrapper.find(Heading)).toHaveLength(2);
        });

        it('should render an ArticleRanking/Article component for each `props.article` ', () => {
            const wrapper = shallow(<ArticleRanking articles={[new ArticleClass('', []), new ArticleClass('', [], 1)]} />);
            expect(wrapper.find(AR_ArticleComponent)).toHaveLength(2);
        });

    })

    describe('handleRankChange(index, rank)', () => {

        it('should set `state.articles[index].rank` equal to the second parameter`', () => {
            const wrapper = shallow(<ArticleRanking articles={[new ArticleClass('', []), new ArticleClass('', [], 1)]} />);
            wrapper.instance().handleRankChange(1, 1)
            expect(wrapper.state().articles[1].getRank()).toBe(1);
        });

    })

    describe('postRankings(payload)', () => {

        it('should reject the Promise if `payload` is invalid', async () => {
            const wrapper = shallow(<ArticleRanking articles={[]} />);
            expect.assertions(1);
            try {
              await wrapper.instance().postRankings(false)
            } catch (e) {
              expect(e).toBeTruthy()
            }
          });

          it('should resolve the Promise if `payload` is valid', async () => {
            const wrapper = shallow(<ArticleRanking articles={[]} />);
            expect.assertions(1);
            const rank =  await wrapper.instance().postRankings([{1:1}])
            expect(rank).toBe(true)
          });
    })


    describe('handleSubmit()', () => {

        it('should call `postRankings(payload)`', () => {
            const wrapper = shallow(<ArticleRanking articles={[]}  />);
            jest.spyOn(wrapper.instance(), 'postRankings');
            wrapper.instance().handleSubmit()
            expect(wrapper.instance().postRankings).toHaveBeenCalled()
          });

          it('should call `makePayload()`', () => {
            const wrapper = shallow(<ArticleRanking articles={[]}  />);
            jest.spyOn(wrapper.instance(), 'makePayload');
            wrapper.instance().handleSubmit()
            expect(wrapper.instance().makePayload).toHaveBeenCalled()
          });

    })

    describe('makePayload()', () => {

        it('should return an array of {article_id : article_rank}', () => {
            const wrapper = shallow(<ArticleRanking articles={[new ArticleClass('', [], 1)]}  />);
            expect(wrapper.instance().makePayload().length).toBe(1)
            expect(wrapper.instance().makePayload()[0]).toEqual({1:0})
          });

    })

    describe('[data-spec="rank-submit-button"]', () => {

        it('should call handleSubmit() onClick', () => {
            const wrapper = shallow(<ArticleRanking articles={[]}  />);
            jest.spyOn(wrapper.instance(), 'handleSubmit');
            wrapper.find('[data-spec="rank-submit-button"]').simulate('click')
            expect(wrapper.instance().handleSubmit).toHaveBeenCalled()
          });

    })
})
