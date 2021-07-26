import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"

import MoviesList from "./MoviesList"
import NewMovieForm from "./NewMovieForm"

const MoviesPage = () => {
  const [movies, setMovies] = useState([])
  const moviesUrl = "http://localhost:3001/movies"

  useEffect(() => {
    fetch(moviesUrl)
      .then(resp => resp.json())
      .then(data => setMovies(data))
      .then(() => console.log("fetching movies"))
      .catch(() => alert("Could not fetch movies. Please try again"))
  }, [])

  const handleSubmitNewMovieForm = (newMovie) => {
    const {title, genre, year, runtime} = newMovie
    
    const maxRank = movies.reduce(( a, b ) => a.rank > b.rank ? a.rank : b.rank)
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        genre: genre,
        year: parseInt(year),
        runtime: parseInt(runtime),
        complete: false,
        rank: parseInt(maxRank + 1)
      })
    }

    fetch(moviesUrl, configObj)
      .then(resp => resp.json())
      .then(data => setMovies([...movies, data]))
      .catch(() => alert("Ran into an error while trying to save. Please try again."))
  }

  const handleDeleteMovie = (id) => {
    fetch(`${moviesUrl}/${id}`, {method: "DELETE"})
      .then(() => {
        const updatedMovies = movies.filter( movie => movie.id !== id )
        setMovies(updatedMovies)
      })
      .catch(() => alert("Could not delete movie. Please try again."))
  }

  return (
    <Switch>
      <Route exact path="/movies">
        <MoviesList movies={movies} onDeleteMovie={handleDeleteMovie} />
      </Route>
      <Route path="/movies/new">
        <NewMovieForm onSubmitNewMovieForm={handleSubmitNewMovieForm} />
      </Route>
    </Switch>
  )
}

export default MoviesPage
