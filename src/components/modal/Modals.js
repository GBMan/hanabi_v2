import React, {useContext} from 'react'
import ModalDiscard from './ModalDiscard'
import ModalFail from './ModalFail'
import ModalLastTurn from './ModalLastTurn'
import ModalReady from './ModalReady'
import ModalRules from './ModalRules'
import ModalSettings from './ModalSettings'
import ModalVictory from './ModalVictory'
import { HanabiContext } from '../App'

export default function Modals(props) {
    const {
        modalDiscard,
        modalFail,
        modalLastTurn,
        modalReady,
        modalRules,
        modalSettings,
        modalVictory,
        discard,
        points,
        errors,
        turn
    } = props

    const {handleModalDiscard, handleModalFail, handleModalLastTurn, handleModalReady, handleModalRules, handleModalSettings, handleModalVictory} = useContext(HanabiContext)

    return (
        <div className={`modals-container ${(modalDiscard || modalFail || modalLastTurn || modalReady || modalRules || modalSettings || modalVictory) ? "show" : ""}`}>
            <ModalDiscard show={modalDiscard} discard={discard} call={handleModalDiscard} />
            <ModalFail show={modalFail} call={handleModalFail} />
            <ModalLastTurn show={modalLastTurn} call={handleModalLastTurn} />
            <ModalReady show={modalReady} player={`joueur ${turn+1}`} call={handleModalReady} />
            <ModalRules show={modalRules} call={handleModalRules} />
            <ModalSettings show={modalSettings} call={handleModalSettings} />
            <ModalVictory show={modalVictory} points={points} errors={errors} call={handleModalVictory} />
        </div>
    )
}
