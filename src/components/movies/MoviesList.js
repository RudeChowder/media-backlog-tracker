import React from "react"
import { Link } from "react-router-dom"

import ItemCard from "../ItemCard"

const MoviesList = ({ movies, onDeleteMovie, onChangeMovieComplete }) => {
  const movieItems = movies.map(movie => {
    return (
      <ItemCard
        key={movie.id}
        item={movie}
        itemType="movie"
        onDeleteItem={onDeleteMovie}
        onChangeItemComplete={onChangeMovieComplete}
      />
    )
  })

  return (
    <div className="item-list">
      <Link className="new-item-link" to="/movies/new">
        Add New Movie
      </Link>
      <div className="item-list-header">
        <p>Title</p>
        <p>Genre</p>
        <p>Year</p>
        <p>Runtime</p>
        <p>Complete</p>
      </div>
      {movieItems}
    </div>
  )
}

export default MoviesList
