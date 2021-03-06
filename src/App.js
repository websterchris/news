import React, { Component } from "react";
import { StyleSheet, css } from 'aphrodite';
import { FONTS, BREAKPOINTS } from './config'
import articles from './articles.json'
import Article from './lib/Article'

import ArticleComponent from './components/Article/Article'
import NavigationComponent from './components/Navigation/Navigation'
import ArticleRankingComponent from './components/ArticleRanking/ArticleRanking'
import Snackbar from './components/Snackbar/Snackbar'

export default class App extends Component {

  state = {
    read_articles: [],
    current_index: 0,
    unused_indexes: [0, 1, 2, 3 , 4],
    snackbar: false
  }

  componentDidMount = () => {
    this.fetchArticle().then(article => {
      this.addArticleToRead(article)
    }).catch(e => this.setState({snackbar: {text: "Could not fetch article", type: "danger"}}));


  }

  getRandomUnusedIndex = () => {
    const { unused_indexes } = this.state
    return unused_indexes[Math.floor(Math.random() * unused_indexes.length)]
  }

  addArticleToRead = article => {
    const { read_articles } = this.state
    read_articles.push(article)
    this.setState({ read_articles })
  }

  removeFromUnusedIndex = index => {
    const { unused_indexes } = this.state
    unused_indexes.splice(unused_indexes.indexOf(index), 1)
    this.setState({ unused_indexes })
  }

  increaseCurrentIndex = () => {
    const { current_index, read_articles } = this.state
    this.setState({ current_index: current_index + 1 }, () => {
      if (read_articles.length === (current_index + 1)) {
        this.fetchArticle().then(article => {
          this.addArticleToRead(article)
        }).catch(e => this.setState({snackbar: {text: "Could not fetch article", type: "danger"}}));
      }
    })
  }

  decreaseCurrentIndex = () => {
    const { current_index } = this.state
    if (current_index > 0) {
      this.setState({ current_index: current_index - 1 })
    }
  }


  fetchArticle = () => {
    return new Promise((resolve, reject) => {
      const { unused_indexes } = this.state
      if (unused_indexes.length === 0) {
        resolve(null)
      }
      const article_index = this.getRandomUnusedIndex()
      this.removeFromUnusedIndex(article_index)
      if (articles[article_index] === undefined) {
        reject("Article does not exist")
      }
      const article = new Article(articles[article_index].title, articles[article_index].body, article_index)

      resolve(article)
    })
  }

  handleSnackbarClose = () => {
    this.setState({snackbar: false})
  }

  render() {
    const { current_index, read_articles, snackbar } = this.state
    const articles_finished = read_articles[current_index] === null
    const articles_start = current_index === 0

    const snackbar_component = snackbar !== false ? <Snackbar text={snackbar.text} type={snackbar.type} onClose={() => {this.handleSnackbarClose()}}/> : null
    
    return (

      <div className={css(styles.wrapper)}>

        {
          (() => {
            if (articles_finished) {
              return <ArticleRankingComponent articles={read_articles} />
            } else {
              return (<ArticleComponent article={read_articles[current_index]} />)
            }
          })()
        }

        <NavigationComponent
          showNext={!articles_finished}
          showPrevious={!articles_start}
          onNextArticle={() => { this.increaseCurrentIndex() }}
          onPreviousArticle={() => { this.decreaseCurrentIndex() }}
          data-spec="navigation-component"
        />

        {snackbar_component}
      </div>);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: FONTS.primary,
    width: '80%',
    margin: '0 auto',
    [`@media (min-width: ${BREAKPOINTS.tablet})`]: {
      width: '50%'
  }
  },

});