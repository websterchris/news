import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'
import Article from './lib/Article'
import ArticleComponent from './components/Article/Article'
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('App Component', () => {

  describe('when initialised', () => {

    it('renders correctly', () => {
      const tree = renderer.create(<App />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders an article component', () => {
      const wrapper = mount(<App />);
      const articleComponent = wrapper.find(ArticleComponent);
      expect(articleComponent).toHaveLength(1);
    });


  })

  describe('componentDidMount', () => {

    it('calls `fetchArticle(article_index)`', () => {
      const wrapper = shallow(<App />);
      jest.spyOn(wrapper.instance(), 'fetchArticle');
      wrapper.instance().componentDidMount()
      expect.assertions(1);
      expect(wrapper.instance().fetchArticle).toHaveBeenCalled()
    });

    it('calls `addArticleToRead(article) if `fetchArticle()` is resolved', async () => {
      const wrapper = shallow(<App />);
      jest.spyOn(wrapper.instance(), 'addArticleToRead');
      await wrapper.instance().componentDidMount()
      expect.assertions(1);
      expect(wrapper.instance().addArticleToRead).toHaveBeenCalled()
    });

  })

  describe('removeFromUnusedIndex(index)', () => {
    it('should remove the element at the specified index from `state.unused_indexes`', () => {
      const wrapper = shallow(<App />);
      const expected_length = wrapper.state().unused_indexes.length - 1
      const current_element_at_index = wrapper.state().unused_indexes.length[2]
      wrapper.instance().removeFromUnusedIndex(2)
      expect(wrapper.state().unused_indexes.length).toBe(expected_length)
      expect(wrapper.state().unused_indexes[2]).not.toBe(current_element_at_index)
    });
  })

  describe('addArticleToRead(article)', () => {
    it('should push the paramter value to the end of `state.read_articles`', () => {
      const wrapper = shallow(<App />);
      const expected_length = wrapper.state().read_articles.length + 1
      wrapper.instance().addArticleToRead("article")
      const {read_articles} = wrapper.state()
      expect(read_articles.length).toBe(expected_length)
      expect(read_articles[read_articles.length - 1]).toBe("article")
    });
  })

  describe('fetchArticle(article_index)', () => {

    it('should reject the Promise if `article_index` is invalid', async () => {
      const wrapper = shallow(<App />);
      expect.assertions(1);
      try {
        await wrapper.instance().fetchArticle(-5)
      } catch (e) {
        expect(e).toBeTruthy()
      }
    });

    it('should resolve an Article instance if `article_index` is valid', async () => {
      const wrapper = shallow(<App />);
      expect.assertions(1);
      const article =  await wrapper.instance().fetchArticle(0)
      expect(article instanceof Article).toBe(true)
    });

    it('should call `removeFromUnusedIndex(index)` if `article_index` is valid', async () => {
      const wrapper = shallow(<App />);
      jest.spyOn(wrapper.instance(), 'removeFromUnusedIndex');
      expect.assertions(1);
      const article = await wrapper.instance().fetchArticle(0)
      expect(wrapper.instance().removeFromUnusedIndex).toHaveBeenCalled()
    });

  })


})