import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite'
import {COLORS, FONTS} from '../../config'


const Button = props => {
    const onClick = props.onClick ? props.onClick : null
    return(
        <button className={css(styles.btn)} onClick={() => onClick()}>{props.text}</button>
    )
}

const styles = StyleSheet.create({
    btn: {
        minWidth: '10em',
        padding: '1em',
        background: COLORS.primary,
        border: 0,
        color: COLORS.white,
        fontFamily: FONTS.primary,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        cursor: 'pointer',
        ":focus": {
            outline: 'none'
        },
        ":active": {
            boxShadow: `0 2px ${COLORS.light}` ,
            transform: 'translateY(4px)'
        }
    }
});

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;