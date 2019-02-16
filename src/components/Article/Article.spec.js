import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'

import Article from './Article';
import Heading from '../Typography//Heading/Heading'
import Text from '../Typography/Text/Text'
import Image from './Image/Image'
import UnorderedList from './UnorderedList/UnorderedList';

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
            const wrapper = shallow(<Article article={new ArticleClass("text", [])} />);
            wrapper.instance().componentDidMount()
            const {article} = wrapper.state()
            expect(article instanceof ArticleClass).toBe(true)
          });

    });

    describe('componentWillReceiveProps(new_props)', () => {

        it('reassigns `state.article` to the value of `new_props.article`', () => {
            const wrapper = shallow(<Article article={new ArticleClass("text", [])} />);
            wrapper.instance().componentWillReceiveProps({article: undefined})
            const {article} = wrapper.state()
            expect(article).toBeUndefined()
          });
          
    });

    describe('when looping through `state.article.body`', () => {

        it('should render a `Typography/Heading` component for each heading type', () => {
            const article = new ArticleClass('title', [{type: 'heading', model:{}}, {type: 'heading', model:{}}])
            const wrapper = shallow(<Article article={article} />);
            const article_body = wrapper.find('[data-spec="article-body"]')
            expect(article_body.find(Heading)).toHaveLength(2);
        });

        it('should render a `Typography/Text` component for each paragraph type', () => {
            const article = new ArticleClass('title', [{type: 'paragraph', model:{}}, {type: 'paragraph', model:{}}])
            const wrapper = shallow(<Article article={article} />);
            const article_body = wrapper.find('[data-spec="article-body"]')
            expect(article_body.find(Text)).toHaveLength(2);
        });

        it('should render a `Article/Image` component for each image type', () => {
            const article = new ArticleClass('title', [{type: 'image', model:{}}])
            const wrapper = shallow(<Article article={article} />);
            const article_body = wrapper.find('[data-spec="article-body"]')
            expect(article_body.find(Image)).toHaveLength(1);
        });

        it('should render a `Article/UnorderedList` component for each unordered type', () => {
            const article = new ArticleClass('title', [{type: 'list', model:{type: "unordered", items:["test"]}}])
            const wrapper = shallow(<Article article={article} />);
            const article_body = wrapper.find('[data-spec="article-body"]')
            expect(article_body.find(UnorderedList)).toHaveLength(1);
        });

    });




});
