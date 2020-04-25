import React from 'react'
import Card from '../Card'
import _ from 'underscore'

export default function ModalDiscard(props) {
    let {
        call,
        discard,
        show
    } = props

    if (discard) {
        discard = _.sortBy(discard, 'value');
        discard = _.sortBy(discard, 'color');
    }

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-discard">
                <h2>Défausse</h2>
                <div className="modal-discard--content">
                    {discard && discard.map((card, i) => {
                        return <Card key={i} color={card.color} value={card.value} />
                    })}
                </div>
                <button className="btn btn-standard" onClick={(event) => {call()}}>Fermer</button>
            </div>
        </div>
    )
}
