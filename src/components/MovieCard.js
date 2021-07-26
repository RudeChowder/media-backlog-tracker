import React from "react"

const MovieCard = ({ movie, onDeleteMovie }) => {
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
      <p>{runtime} min</p>
      <p>{year}</p>
      <p>{ complete ? "watched" : "unwatched" }</p>
      <button className="delete-button" onClick={handleClick}>X</button>
    </div>
  )
}

export default MovieCard
