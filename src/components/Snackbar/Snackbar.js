import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite'
import {COLORS, BREAKPOINTS} from '../../config'
import Text from '../Typography/Text/Text'

const Snackbar = props => {

    setTimeout(() => {props.onClose()}, props.duration || 5000)

    return(
        <div data-spec="snackbar-container" className={css(styles.wrapper, styles[props.type || 'dark'])}>

            <Text data-spec="snackbar-text" styles={styles.text} text={props.text}/>
            <Text data-spec="snackbar-close" styles={styles.close} text={"X"} onClick={() => {props.onClose()}}/>
        </div>
    )
}

const positionKeyframes = {
    'from': {
        bottom: 0,
    },

    'to': {
        bottom: '2em',
    }
};

const styles = StyleSheet.create({
    wrapper: {
      left: '50%',
      width: '50%',
      minHeight: '0.5em',
      position: 'fixed',
      marginLeft: '-25%',
      borderRadius: '5px',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      animationName: [positionKeyframes],
      animationDuration: '.2s',
      animationFillMode : 'forwards',
      display: 'flex',
      alignItems: 'center',
      [`@media (min-width: ${BREAKPOINTS.tablet})`]: {
        width: '25%',
        left: '2em',
        minHeight: '1em',
        marginLeft: 0,
    }
    },

    text: {
        color: COLORS.white,
        paddingLeft: '1em',
        fontSize: '0.8em',
        width: '80%',
    },

    close: {
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '20%',
        cursor: 'pointer',
    },

    dark: {
        background: COLORS.dark
    },

    success: {
        background: COLORS.success
    },

    danger: {
        background: COLORS.danger
    }
  
  });

Text.propTypes = {
    text: PropTypes.string,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['success', 'danger', 'dark'])
}

export default Snackbar;