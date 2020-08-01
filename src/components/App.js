import React, { useState, useEffect, useRef } from 'react';
import '../scss/app.scss';
import { tabHandsCards, maxHints, buildDeck, buildPiles, colors } from '../datas/data'
import Header from './Header'
import Player from './Player'
import Modals from './modal/Modals'
// import GameAnalysis from '../brain/GameAnalysis'
// import gsap from 'gsap'

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
  
  const nbCardsUseRef = useRef(null)
  
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
    if (gameStarted && !cancelInvolved) {
      let newPoints = 0
      const nb = colors.length
      for (let i=0; i<nb; i++) {
        if (piles[colors[i]]) {
          newPoints += piles[colors[i]].length
        }
      }
      setPoints(newPoints)
    }
  }, [piles])

  useEffect(() => {
    if (nbPlayers > 0) {
      // console.log("%cDistribution", "color:#f00")
      const tempDeck = [...deck]
      const newHands = []
      // const nbCards = tabHandsCards.find((rule) => {
      //   return rule.nbPlayers === nbPlayers
      // }).nbCards
      nbCardsUseRef.current = tabHandsCards.find((rule) => {
        return rule.nbPlayers === nbPlayers
      }).nbCards
      for (let i=0; i<nbPlayers; i++) {
        const newHand = []
        for (let j=0; j<nbCardsUseRef.current; j++) {
          newHand.push(tempDeck.pop())
        }
        newHands.push(newHand)
      }
      setHands(newHands)
      setDeck(tempDeck)
      setGameStarted(true)
    }
  }, [nbPlayers])

  useEffect(() => {
    if (gameStarted && !cancelInvolved) {
      endTurn()
    }
  }, [points, discard])

  useEffect(() => {
    // On enlève le verrou de retour en arrière de l'historique
    setCancelInvolved(false)
    
    startTurn()
  }, [turn, nbPlayers, nbIAs])

  // ### Header actions
  function handleCancel() {
    if (history.length === 0)
    return
    
    setCancelInvolved(true)

    const prevTurn = history.pop()

    setPiles(prevTurn.piles)
    setPoints(prevTurn.points)
    setHints(prevTurn.hints)
    setErrors(prevTurn.errors)
    setHands(prevTurn.hands)
    setDiscard(prevTurn.discard)
    setDeck(prevTurn.deck)
    setTurn(prevTurn.turn)
    setLastTurn(prevTurn.lastTurn)
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
    if (hints === 0) return false
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles, turn:turn, lastTurn:lastTurn, points:points}]})
    setHints(hints-1)
    endTurn()
    return true
  }
  function handleClickColor(id, color) {
    if (hints === 0) return false
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles, turn:turn, lastTurn:lastTurn, points:points}]})
    setHints(hints-1)
    endTurn()
    return true
  }
  function handleClickValid(id, position) {
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles, turn:turn, lastTurn:lastTurn, points:points}]})
    const nthPlayer = id+1
    // console.log(`id: ${nthPlayer}, position: ${position+1}`)
    // ###GSAP###
    // const timeline = gsap.timeline({defaults: {duration: .3}, onComplete:() => {handleClickValidAfterAnim(id, position)}})
    // timeline.to(`.player:nth-of-type(${nthPlayer})>.player--hand>.hand-card:nth-of-type(${(position+1)})`, {y: -10, opacity: .1, ease: 'power1.out'})
    // for (let i=position+2; i<=nbCardsUseRef.current; i++) {
    //   timeline.to(`.player:nth-of-type(${nthPlayer})>.player--hand>.hand-card:nth-of-type(${i})`, {x:-50})
    // }
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
    // endTurn()  // Dans ce cas la fin de tour sera déclenchée par la modification de la pile de jeu ou de la défausse
  }
  function handleClickValidAfterAnim(id, position) {
    return
    // ###GSAP###
    // gsap.to(`.player:nth-of-type(${(id+1)})>.player--hand>.hand-card:nth-of-type(${(position+1)})`, {duration: 0, y: 0, opacity: 1})
    // let tempHands = [...hands]
    // const playedCard = tempHands[id].splice(position, 1)[0]
    // const newCard = draw()
    // if (newCard) {
    //   tempHands[id].push(newCard)
    // }
    // setHands(tempHands)
    // const success = playCardOnTheBoard(playedCard)
    // if (success && playedCard.value === 5) {
    //   setHints(hints+1)
    // }

    // endTurn()  // Annulé, car dans ce cas la fin de tour sera déclenchée par la modification de la pile de jeu ou de la défausse. Ligne laissée volontairement pour que ce commentaire évite l'envie de mettre endTurn() à la fin de cette fonction.
  }
  function handleClickCancel(id, position) {
    const deepHands = JSON.parse(JSON.stringify(hands))
    const deepPiles = JSON.parse(JSON.stringify(piles))
    setHistory((history) => {return [...history, {hints:hints, errors:errors, hands:deepHands, discard:[...discard], deck:[...deck], piles:deepPiles, turn:turn, lastTurn:lastTurn, points:points}]})
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

    // endTurn()  // Annulé, car dans ce cas la fin de tour sera déclenchée par la modification de la pile de jeu ou de la défausse. Ligne laissée volontairement pour que ce commentaire évite l'envie de mettre endTurn() à la fin de cette fonction.
  }

  // ### Multiple time used actions

  function initNewGame() {
    setCancelInvolved(false)
    setGameStarted(false)
    setPiles(buildPiles())
    setDeck(buildDeck())
    setHistory([])
    setDiscard([])
    setHands([])
    setNbPlayers(0)
    setPoints(0)
    setErrors(0)
    setLastTurn(-1)
    setTurn(0)
    setHints(maxHints)
    setModalSettings(alreadyCome)
  }
  function startTurn() {
    if (humanTurn()) {
      setModalReady(true)
    }
    else {
      // console.log("%cOn va prendre une décision...", "color:red")
      startIADecision()
    }
  }
  function endTurn() {
    // console.log("endTurn", points, errors, lastTurn, nbPlayers)
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

  // ### Conceptual actions
  function humanTurn() {
    if (nbPlayers - nbIAs > 1) {
      if (nbPlayers - nbIAs > turn) {
        return true
      } 
    }
    return false
  }

  // ### IA decisions
  function startIADecision() {
    if (hints === 0) {
      // Play or discard
      iaPlayOrDiscard()
    }
    else if (hints === 1) {
      // Check if next player have something to play or discard
      // If not then play or discard
      // If he have something then check following player
    } 
    else {
      // Give hint if possible
      // If not then play or discard
    }
  }

  function iaPlayOrDiscard() {
    // const currentHand = new GameAnalysis(hands[turn])
    // const bestPlayableCard = currentHand.getBestPlayableCard()
  }

  // function getBestPlayableCard() {
  // }

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