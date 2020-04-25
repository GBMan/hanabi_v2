import React from 'react'

export default function ModalLastTurn(props) {
    let {
        call,
        show
    } = props

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-last-turn">
                <h2>Dernier tour !</h2>
                <div className="last-turn">
                    C'est le dernier tour. Tout le monde rejoue une dernière fois.
                </div>
                <button className="btn btn-standard" onClick={(event) => {call()}}>Compris</button>
            </div>
        </div>
    )
}
