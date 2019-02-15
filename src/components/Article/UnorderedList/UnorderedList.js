import React from 'react'

const UnorderedList = props => {
    if(!props.items || props.items.length === 0){
        return null
    }
    return(
        <ul>
            {
                props.items.map((item, index) => {
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    )
}


export default UnorderedList;