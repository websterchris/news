import React from 'react'
import PropTypes from 'prop-types'

const Image = props => {
    return(
        <div>
            <img src={props.src} alt={props.alt} height={props.height} width={props.width} />
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
}

export default Image;