import React from 'react'
import { Route, Switch } from 'react-router';
import '../App.css'

import NavBar from './NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">

        </Route>
        <Route path="/movies">

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
