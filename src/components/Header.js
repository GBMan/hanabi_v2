import React, { useContext } from 'react'
import { HanabiContext } from './App'
import Card from './Card'

export default function Header(props) {
    // console.log("#Header")
    const {
        hints,
        points,
        errors,
        deck,
        piles,
        discard,
        history
    } = props

    const { handleCancel, handleDiscard, handleNewGame, handleRules } = useContext(HanabiContext)

    return (
        <header className="header">
            <div className="header--infos">
                <div>Points : {points}</div>
                <div>Pioche : {deck}</div>
                <div>Erreur : {errors}</div>
                <div>Indices : {hints}</div>
            </div>
            <div className="header--board">
                {Object.keys(piles).map((color, i) => {
                    return <Card key={i} color={color} value={piles[color].length} />
                })}
            </div>
            <div className="header--actions">
                <button className="btn btn-standard" onClick={handleNewGame} >Nouvelle partie</button>
                <button className="btn btn-standard" onClick={handleDiscard} >Défausse : {discard}</button>
                <button className="btn btn-standard" onClick={handleRules} >Règles</button>
                <button className="btn btn-standard" onClick={handleCancel} >Annuler : {history}</button>
            </div>
        </header>
    )
}