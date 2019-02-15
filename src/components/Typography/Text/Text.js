import React from 'react'
import PropTypes from 'prop-types';

const Text = props => {
    return(
        <p>{props.text}</p>
    )
}

Text.propTypes = {
    text: PropTypes.string,
}

export default Text;