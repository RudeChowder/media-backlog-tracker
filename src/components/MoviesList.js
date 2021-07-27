import React from "react"
import { Link } from "react-router-dom"

import MovieCard from "./MovieCard"

const MoviesList = ({ movies, onDeleteMovie, onChangeMovieComplete }) => {
  const movieItems = movies.map( movie => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        onDeleteMovie={onDeleteMovie}
        onChangeMovieComplete={onChangeMovieComplete}
      />
    )
  })

  return (
    <div className="movie-list">
      <Link className="new-movie-link" to="/movies/new">
        Add New Movie
      </Link>
      <div className="movie-list-header">
        <p>Rank</p>
        <p>Title</p>
        <p>Genre</p>
        <p>Year</p>
        <p>Runtime</p>
        <p>Complete</p>
      </div>
      {movieItems}
    </div>
  )
}

export default MoviesList
