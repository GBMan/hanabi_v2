import React from 'react'

export default function Card(props) {
    const {
        value="?", 
        color="grey", 
        hintColor="none",
        hintValue,
        // card
    } = props

    return (
        <div className="card">
            <div className={`card--value ${color}`}>{value}</div>
            <div className={`card--hint-color ${hintColor}`}></div>
            <div className="card--hint-value">{hintValue}</div>
        </div>
    )
}
