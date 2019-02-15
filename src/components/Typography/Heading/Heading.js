import React from 'react'
import PropTypes from 'prop-types';

const Heading = ({weight = 3, text}) => {
    const Tag = `h${weight}`
    return(
        <Tag>{text}</Tag>
    )
}

Heading.propTypes = {
    weight: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    text: PropTypes.string,
}

export default Heading;