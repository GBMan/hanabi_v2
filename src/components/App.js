import React, { useState, useEffect } from 'react';
import '../scss/app.scss';
import { tabHandsCards, maxHints, buildDeck, buildPiles, colors } from '../datas/data'
import Header from './Header'
import Player from './Player'
import Modals from './modal/Modals'

export const HanabiContext = React.createContext();

const LOCAL_STORAGE_KEY = "hanabi_v2";
let alreadyCome = false;

export default function App() {
  // console.log("%c#App", "color:#00F")

  const [ history, setHistory ] = useState([])
  const [ deck, setDeck ] = useState([])
  const [ piles, setPiles ] = useState({})
  const [ discard, setDiscard ] = useState([])
  const [ hands, setHands ] = useState([])
  const [ nbPlayers, setNbPlayers ] = useState(0)
  const [ nbIAs, setNbIAs ] = useState(0)
  const [ hints, setHints ] = useState(maxHints)
  const [ errors, setErrors ] = useState(0)
  const [ points, setPoints ] = useState(0)
  const [ lastTurn, setLastTurn ] = useState(-1)
  const [ turn, setTurn ] = useState(0)
  const [ modalDiscard, setModalDiscard ] = useState(false)
  const [ modalFail, setModalFail ] = useState(false)
  const [ modalLastTurn, setModalLastTurn ] = useState(false)
  const [ modalReady, setModalReady ] = useState(false)
  const [ modalRules, setModalRules ] = useState(false)
  const [ modalSettings, setModalSettings ] = useState(false)
  const [ modalVictory, setModalVictory ] = useState(false)
  const [ gameStarted, setGameStarted ] = useState(false)
  const [ cancelInvolved, setCancelInvolved ] = useState(false)
  
  const hanabiContextValue = {
    handleCancel:handleCancel,  
    handleDiscard:handleDiscard,
    handleNewGame:handleNewGame,
    handleRules:handleRules,
    handleClickValue:handleClickValue,
    handleClickColor:handleClickColor,
    handleClickValid:handleClickValid,
    handleClickCancel:handleClickCancel,
    handleModalDiscard:handleModalDiscard, 
    handleModalFail:handleModalFail, 
    handleModalLastTurn:handleModalLastTurn, 
    handleModalReady:handleModalReady, 
    handleModalRules:handleModalRules, 
    handleModalSettings:handleModalSettings, 
    handleModalVictory:handleModalVictory
  }

  useEffect(() => {
    //console.log("%cInitialisation", "color:#f00")
    alreadyCome = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!alreadyCome) {
      setModalRules(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(true))
    }
    initNewGame()
  }, [])

  useEffect(() => {
    //console.log(`%cpiles a changé`, "color:#f00")
    let newPoints = 0
    const nb = colors.length
    for (let i=0; i<nb; i++) {
      if (piles[colors[i]]) {
        newPoints += piles[colors[i]].length
      }
    }
    setPoints(newPoints)
  }, [piles])

  useEffect(() => {
    if (deck.length === 50 && nbPlayers > 0) {
      // console.log("%cDistribution", "color:#f00")
      const tempDeck = [...deck]
      const newHands = []
      const nbCards = tabHandsCards.find((rule) => {
        return rule.nbPlayers === nbPlayers
      }).nbCards
      for (let i=0; i<nbPlayers; i++) {
        const newHand = []
        for (let j=0; j<nbCards; j++) {
          newHand.push(tempDeck.pop())
        }
        newHands.push(newHand)
      }
      setHands(newHands)
      setDeck(tempDeck)
      setGameStarted(true)
    }
  }, [nbPlayers, deck])

  useEffect(() => {
    if (gameStarted && !cancelInvolved)
      endTurn()
  }, [errors, points, discard])

  useEffect(() => {

    if (nbPlayers - nbIAs > 1) {
      if (nbPlayers - nbIAs > turn) {
        setModalReady(true)
      } 
    }
    setCancelInvolved(false)
  }, [turn, nbPlayers, nbIAs])

  // ### Header actions
  function handleCancel() {
    if (history.length === 0)
    return
    
    setCancelInvolved(true)

    const prevTurn = history.pop()

    setHints(prevTurn.hints)
    setErrors(prevTurn.errors)
    setHands(prevTurn.hands)
    setDiscard(prevTurn.discard)
    setDeck(prevTurn.deck)
    setPiles(prevTurn.piles)

    if (turn === 0) {
      setTurn(nbPlayers-1)
    }
    else {
      setTurn((prevTurn) => {return prevTurn-1})
    }
  }
  function handleDiscard() {
    setModalDiscard(true)
  }
  function handleNewGame() {
    initNewGame()
  }
  function handleRules() {
    setModalRules(true)
  }

  // ### Modal actions
  function handleModalDiscard() {
    setModalDiscard(false)
  }
  function handleModalFail() {
    setModalFail(false)
    initNewGame()
  }
  function handleModalLastTurn() {
    setModalLastTurn(false)
  }
  function handleModalReady() {
    setModalReady(false)
  }
  function handleModalRules() {
    setModalRules(false)
    if (!alreadyCome) {
      alreadyCome = true
      setModalSettings(true)
    }
  }
  function handleModalSettings(nbPlayers, nbIAs) {
    setNbIAs(nbIAs)
    setNbPlayers(nbPlayers)
    setModalSettings(false)
  }
  function handleModalVictory() {
    setModalVictory(false)
    initNewGame()
  }

  // ### Game actions
  function handleClickValue(id, value) {
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles}]})
    if (hints > 0) {
      setHints(hints-1)
    }
    endTurn()
  }
  function handleClickColor(id, color) {
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles}]})
    if (hints > 0) {
      setHints(hints-1)
    }
    endTurn()
  }
  function handleClickValid(id, position) {
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles}]})
    let tempHands = [...hands]
    const playedCard = tempHands[id].splice(position, 1)[0]
    const newCard = draw()
    if (newCard) {
      tempHands[id].push(newCard)
    }
    setHands(tempHands)
    const success = playCardOnTheBoard(playedCard)
    if (success && playedCard.value === 5) {
      setHints(hints+1)
    }
    // setHistory((history) => {return [...history, {action:"play", player:id, position:position, success:success}]})
  }
  function handleClickCancel(id, position) {
    // setHistory((history) => {return [...history, {action:"discard", player:id, position:position}]})
    // console.log("Les mains", JSON.parse(JSON.stringify(hands)))
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles}]})
    let tempHands = [...hands]
    const discardedCard = tempHands[id].splice(position, 1)[0]
    discardCard(discardedCard)
    const newCard = draw()
    if (newCard) {
      tempHands[id].push(newCard)
    }
    setHands(tempHands)
    if (hints < maxHints) {
      setHints(hints+1)
    }
    // endTurn()
  }

  // ### Shared actions

  function initNewGame() {
    setCancelInvolved(false)
    setGameStarted(false)
    setPiles(buildPiles())
    setDeck(buildDeck())
    setHistory([])
    setDiscard([])
    setHands([])
    setNbPlayers(0)
    setErrors(0)
    setLastTurn(-1)
    setTurn(0)
    setHints(maxHints)
    setModalSettings(alreadyCome)
  }
  function endTurn() {
    switch (true) {
      case (points === 25) :
        setGameStarted(false)
        setModalVictory(true)
        break
      case (errors === 3) :
        setGameStarted(false)
        setModalFail(true)
        break
      case (lastTurn === nbPlayers) :
        setGameStarted(false)
        setModalVictory(true)
        break
      default :
        if (lastTurn === -1) {
          if (deck.length === 0) {
            setLastTurn(1)
            setModalLastTurn(true)
          }
        }
        else {
          setLastTurn((prevLastTurn) => {return prevLastTurn+1})
        }
        
        if (turn === nbPlayers-1) {
          setTurn(0)
        }
        else {
          setTurn((prevTurn) => {return prevTurn+1})
        }
        break
    }
  }
  function playCardOnTheBoard(card) {
    let newPiles = {...piles}
    if (newPiles[card.color].length + 1 === card.value) {
      newPiles[card.color].push(card)
      setPiles(newPiles)
      return true
    }
    else {
      setErrors((errors) => {return errors+1})
      discardCard(card)
      return false
    }
  }
  function discardCard(card) {
    let tempDiscard = [...discard]
    tempDiscard.push(card)
    setDiscard(tempDiscard)
  }
  function draw() {
    const tempDeck = [...deck]
    const card = tempDeck.pop()
    setDeck(tempDeck)
    return card
  }

  return (
    <>
      <HanabiContext.Provider value={hanabiContextValue}>
        <Modals modalDiscard={modalDiscard} modalFail={modalFail} modalLastTurn={modalLastTurn} modalReady={modalReady} modalRules={modalRules} modalSettings={modalSettings} modalVictory={modalVictory} points={points} errors={errors} discard={discard} turn={turn} />
        <Header points={points} errors={errors} deck={deck.length} piles={piles} hints={hints} discard={discard.length} history={history.length} />
        <div className="app--players-container">
          {
            hands.map((hand, i) => {
              return <Player key={i} id={i} hands={hands} turn={turn} ia={nbPlayers - nbIAs <= i} hide={modalReady} discard={discard} piles={piles} />
            })
          }
        </div>
      </HanabiContext.Provider>
    </>
  )
}