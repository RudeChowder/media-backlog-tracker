import React from 'react'
import { Route, Switch } from 'react-router'

import '../App.css'

import Home from "./Home"
import MoviesPage from './MoviesPage'
import NavBar from './NavBar'

function App() {
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

        </Route>
        <Route path="/books">

        </Route>
      </Switch>
    </div>
  );
}

export default App;
