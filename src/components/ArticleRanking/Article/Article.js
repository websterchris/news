import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { COLORS } from '../../../config'

import Text from '../../Typography/Text/Text'


const Article = props => {
    const bad_active = props.rank === -1 ? styles.article_bad_active : null
    const okay_active = props.rank === 0 ? styles.article_okay_active : null
    const good_active = props.rank === 1 ? styles.article_good_active : null

    return (
        <li className={css(styles.article_item)} data-spec={'article-rank-item'}>
            <div className={css(styles.article_title)}>
                <Text text={props.title} data-spec={'article-rank-title'} />
            </div>
            <ul className={css(styles.article_ranking)} data-spec={'article-rank-ranks'}>
                <li
                    onClick={() => { props.onRankChange(-1) }}
                    className={css(styles.article_rank, styles.article_bad, bad_active)}
                    title="I didn't like this article"
                    data-spec={'article-rank-rank'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z" /></svg>
                </li>
                <li
                    onClick={() => { props.onRankChange(0) }}
                    className={css(styles.article_rank, styles.article_okay, okay_active)}
                    title="This article was okay"
                    data-spec={'article-rank-rank'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-2h8v2zm-7.5-9c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z" /></svg>
                </li>
                <li
                    onClick={() => { props.onRankChange(1) }}
                    className={css(styles.article_rank, styles.article_good, good_active)}
                    title="I liked this article"
                    data-spec={'article-rank-rank'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-12c.331 1.465 2.827 4 6.001 4 3.134 0 5.666-2.521 5.999-4zm-9.5-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z" /></svg>
                </li>
            </ul>
        </li>
    )
}

const styles = StyleSheet.create({
    article_item: {
        width: '90%',
        height: '3.5em',
        display: 'flex',
        alignItems: 'center'
    },
    article_title: {
        width: '70%',
        paddingLeft: '0.5em',
    },

    article_ranking: {
        width: '30%',
        height: '100%',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex'
    },
    article_rank: {
        padding: 0,
        margin: 0,
        width: '33.3%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: "3em",
        background: COLORS.light,
        fill: COLORS.dark,
        cursor: 'pointer',
        ':hover': {
            fill: COLORS.white
        }
    },
    'article_bad.active': {
        backgroundColor: COLORS.danger,
    },
    article_bad: {
        ':hover': {
            backgroundColor: COLORS.danger,
        }
    },
    article_bad_active: {
        backgroundColor: COLORS.danger,
        fill: COLORS.white
    },
    article_okay: {
        ':hover': {
            backgroundColor: COLORS.primary,
        }
    },
    article_okay_active: {
        backgroundColor: COLORS.primary,
        fill: COLORS.white
    },
    article_good: {
        ':hover': {
            backgroundColor: COLORS.success,
        }
    },

    article_good_active: {
        backgroundColor: COLORS.success,
        fill: COLORS.white
    },


});



export default Article;