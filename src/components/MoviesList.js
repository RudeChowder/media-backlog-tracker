import React from "react"

import MovieCard from "./MovieCard"

const MoviesList = ({ movies }) => {
  const movieItems = movies.map( movie => <MovieCard key ={movie.id} movie={movie} /> )

  return (
    <div className="movie-list">
      <div className="movie-list-header">
        <p>Rank</p>
        <p>Title</p>
        <p>Genre</p>
        <p>Runtime</p>
        <p>Year</p>
        <p>Complete</p>
      </div>
      {movieItems}
    </div>
  )
}

export default MoviesList
