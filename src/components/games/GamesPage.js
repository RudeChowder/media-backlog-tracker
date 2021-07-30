import React, { useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

import Filter from "../Filter"
import Sort from "../Sort"
import ViewToggle from "../ViewToggle"
import ItemsList from "../ItemsList"

import EditGameForm from "./EditGameForm"
import NewGameForm from "./NewGameForm"

const GamesPage = ({ games, onDeleteGame, onChangeGameComplete, onSubmitNewGameForm, onSubmitEditGameForm }) => {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("")
  const match = useRouteMatch()
  const sortOptions = ["Title", "Genre", "Year", "Platform"]

  const handleChangeFilter = (event) => setFilter(event.target.value)
  const handleChangeSort = (event) => setSort(event.target.value)
  const handleChangeViewCompleted = (value) => setViewCompleted(value)

  const filteredGames = games
    .filter(game => game.complete === viewCompleted)
    .filter(game => filter === "" ? true : game.title.toLowerCase().includes(filter.toLowerCase()))

  const sortedFilteredGames = () => {
    switch (sort) {
      case "title":
      case "genre":
      case "platform":
        return [...filteredGames].sort((a, b) => a[sort].localeCompare(b[sort]))
      case "year":
        return [...filteredGames].sort((a, b) => a[sort] - b[sort])
      default:
        return filteredGames
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
          items={sortedFilteredGames()}
          itemType="Game"
          onDeleteItem={onDeleteGame}
          onChangeItemComplete={onChangeGameComplete}
        />
      </Route>
      <Route path={`${match.url}/new`} >
        <NewGameForm onSubmitNewGameForm={onSubmitNewGameForm} />
      </Route>
      <Route exact path={`${match.url}/:id/edit`}>
        <EditGameForm games={games} onSubmitEditGameForm={onSubmitEditGameForm} />
      </Route>
    </Switch>
  )
}

export default GamesPage
