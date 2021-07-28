import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

import Fetcher from "../Fetcher"
import Filter from "../Filter"
import Sort from "../Sort"
import ViewToggle from "../ViewToggle"

import EditGameForm from "./EditGameForm"
import GamesList from "./GamesList"
import NewGameForm from "./NewGameForm"

const GamesPage = () => {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [filter, setFilter] = useState("")
  const [games, setGames] = useState([])
  const [sort, setSort] = useState("")
  const gamesUrl = "http://localhost:3001/games"
  const match = useRouteMatch()
  const sortOptions = ["Title", "Genre", "Year", "Platform"]

  useEffect(() => {
    Fetcher.get(gamesUrl)
      .then(data => {
        setGames(data)
      })
      .catch((error) => alert(`Could not fetch Games. Please try again. ${error}`))
  }, [])

  const handleSubmitNewGameForm = (newGame) => {
    const { title, genre, year, platform } = newGame
    const newRecordInfo = {
      title: title,
      genre: genre,
      year: parseInt(year),
      platform: platform,
      complete: false
    }

    Fetcher.post(gamesUrl, newRecordInfo)
      .then(data => setGames([...games, data]))
      .catch((error) => alert(`Ran into an error while trying to save. Please try again. ${error}`))
  }

  const handleSubmitEditGameForm = (id, gameInfo) => {
    const { title, genre, year, platform } = gameInfo
    const updateObj = {
      title: title,
      genre: genre,
      year: parseInt(year),
      platform: platform
    }

    Fetcher.patch(gamesUrl, id, updateObj)
      .then(data => {
        const updatedGames = games.map(game => game.id === parseInt(id) ? data : game)
        setGames(updatedGames)
      })
      .catch((error) => alert(`Failed to update item. Please try again. ${error}`))
  }

  const handleChangeGameComplete = (id, complete) => {
    const updateObj = { complete: !complete }

    Fetcher.patch(gamesUrl, id, updateObj)
      .then(data => {
        const updatedGames = games.map(game => game.id === id ? data : game)
        setGames(updatedGames)
      })
  }

  const handleDeleteGame = (id) => {
    Fetcher.delete(gamesUrl, id)
      .then(() => {
        const updatedGames = games.filter(game => game.id !== id)
        setGames(updatedGames)
      })
      .catch((error) => alert(`Could not delete. Please try again. ${error}`))
  }

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
        <GamesList
          games={sortedFilteredGames()}
          onDeleteGame={handleDeleteGame}
          onChangeGameComplete={handleChangeGameComplete}
        />
      </Route>
      <Route path={`${match.url}/new`} >
        <NewGameForm onSubmitNewGameForm={handleSubmitNewGameForm} />
      </Route>
      <Route exact path={`${match.url}/:id/edit`}>
        <EditGameForm games={games} onSubmitEditGameForm={handleSubmitEditGameForm} />
      </Route>
    </Switch>
  )
}

export default GamesPage
