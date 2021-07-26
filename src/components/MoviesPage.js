import React, { useEffect, useState } from "react"

import MoviesList from "./MoviesList"

const MoviesPage = () => {
  const [movies, setMovies] = useState([])
  const moviesUrl = "http://localhost:3001/movies"

  useEffect(() => {
    fetch(moviesUrl)
      .then(resp => resp.json())
      .then(data => setMovies(data))
      .catch(() => alert("Could not fetch movies. Please try again"))
  }, [])

  return (
    <MoviesList movies={movies} />
  )
}

export default MoviesPage
