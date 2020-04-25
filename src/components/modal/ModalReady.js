import React from 'react'

export default function ModalDiscard(props) {
    const {
        call,
        player,
        show
    } = props

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-ready">
                <h2>Tour du {player}</h2>
                <div className="modal-ready--content">Cliquez lorsque les autres joueurs ne regardent pas pour révéler leurs mains.</div>
                <button className="btn btn-standard" onClick={(event) => {call()}}>Prêt !</button>
            </div>
        </div>
    )
}
