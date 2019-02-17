import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite'

import ArticleClass from '../../lib/Article'
import Button from '../Button/Button'

import Heading from '../Typography/Heading/Heading'
import Article from './Article/Article'
import Snackbar from '../Snackbar/Snackbar'

export default class ArticleRanking extends Component {

    state = {
        articles: [],
        snackbar: false
    }

    componentDidMount = () => {
        const articles = this.props.articles ? this.props.articles  : []
        this.setState({ articles: articles.filter(article => article !== null) || [] })
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

    handleSnackbarClose = () => {
        this.setState({snackbar: false})
    }

    handleSubmit = () => {
        const payload = this.makePayload()
        this.postRankings(payload).then(() => { 
            this.setState({snackbar: {text: "Submitted Successfully", type: "success"}})
        }).catch((e) => this.setState({snackbar: {text: "Could not submit data", type: "danger"}}))
    }

    render() {
        const { articles, snackbar } = this.state
        const snackbar_component = snackbar !== false ? <Snackbar text={snackbar.text} type={snackbar.type} onClose={() => {this.handleSnackbarClose()}}/> : null

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

                {snackbar_component}
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
