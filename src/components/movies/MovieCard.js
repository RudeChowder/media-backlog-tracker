import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const MovieCard = ({ movie, onDeleteMovie, onChangeMovieComplete }) => {
  const { id, rank, title, genre, year, runtime, complete } = movie

  const handleClick = () => {
    const result = window.confirm("Are you sure you'd like to delete this movie?")
    if (result) { onDeleteMovie(id) }
  }

  return (
    <div className={`movie-card${complete ? " complete" : ""}`}>
      <p>{rank}</p>
      <h4>{title}</h4>
      <p>{genre}</p>
      <p>{year}</p>
      <p>{runtime} min</p>
      <input
        type="checkbox"
        checked={complete ? true : false}
        onChange={() => onChangeMovieComplete(id, complete)}
      />
      <span className="button-container">
        <Link to={`/movies/${id}/edit`}><FontAwesomeIcon className="edit-button" icon={faEdit} /></Link>
        <span className="delete-button" onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></span>
      </span>
    </div>
  )
}

export default MovieCard

