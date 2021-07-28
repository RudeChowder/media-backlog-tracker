import React from "react"
import { Link } from "react-router-dom"

import GameCard from "./GameCard"

const GamesList = ({ games, onDeleteGame, onChangeGameComplete }) => {
  const GameItems = games.map( game => {
    return (
      <GameCard
        key={game.id}
        game={game}
        onDeleteGame={onDeleteGame}
        onChangeGameComplete={onChangeGameComplete}
      />
    )
  })

  return (
    <div className="item-list">
      <Link className="new-item-link" to="/games/new">
        Add New Game
      </Link>
      <div className="item-list-header">
        <p>Title</p>
        <p>Genre</p>
        <p>Year</p>
        <p>Platform</p>
        <p>Complete</p>
      </div>
      {GameItems}
    </div>
  )
}

export default GamesList
