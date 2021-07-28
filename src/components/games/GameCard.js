import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

const GameCard = ({ game, onDeleteGame, onChangeGameComplete }) => {
  const { id, title, genre, year, platform, complete } = game

  const handleClick = () => {
    const result = window.confirm("Are you sure you'd like to delete this game?")
    if (result) { onDeleteGame(id) }
  }

  return (
    <div className={`item-card${complete ? " complete" : ""}`}>
      <h4>{title}</h4>
      <p>{genre}</p>
      <p>{year}</p>
      <p>{platform}</p>
      <input
        type="checkbox"
        checked={complete}
        onChange={() => onChangeGameComplete(id, complete)}
      />
      <span className="button-container">
        <Link to={`/games/${id}/edit`}><FontAwesomeIcon className="edit-button" icon={faEdit} /></Link>
        <span className="delete-button" onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></span>
      </span>
    </div>
  )
}

export default GameCard

