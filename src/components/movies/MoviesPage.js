import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

import Fetcher from "../Fetcher"
import Filter from "../Filter"
import Sort from "../Sort"
import ViewToggle from "../ViewToggle"

import EditMovieForm from "./EditMovieForm"
import MoviesList from "./MoviesList"
import NewMovieForm from "./NewMovieForm"

const MoviesPage = () => {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [filter,setFilter] = useState("")
  const [movies, setMovies] = useState([])
  // const [rankings, setRankings] = useState([1,2,4,5,9])
  const [sort, setSort] = useState("")
  const moviesUrl = "http://localhost:3001/movies"
  const match = useRouteMatch()
  const sortOptions = ["Title", "Genre", "Year", "Runtime"]

  useEffect(() => {
    Fetcher.get(moviesUrl)
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
    // const maxRank = movies.reduce(( a, b ) => a.rank > b.rank ? a.rank : b.rank)
    const newRecordInfo = {
      title: title,
      genre: genre,
      year: parseInt(year),
      runtime: parseInt(runtime),
      complete: false,
      // rank: parseInt(maxRank + 1)
    }

    Fetcher.post(moviesUrl, newRecordInfo)
      .then(data => setMovies([...movies, data]))
      .catch((error) => alert(`Ran into an error while trying to save. Please try again. ${error}`))
  }

  const handleSubmitEditMovieForm = (id, movieInfo) => {
    const {title, genre, year, runtime} = movieInfo
    const updateObj = {
      title: title,
      genre: genre,
      year: parseInt(year),
      runtime: parseInt(runtime)
    }

    Fetcher.patch(moviesUrl, id, updateObj)
      .then(data => {
        const updatedMovies = movies.map(movie => movie.id === parseInt(id) ? data : movie)
        setMovies(updatedMovies)
      })
      .catch((error) => alert(`Failed to update item. Please try again. ${error}`))
  }

  const handleChangeMovieComplete = (id, complete) => {
    const updateObj = {complete: !complete}

    Fetcher.patch(moviesUrl, id, updateObj)
      .then(data => {
        const updatedMovies = movies.map(movie => movie.id === id ? data : movie)
        setMovies(updatedMovies)
      })
  }

  const handleDeleteMovie = (id) => {
    Fetcher.delete(moviesUrl, id)
      .then(() => {
        const updatedMovies = movies.filter( movie => movie.id !== id )
        setMovies(updatedMovies)
      })
      .catch((error) => alert(`Could not delete. Please try again. ${error}`))
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
          options={sortOptions}
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
