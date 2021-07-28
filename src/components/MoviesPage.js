import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

import ViewToggle from "./ViewToggle"
import EditMovieForm from "./EditMovieForm"
import Filter from "./Filter"
import MoviesList from "./MoviesList"
import NewMovieForm from "./NewMovieForm"
import Sort from "./Sort"

const MoviesPage = () => {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [filter,setFilter] = useState("")
  const [movies, setMovies] = useState([])
  // const [rankings, setRankings] = useState([1,2,4,5,9])
  const [sort, setSort] = useState("")
  const moviesUrl = "http://localhost:3001/movies"
  const match = useRouteMatch()

  useEffect(() => {
    fetch(moviesUrl)
      .then(resp => resp.json())
      .then(data => {
        setMovies(data)
        // const initialRanking = []
      //   data.forEach(movie => {
      //     initialRanking.push(movie.id)
      //   })
      //   setRankings(initialRanking)
      })
      .catch((error) => alert(`Could not fetch movies. Please try again. ${error}`))
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
      .catch((error) => alert("Ran into an error while trying to save. Please try again."))
  }

  const handleSubmitEditMovieForm = (id, movieInfo) => {
    const {title, genre, year, runtime} = movieInfo

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        genre: genre,
        year: parseInt(year),
        runtime: parseInt(runtime)
      })
    }
    fetch(`${moviesUrl}/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        const updatedMovies = movies.map(movie => movie.id === parseInt(id) ? data : movie)
        setMovies(updatedMovies)
      })
  }


  const handleDeleteMovie = (id) => {
    fetch(`${moviesUrl}/${id}`, {method: "DELETE"})
      .then(() => {
        const updatedMovies = movies.filter( movie => movie.id !== id )
        setMovies(updatedMovies)
      })
      .catch(() => alert("Could not delete movie. Please try again."))
  }

  const handleChangeMovieComplete = (id, complete) => {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        complete: !complete
      })
    }
    fetch(`${moviesUrl}/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        const updatedMovies = movies.map(movie => movie.id === id ? data : movie)
        setMovies(updatedMovies)
      })
  }

  const handleChangeFilter = (event) => setFilter(event.target.value)
  const handleChangeSort = (event) => setSort(event.target.value)
  const handleChangeViewCompleted = (value) => setViewCompleted(value)

  const filteredMovies = movies
    .filter(movie => movie.complete === viewCompleted)
    .filter(movie => filter === "" ? true : movie.title.toLowerCase().includes(filter.toLowerCase()))

  // const filteredRankings = () => {
  //   const filteredMovieIds = filteredMovies.map(movie => movie.id)
  //   return rankings.filter(rank => filteredMovieIds.includes(rank))
  // }

  const sortedFilteredMovies = () => {
    switch (sort) {
      case "title": 
      case "genre":
        return [...filteredMovies].sort(( a, b ) => a[sort].localeCompare(b[sort]))
      case "runtime":
      case "year":
        return [...filteredMovies].sort(( a, b ) => a[sort] - b[sort])
      default:
        return filteredMovies
        // return filteredRankings().map(rank => filteredMovies.find(movie => movie.id === rank))
    }
  }

  return (
    <Switch>
      <Route exact path={`${match.url}`} >
        <ViewToggle
          viewCompleted={viewCompleted}
          onChangeViewCompleted={handleChangeViewCompleted} 
        />
        <Filter
          filter={filter}
          onChangeFilter={handleChangeFilter} 
        />
        <Sort
          sort={sort}
          onChangeSort={handleChangeSort}
        />
        <MoviesList
          movies={sortedFilteredMovies()}
          onDeleteMovie={handleDeleteMovie}
          onChangeMovieComplete={handleChangeMovieComplete}
        />
      </Route>
      <Route path={`${match.url}/new`} >
        <NewMovieForm onSubmitNewMovieForm={handleSubmitNewMovieForm} />
      </Route>
      <Route exact path={`${match.url}/:id/edit`}>
        <EditMovieForm movies={movies} onSubmitEditMovieForm={handleSubmitEditMovieForm} />
      </Route>
    </Switch>
  )
}

export default MoviesPage
