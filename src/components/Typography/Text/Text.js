import React from 'react'
import PropTypes from 'prop-types';

const Text = props => {
    const onClick = props.onClick ? props.onClick : null
    return(
        <p onClick={() => onClick()}>{props.text}</p>
    )
}

Text.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Text;