import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import ArticleClass from '../../lib/Article'

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
                {title}
            </div>)
    }

}


const styles = StyleSheet.create({
    wrapper: {
      width: '50%',
      margin: '0 auto'
    },
  
  });