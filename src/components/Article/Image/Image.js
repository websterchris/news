import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'




const Image = props => {
    return(
        <div>
            <img className={css(styles.image)} src={props.src} alt={props.alt} />
        </div>
    )
}

const styles = StyleSheet.create({
    image:{
        maxWidth: '100%'
    }
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
}

export default Image;