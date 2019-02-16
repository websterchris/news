import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'

import Heading from '../Typography/Heading/Heading'
import Text from '../Typography/Text/Text'
import Image from './Image/Image'
import UnorderedList from './UnorderedList/UnorderedList'

export default class Article extends Component {

    state = {
        article: undefined, 
    }

    componentDidMount = () => {
        this.setState({ article: this.props.article })
    }

    componentWillReceiveProps = next_props => {
        this.setState({ article: next_props.article });
    }

    render() {
        const title = this.state.article !== undefined ? this.state.article.getTitle() : ''
        const body = this.state.article !== undefined ? this.state.article.getBody() : []
        return (
            <div className={css(styles.wrapper)}  >
                <Heading weight={1} text={title} />
                <div className={css(styles.article_body)} data-spec="article-body">
                    {
                        body.map((body_content, index) => {
                            return (
                                (() => {
                                    switch (body_content.type) {
                                        case "heading":
                                            return <Heading key={index} weight={5} text={body_content.model.text} />
                                        case "paragraph":
                                            return <Text key={index} text={body_content.model.text} />
                                        case "image":
                                            return <Image key={index} src={body_content.model.url} alt={body_content.model.altText} height={body_content.model.height} width={body_content.model.width} />
                                        case "list":
                                            return body_content.model.type === "unordered" ? <UnorderedList key={index} items={body_content.model.items} /> : null
                                    }
                                })())

                        })
                    }
                </div>
            </div>)
    }

}


const styles = StyleSheet.create({
    wrapper: {
        width: '50%',
        margin: '0 auto'
    },
    article_body: {
    }


});