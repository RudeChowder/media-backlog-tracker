import React from "react"
import { Link } from "react-router-dom"

const MovieCard = ({ movie, onDeleteMovie, onChangeMovieComplete }) => {
  const { id, rank, title, genre, year, runtime, complete } = movie

  const handleClick = () => {
    const result = window.confirm("Are you sure you'd like to delete this movie?")
    if (result) { onDeleteMovie(id) }
  }

  return (
    <div className="movie-card">
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
        <Link to={`/movies/${id}/edit`}><button className="edit-button" >✎</button></Link>
        <button className="delete-button" onClick={handleClick}>X</button>
      </span>
    </div>
  )
}

export default MovieCard

