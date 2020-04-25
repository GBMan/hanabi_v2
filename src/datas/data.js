import _ from 'underscore'

// Définition des constantes
export const colors = ["blue", "green", "red", "white", "yellow"];
const values = [
    {value: 1, quantity: 3},
    {value: 2, quantity: 2},
    {value: 3, quantity: 2},
    {value: 4, quantity: 2},
    {value: 5, quantity: 1}
];
export const tabHandsCards = [
    {nbPlayers:2, nbCards:5},
    {nbPlayers:3, nbCards:5},
    {nbPlayers:4, nbCards:4},
    {nbPlayers:5, nbCards:4}
];
export const maxHints = 8;
export const maxNbPlayers = 5;
export const defaultNbPlayers = 3;
export const defaultNbIAs = 2;
export const plagePrestations = [
    {valueMax:5, text:"Horrible, huées de la foule..."},
    {valueMax:10, text:"Médiocre, à peine quelques applaudissements."},
    {valueMax:15, text:"Honorable, mais ne restera pas dans les mémoires..."},
    {valueMax:20, text:"Excellente, ravit la foule."},
    {valueMax:24, text:"Extraordinaire, restera gravée dans les mémoires !"},
    {valueMax:25, text:"Légendaire, petits et grands sans voix, des étoiles dans les yeux."}
];

export function buildDeck() {
    let deck = []
    let key = 0
    colors.forEach((color) => {
        values.forEach((value) => {
            for (let i=0; i<value.quantity; i++)
                deck.push({value:value.value, color:color, notColors:{}, notValues:{}, key:key++})
        })
    })
    return _.shuffle(deck)
}

export function buildPiles() {
    const nb = colors.length
    const piles = {}
    for (let i=0; i<nb; i++) {
        piles[colors[i]] = []
    }
    return piles
}