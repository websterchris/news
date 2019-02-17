import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite'
import { mount, shallow } from 'enzyme'
import Article from './lib/Article'

import ArticleComponent from './components/Article/Article'
import NavigationComponent from './components/Navigation/Navigation'

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

    it('should render an Article component', () => {
      const wrapper = mount(<App />);
      const articleComponent = wrapper.find(ArticleComponent);
      expect(articleComponent).toHaveLength(1);
    });

    it('should render a Navigation component', () => {
      const wrapper = mount(<App />);
      const navigationComponent = wrapper.find(NavigationComponent);
      expect(navigationComponent).toHaveLength(1);
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
      const { read_articles } = wrapper.state()
      expect(read_articles.length).toBe(expected_length)
      expect(read_articles[read_articles.length - 1]).toBe("article")
    });
  })

  describe('fetchArticle()', () => {

    it('should reject the Promise if `article_index` is invalid', async () => {
      const wrapper = shallow(<App />);
      const getRandomUnusedIndex = jest.spyOn(wrapper.instance(), 'getRandomUnusedIndex');
      getRandomUnusedIndex.mockResolvedValue(-5)
      expect.assertions(1);
      try {
        await wrapper.instance().fetchArticle()
      } catch (e) {
        expect(e).toBeTruthy()
      }
    });

    it('should resolve an Article instance if `article_index` is valid and `state.unused_indexes`.length is 0', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({unused_indexes: [1,2]})
      expect.assertions(1);
      const article = await wrapper.instance().fetchArticle()
      expect(article instanceof Article).toBe(true)
    });


    it('should resolve an null if `state.unused_indexes` has 0 elements', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({unused_indexes: []})
      expect.assertions(1);
      const article = await wrapper.instance().fetchArticle()
      expect(article).toBe(null)
    });

    it('should call `removeFromUnusedIndex(index)` if `article_index` is valid', async () => {
      const wrapper = shallow(<App />);
      jest.spyOn(wrapper.instance(), 'removeFromUnusedIndex');
      expect.assertions(1);
      const article = await wrapper.instance().fetchArticle()
      expect(wrapper.instance().removeFromUnusedIndex).toBeCalledTimes(1)
    });

    it('should call `getRandomUnusedIndex()` if `article_index` is valid', async () => {
      const wrapper = shallow(<App />);
      jest.spyOn(wrapper.instance(), 'getRandomUnusedIndex');
      expect.assertions(1);
      const article = await wrapper.instance().fetchArticle()
      expect(wrapper.instance().getRandomUnusedIndex).toBeCalledTimes(1)
    });

  })

  describe('increaseCurrentIndex()', () => {

    it('should call `fetchArticle()` if the next article has not been read ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ read_articles: ["read_article"], current_index: 0 })
      jest.spyOn(wrapper.instance(), 'fetchArticle');
      expect.assertions(1);
      await wrapper.instance().increaseCurrentIndex()
      expect(wrapper.instance().fetchArticle).toBeCalledTimes(1)
    });

    it('should not call `fetchArticle()` if the next article has been read ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ read_articles: ["read_article", "read_article"], current_index: 0 })
      jest.spyOn(wrapper.instance(), 'fetchArticle');
      expect.assertions(1);
      await wrapper.instance().increaseCurrentIndex()
      expect(wrapper.instance().fetchArticle).toBeCalledTimes(0)
    });

    it('should call `addArticleToRead()` if the next article has not been read ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({read_articles: ["read_article"], current_index: 0}) 
      const spy = jest.spyOn(wrapper.instance(), 'addArticleToRead');
      expect.assertions(1);
      await wrapper.instance().increaseCurrentIndex()
      expect(wrapper.instance().addArticleToRead).toBeCalledTimes(2)
    });

    it('should not call `addArticleToRead()` if the next article has been read ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ read_articles: ["read_article", "read_article", "read_article", "read_article"], current_index: 1 })
      jest.spyOn(wrapper.instance(), 'addArticleToRead');
      expect.assertions(1);
      await wrapper.instance().increaseCurrentIndex()
      expect(wrapper.instance().addArticleToRead).toBeCalledTimes(1)
    });

    it('should increase `state.current_index` by 1 if the next article has not been read ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({read_articles: ["read_article"], current_index: 0}) 
      expect.assertions(1);
      await wrapper.instance().increaseCurrentIndex()
      expect(wrapper.state().current_index).toBe(1)
    });

    it('should increase `state.current_index` by 1 if the next article has already been read ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({read_articles: ["read_article", "read_article"], current_index: 0}) 
      expect.assertions(1);
      await wrapper.instance().increaseCurrentIndex()
      expect(wrapper.state().current_index).toBe(1)
    });
  })

  describe('decreaseCurrentIndex()', () => {

    it('should decrease `state.current_index` by 1 if it is not the first article ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({read_articles: ["read_article", "read_article"], current_index: 1}) 
      expect.assertions(1);
      await wrapper.instance().decreaseCurrentIndex()
      expect(wrapper.state().current_index).toBe(0)
    });

    it('should not decrease `state.current_index` by 1 if it is not the first article ', async () => {
      const wrapper = shallow(<App />);
      wrapper.setState({read_articles: ["read_article", "read_article"], current_index: 0}) 
      expect.assertions(1);
      await wrapper.instance().decreaseCurrentIndex()
      expect(wrapper.state().current_index).toBe(0)
    });

  })

  describe('on `state.current_index` change', () => {

    it('should render an Article component if there are unread articles', () => {
      const wrapper = mount(<App />);
      wrapper.setState({unused_indexes: [1], read_articles: [new Article("", [])], current_index: 0}) 
      const articleComponent = wrapper.find(ArticleComponent);
      expect(articleComponent).toHaveLength(1);
    });

    it('should not render an Article component if there are not unread articles', () => {
      const wrapper = mount(<App />);
      wrapper.setState({unused_indexes: [], read_articles: [new Article("", []), new Article(), null], current_index: 2}) 
      const articleComponent = wrapper.find(ArticleComponent);
      expect(articleComponent).toHaveLength(0);
    });


  })

  describe('[data-spec="navigation-component"]', () => {

    it('should call increaseCurrentIndex() onNextArticle', () => {
        const wrapper = mount(<App />);
        jest.spyOn(wrapper.instance(), 'increaseCurrentIndex');
        wrapper.find('[data-spec="navigation-component"]').props().onNextArticle()
        expect(wrapper.instance().increaseCurrentIndex).toBeCalledTimes(1)
      });

      it('should call decreaseCurrentIndex() onPreviousArticle', () => {
        const wrapper = mount(<App />);
        jest.spyOn(wrapper.instance(), 'decreaseCurrentIndex');
        wrapper.find('[data-spec="navigation-component"]').props().onPreviousArticle()
        expect(wrapper.instance().decreaseCurrentIndex).toBeCalledTimes(1)
      });

})

})