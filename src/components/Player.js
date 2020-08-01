import React, { useContext } from 'react'
import HandCard from './HandCard'
import { HanabiContext } from './App'
import { colors } from '../datas/data'

export default function Player(props) {
    const {
        id,
        turn,
        ia,
        hands,
        hide
    } = props
    // console.log(`#Player ${id} (${turn})`)

    const { handleClickValue, handleClickColor, handleClickValid, handleClickCancel } = useContext(HanabiContext)

    const hand = hands[id]

    function onClickValue(value) {
        if (!handleClickValue(id, value)) return
        hand.forEach((card) => {
            if (card.value === value) {
                card.hintValue = value
            }
            else {
                card.notValues[value] = true
            }
        })
    }
    function onClickColor(color) {
        if (!handleClickColor(id, color)) return
        hand.forEach((card) => {
            if (card.color === color) {
                card.hintColor = color
            }
            else {
                card.notColors[color] = true
            }
        })
    }
    function onClickValid(position) {
        handleClickValid(id, position)
    }
    function onClickCancel(position) {
        handleClickCancel(id, position)
    }

    const active = (turn === id)

    return (
        <div className={`player ${(active) ? "active" : ""}`}>
            <div className="player--name">Joueur {id+1} {ia ? "(ia)" : ""}</div>
            <div className="player--hand">
                {hand.map((card, i) => {
                    return <HandCard key={i} position={i} card={card} active={active} hide={hide} onClickValid={onClickValid} onClickCancel={onClickCancel} />
                })}
            </div>
            {!active && <div className="player--value-container">
                { [1, 2, 3, 4, 5].map((value, i) => {
                    return <div key={i} className="btn round-btn" onClick={(event) => { onClickValue(value) }}>{value}</div>;
                })}
            </div>}
            {!active && <div className="player--color-container">
                { colors.map((color, i) => {
                    return <div key={i} className={`btn round-btn ${color}`} onClick={(event) => { onClickColor(color) }}></div>;
                })}
            </div>}
        </div>
    )
}
