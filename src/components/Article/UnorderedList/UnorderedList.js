import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import {COLORS, BREAKPOINTS} from '../../../config'

import Text from '../../Typography/Text/Text'

const UnorderedList = props => {
    if(!props.items || props.items.length === 0){
        return null
    }
    return(
        <ul className={css(styles.wrapper)}>
            {
                props.items.map((item, index) => {
                    return (
                    <li className={css(styles.item)} key={index}>
                        <Text data-spec="unordered-item-hyphen" styles={styles.item_hyphen} text={"-"} />
                        <Text data-spec="unordered-item-text" styles={styles.item_text} text={item} />
                    </li>)
                })
            }
        </ul>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        background: COLORS.light,
        listStyle: 'none',
        padding: '1em',
        width: '80%',
        margin: '0 auto'
    },

    item: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        margin: 0
    },
    item_hyphen: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        width: '10%',
        margin: 0,
        [`@media (min-width: ${BREAKPOINTS.tablet})`]: {
            fontSize: '2em',
        }
    },
    item_text: {
        width: '90%',
        margin: 0
    }
});

export default UnorderedList;