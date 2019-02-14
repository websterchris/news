import React, { Component } from "react";
import { StyleSheet, css } from 'aphrodite';
import { FONTS } from './config'
import articles from './articles.json'
import Article from './lib/Article'


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

  getRandomUnusedIndex = () => this.state.unused_indexes[Math.floor( Math.random() * this.state.unused_indexes.length)]

  addArticleToRead = article => {
    const {read_articles} = this.state
    read_articles.push(article)
    this.setState({read_articles})
  }

  removeFromUnusedIndex = (index) => {
    const {unused_indexes} = this.state
    unused_indexes.splice(unused_indexes[index],1)
    this.setState({unused_indexes})
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
    return <div className={css(styles.wrapper)}>Hello World</div>;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: FONTS.primary
  },

});