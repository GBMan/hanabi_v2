import React, { useState } from 'react'
import { maxNbPlayers, defaultNbPlayers, defaultNbIAs } from '../../datas/data'

export default function ModalSettings(props) {
    const {
        call,
        show
    } = props

    const [modalNbPlayers, setModalNbPlayers] = useState(defaultNbPlayers)
    const [modalNbIAs, setModalNbIAs] = useState(defaultNbIAs)
    const btnsNbPlayersElt = []
    const btnsNbIAsElt = []

    for (let i=1; i<maxNbPlayers; i++) {
        btnsNbPlayersElt.push(<button key={i} className={`btn round-btn ${(i+1 === modalNbPlayers) ? "selected" : ""}`} onClick={(event) => {
            // setModalNbIAs(Math.min(modalNbIAs, i))
            setModalNbIAs(i)
            setModalNbPlayers(i+1)
        }}>{i+1}</button>)
    }

    for (let i=0; i<=modalNbPlayers; i++) {
        btnsNbIAsElt.push(<button key={i} className={`btn round-btn ${(i === modalNbIAs) ? "selected" : ""}`} onClick={(event) => {setModalNbIAs(i)}}>{i}</button>)
    }

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-settings">
                <h2>Configuration de la partie</h2>
                <div className="modal-settings--line">
                    <span>Parties à </span> 
                    <div className="modal-settings--nb-players">
                        {btnsNbPlayersElt}
                    </div>
                    <span> joueurs</span>
                </div>
                <div className="modal-settings--line">
                    <span>dont </span> 
                    <div className="modal-settings--nb-ias">
                        {btnsNbIAsElt}
                    </div>
                    <span> IAs.</span>
                </div>
                <button className="btn btn-standard" onClick={(event) => {call(modalNbPlayers, modalNbIAs)}}>Jouer</button>
            </div>
        </div>
    )
}
