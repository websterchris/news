import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite'

const Text = props => {
    const onClick = props.onClick ? props.onClick : null
    return(
        <p className={css(styles.text, props.styles)} onClick={() => onClick()}>{props.text}</p>
    )
}

Text.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

const styles = StyleSheet.create({
    text: {
    }
  
  });

export default Text;