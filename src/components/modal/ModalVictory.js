import React from 'react'
import { plagePrestations } from '../../datas/data'

export default function ModalVictory(props) {
    const {
        call,
        points,
        errors,
        show
    } = props

    function getPrestation(points) {
        let s = plagePrestations[0].text
        for (let i=1; i<plagePrestations.length; i++) {
            const prestation = plagePrestations[i]
            if (points > prestation.valueMax) {
                s = prestation.text
            }
            else {
                return s
            }
        }
    }

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-victory">
                <h2>La partie est terminée !</h2>
                <div>
                    Votre résultat est de {points} avec {errors} erreurs.
                </div>
                <div>
                    Prestation : {getPrestation(points)}
                </div>
                <button className="btn btn-standard" onClick={(event) => {call()}}>Rejouer</button>
            </div>
        </div>
    )
}
