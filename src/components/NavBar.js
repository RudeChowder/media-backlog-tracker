import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="navbar">
      <h3>
        <NavLink exact to="/">Home</NavLink>
      </h3>
      <h3>
        <NavLink exact to="/movies">Movies</NavLink>
      </h3>
      <h3>
        <NavLink exact to="/games">Games</NavLink>
      </h3>
      <h3>
        <NavLink exact to="/books">Books</NavLink>
      </h3>
    </nav>
  )
}

export default NavBar
