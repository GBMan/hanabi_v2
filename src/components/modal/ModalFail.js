import React from 'react'

export default function ModalFail(props) {
    let {
        call,
        show
    } = props

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-fail">
                <h2>Raté !</h2>
                <div>
                    Vous avez échoué en faisant trop d'erreurs !
                </div>
                <button className="btn btn-standard" onClick={(event) => {call()}}>Réessayer</button>
            </div>
        </div>
    )
}
