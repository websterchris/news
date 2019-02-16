import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite'

import ArticleClass from '../../lib/Article'
import Button from '../Button/Button'

import Heading from '../Typography/Heading/Heading'
import Article from './Article/Article'

export default class ArticleRanking extends Component {

    state = {
        articles: []
    }

    componentDidMount = () => {
        this.setState({ articles: this.props.articles || [] })
    }

    handleRankChange = (index, rank) => {
        const { articles } = this.state
        articles[index].setRank(rank)
        this.setState({ articles })
    }

    postRankings = payload => {
        return new Promise((resolve, reject) => {
            if (!payload) {
                reject("There must be articles to be submitted")
            }
            resolve(true)
        })
    }

    makePayload = () => {
        const { articles } = this.state
        return articles.map(article => {
            const key = article.getId()
            const value = article.getRank()
            return { [key]: value }
        })
    }

    handleSubmit = () => {
        const payload = this.makePayload()
        this.postRankings(payload).then(() => { console.log('success') }).catch((e) => console.error(e))
    }

    render() {
        const { articles } = this.state
        return (
            <div className={css(styles.wrapper)}>
                <Heading weight={1} text={"Did you like these articles?"} />
                <Heading weight={5} text={"Tell us how you felt"} />

                <ul className={css(styles.article_container)}>

                    {
                        articles.map((article, index) => {
                            return <Article key={index} title={article.getTitle()} rank={article.getRank()} onRankChange={rank => { this.handleRankChange(index, rank) }} />
                        })
                    }

                </ul>

                <div className={css(styles.button_wrapper)}>
                    <Button onClick={() => this.handleSubmit()} text={"Submit"} data-spec="rank-submit-button"/>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },

    article_container: {
        width: '100%',
        listStyle: 'none'
    },
    button_wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '2em'
    }
});

ArticleRanking.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.instanceOf(ArticleClass))
}
