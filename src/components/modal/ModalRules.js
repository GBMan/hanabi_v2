import React from 'react'

export default function ModalRules(props) {
    let {
        call,
        show
    } = props

    return (
        <div className={`modal-container--animator ${(show) ? "show" : ""}`}>
            <div className="modal modal-rules">
                <h2>Règles d'Hanabi</h2>
                <div className="modal-rules--content">
                    <p>Adaptation du jeu de société Hanabi créé par l'excellent Antoine Bauza. Il s'agit d'un jeu coopératif dont l'objectif est de réaliser le plus beau feu d'artifice possible en plaçant, pour chacune des 5 couleurs, les cartes dans l'ordre de 1 à 5. L'originalité de ce jeu réside dans le fait que plutôt que de voir uniquement ses cartes, chaque joueur voit au contraire toutes les cartes sauf les siennes.</p>

                    <h3>Mise en place</h3>
                    <p>Au début de la partie, l'équipe de joueurs dispose de 8 points indice. Chaque joueur reçoit 5 cartes (à 2 ou 3 joueurs) ou 4 cartes (à 4 ou 5 joueurs).</p>

                    <h3>Déroulé</h3>
                    <p>À leur tour de jeu, les joueurs peuvent :</p>
                    <ul>
                        <li>soit donner une <em>indication</em> à un autre joueur (cette action coûte 1 point indice),</li>
                        <li>soit défausser une carte (et alors gagner 1 point indice) puis en piocher une nouvelle,</li>
                        <li>soit jouer une carte puis en piocher une nouvelle.</li>
                    </ul>
                    <p>La carte jouée doit compléter le feu d'artifice, c'est-à-dire être supérieure de 1 à la valeur en cour d'une couleur. Si la carte jouée ne remplit pas cette condition, l'équipe reçoit 1 point erreur. Jouer avec succès une carte de valeur 5 rapporte 1 point indice.</p>

                    <h3>Indication</h3>
                    <p>Les indications que les joueurs peuvent se donner sont codifiées. Elles permettent d'indiquer à un joueur exhaustivement quelles sont ses cartes d'une certaine valeur ou d'une certaine couleur donnée, ni plus ni moins.</p>

                    <h3>Composition du paquet</h3>
                    <p>Le jeu comporte 50 cartes réparties, pour chacune des cinq couleurs, comme suit : trois cartes 1, deux cartes 2, deux cartes 3, deux cartes 4 et une carte 5.</p>

                    <h3>Fin de partie</h3>
                    <p>Si l'équipe a fait 3 erreurs, la partie s'arrête immédiatement : l'équipe a perdu et n'a donc aucun point.</p>

                    <p>Si les joueurs posent le cinquième cinq, la partie s'arrête immédiatement, c'est une belle victoire.</p>

                    <p>S'ils arrivent à la fin de la pioche, chaque joueur rejoue une dernière fois puis la partie prend fin. Le score correspond alors à la somme des cartes posées les plus grandes pour chaque couleur.</p>
                </div>
                <button className="btn btn-standard" onClick={(event) => {call()}}>Compris !</button>
            </div>
        </div>
    )
}
