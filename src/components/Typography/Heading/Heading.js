import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite'
import {BREAKPOINTS} from '../../../config'


const Heading = ({ weight = 3, text }) => {
    const Tag = `h${weight}`
    return (
        <Tag className={css(styles.heading, styles[Tag])}>{text}</Tag>
    )
}

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        [`@media (min-width: ${BREAKPOINTS.tablet})`]: {
            textAlign: 'left',
        }
    },
    h1:{
        fontSize: '0.8em',
        [`@media (min-width: ${BREAKPOINTS.tablet})`]: {
            fontSize: '2em',
        }
    },

    h5:{
        fontSize:'0.6em',
        [`@media (min-width: ${BREAKPOINTS.tablet})`]: {
            fontSize: '1.2em',
        }
    }


});

Heading.propTypes = {
    weight: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    text: PropTypes.string,
}

export default Heading;