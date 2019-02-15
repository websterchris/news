import React from 'react';
import Article from './Article';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import ArticleClass from '../../lib/Article'

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

describe('The Article Component', () => {

    describe('when initialised', () => {

        it('renders correctly', () => {
            const tree = renderer.create(<Article />).toJSON();
            expect(tree).toMatchSnapshot();
          });

    });

    describe('componentDidMount()', () => {

        it('assigns `state.article` to the value of `props.article`', () => {
            const wrapper = shallow(<Article article={new ArticleClass()} />);
            wrapper.instance().componentDidMount()
            const {article} = wrapper.state()
            expect(article instanceof ArticleClass).toBe(true)
          });

    });

    describe('componentWillReceiveProps(new_props)', () => {

        it('reassigns `state.article` to the value of `new_props.article`', () => {
            const wrapper = shallow(<Article article={new ArticleClass()} />);
            wrapper.instance().componentWillReceiveProps({article: undefined})
            const {article} = wrapper.state()
            expect(article).toBeUndefined()
          });
          
    });




});
