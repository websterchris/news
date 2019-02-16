import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import Text from '../Typography/Text/Text'
import PropTypes from 'prop-types';

const Navigation = props => {
    const previous_article = props.showPrevious ? <Text data-spec="previous-article-button" onClick={() => { props.onPreviousArticle() }} text={"Previous Article"}/> : null
    const next_article = props.showNext > 0 ? <Text data-spec="next-article-button" onClick={() => { props.onNextArticle() }} text={"Next Article"}/> : null

    return (
        <div className={css(styles.navigation)} data-spec="navigation">
            {previous_article}
            {next_article}
        </div>
    )
}

Navigation.propTypes = {
    showNext: PropTypes.bool,
    showPrevious: PropTypes.bool,
    onNextArticle: PropTypes.func,
    onPreviousArticle: PropTypes.func
}

const styles = StyleSheet.create({
    navigation: {
        width: '100%',
        display: "flex",
        justifyContent: "space-around"
    }

});

export default Navigation;