import React, { useEffect } from "react"
import { Route, Switch } from "react-router"

import "../App.css"

import Home from "./Home"
import NavBar from "./NavBar"

import GamesPage from "./games/GamesPage"
import MoviesPage from "./movies/MoviesPage"

const App = () => {
  useEffect(() => {
    document.title = "Backlog Tracker"
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
        <Route path="/games">
          <GamesPage />
        </Route>
        <Route path="/books">
          <p>Hello from the books page</p>
        </Route>
      </Switch>
    </div>
  )
}

export default App
