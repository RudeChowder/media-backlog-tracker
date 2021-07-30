import React, { useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

import Filter from "../Filter"
import Sort from "../Sort"
import ViewToggle from "../ViewToggle"

import EditMovieForm from "./EditMovieForm"
import ItemsList from "../ItemsList"
import NewMovieForm from "./NewMovieForm"

const MoviesPage = ({ movies, onDeleteMovie, onChangeMovieComplete, onSubmitNewMovieForm, onSubmitEditMovieForm }) => {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("")
  const match = useRouteMatch()
  const sortOptions = ["Title", "Genre", "Year", "Runtime"]

  const handleChangeFilter = (event) => setFilter(event.target.value)
  const handleChangeSort = (event) => setSort(event.target.value)
  const handleChangeViewCompleted = (value) => setViewCompleted(value)

  const filteredMovies = movies
    .filter(movie => movie.complete === viewCompleted)
    .filter(movie => filter === "" ? true : movie.title.toLowerCase().includes(filter.toLowerCase()))

  const sortedFilteredMovies = () => {
    switch (sort) {
      case "title":
      case "genre":
        return [...filteredMovies].sort((a, b) => a[sort].localeCompare(b[sort]))
      case "runtime":
      case "year":
        return [...filteredMovies].sort((a, b) => a[sort] - b[sort])
      default:
        return filteredMovies
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
        <ItemsList
          dataFields={sortOptions}
          items={sortedFilteredMovies()}
          itemType="Movie"
          onDeleteItem={onDeleteMovie}
          onChangeItemComplete={onChangeMovieComplete}
        />
      </Route>
      <Route path={`${match.url}/new`} >
        <NewMovieForm onSubmitNewMovieForm={onSubmitNewMovieForm} />
      </Route>
      <Route exact path={`${match.url}/:id/edit`}>
        <EditMovieForm movies={movies} onSubmitEditMovieForm={onSubmitEditMovieForm} />
      </Route>
    </Switch>
  )
}

export default MoviesPage
