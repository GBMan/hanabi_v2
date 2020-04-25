import React from 'react'
import Card from './Card'

export default function HandCard(props) {
    const {
        position,
        card={color:"grey", value:"?"},
        onClickValid,
        onClickCancel,
        active,
        hide
    } = props
    
    const {color, value, hintColor, hintValue} = (active || hide) ? {...card, color:card.hintColor||"grey", value:card.hintValue||"?"} : card

    return (
        <div className="hand-card">
            <Card card={card} color={color} value={value} hintColor={hintColor} hintValue={hintValue} />
            {active && <div className="btn hand-card--valid" onClick={(event) => { onClickValid(position) }}>I</div>}
            {active && <div className="btn hand-card--cancel" onClick={(event) => { onClickCancel(position) }}>J</div>}
        </div>
    )
}
