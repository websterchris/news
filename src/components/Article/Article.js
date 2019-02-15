import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'

import Heading from '../Typography/Heading/Heading'


export default class Article extends Component{

    state = {
        article : undefined
    }

    componentDidMount = () => {
        this.setState({article: this.props.article})
    }

    componentWillReceiveProps(next_props) {
          this.setState({ article: next_props.article });
      }

    render(){
        const title = this.state.article !== undefined ? this.state.article.getTitle() : ''
        return (
            <div className={css(styles.wrapper)}>
                <Heading weight={1} text={title} />
            </div>)
    }

}


const styles = StyleSheet.create({
    wrapper: {
      width: '50%',
      margin: '0 auto'
    },
  
  });