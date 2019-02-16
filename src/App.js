import React, { Component } from "react";
import { StyleSheet, css } from 'aphrodite';
import { FONTS } from './config'
import articles from './articles.json'
import Article from './lib/Article'

import ArticleComponent from './components/Article/Article'
import NavigationComponent from './components/Navigation/Navigation'


export default class App extends Component {

  state = {
    read_articles: [],
    current_index: 0,
    unused_indexes: [...Array(articles.length).keys()]
  }

  componentDidMount = () => {
    this.fetchArticle(this.getRandomUnusedIndex()).then(article => {
      this.addArticleToRead(article)
    }).catch(e => console.error(e));
  }

  getRandomUnusedIndex = () => this.state.unused_indexes[Math.floor(Math.random() * this.state.unused_indexes.length)]

  addArticleToRead = article => {
    const { read_articles } = this.state
    read_articles.push(article)
    this.setState({ read_articles })
  }

  removeFromUnusedIndex = index => {
    const { unused_indexes } = this.state
    unused_indexes.splice(unused_indexes[index], 1)
    this.setState({ unused_indexes })
  }

  increaseCurrentIndex = () => {
    const { current_index, read_articles } = this.state
    if (read_articles.length  === (current_index + 1) ) {
      this.fetchArticle(this.getRandomUnusedIndex()).then(article => {
        this.addArticleToRead(article)
        this.setState({ current_index: current_index + 1 })
      }).catch(e => console.error(e));
    }else{
        this.setState({ current_index: current_index + 1 })
    }
  }

  decreaseCurrentIndex = () => {
    const { current_index } = this.state
    if (current_index > 0) {
      this.setState({ current_index: current_index - 1 })
    }
  }


  fetchArticle = article_index => {
    return new Promise((resolve, reject) => {
      if (articles[article_index] === undefined) {
        reject("Article does not exist")
      }
      const article = new Article(articles[article_index].title, articles[article_index].body)
      this.removeFromUnusedIndex(article_index)
      resolve(article)
    })
  }

  render() {
    const { current_index, read_articles, unused_indexes } = this.state
    const articles_finished = unused_indexes.length === 0 && read_articles.length -1 === current_index
    const articles_start = current_index === 0
    return (

      <div className={css(styles.wrapper)}>

      {
        (() => {
          if(articles_finished){
            return <div>No more articles</div>
          }else{
            return (<ArticleComponent 
              article={read_articles[current_index]} 
              
             
            />)
          }
        })()
      }

      <NavigationComponent 
        showNext={!articles_finished}
        showPrevious={!articles_start}
        onNextArticle={() => { this.increaseCurrentIndex() }}  
        onPreviousArticle={() => { this.decreaseCurrentIndex() }}
      />
        
      </div>);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: FONTS.primary
  },

});