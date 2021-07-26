import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <header className="navbar">
      <h2>
        <NavLink exact to="/">
          Home
        </NavLink>
      </h2>
      <h2>
        <NavLink exact to="/movies">
          Movies
        </NavLink>
      </h2>
      <h2>
        <NavLink exact to="/games">
          Games
        </NavLink>
      </h2>
      <h2>
        <NavLink exact to="/books">
          Books
        </NavLink>
      </h2>
    </header>
  )
}

export default NavBar
