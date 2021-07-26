import React from "react"

const MovieCard = ({ movie }) => {
  const { id, rank, title, genre, year, runtime, complete } = movie

  return (
    <div className="movie-card">
      <p>{rank}</p>
      <h4>{title}</h4>
      <p>{genre}</p>
      <p>{runtime} min</p>
      <p>{year}</p>
      <p>{ complete ? "watched" : "unwatched" }</p>
    </div>
  )
}

export default MovieCard
