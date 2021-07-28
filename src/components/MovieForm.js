import React from "react"
import { useHistory } from "react-router-dom"

const MovieForm = ({ formData, onChangeInput, onSubmitMovieForm }) => {
  const history = useHistory()
  const handleClickCancel = () => history.push("/movies")

  return (
    <form className="movie-form" onSubmit={onSubmitMovieForm}>
        <span className="movie-form-input">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChangeInput}
          />
        </span>
        <span className="movie-form-input">
          <label htmlFor="genre">Genre: </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={onChangeInput}
          />
        </span>
        <span className="movie-form-input">
          <label htmlFor="year">Year: </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={onChangeInput}
          />
        </span>
        <span className="movie-form-input">
          <label htmlFor="runtime">Runtime: </label>
          <input
            type="number"
            name="runtime"
            value={formData.runtime}
            onChange={onChangeInput}
          />
        </span>
        <span>
          <button type="submit" className="submit-button" >Submit</button>
          <button type="button" className="cancel-button" onClick={handleClickCancel}>Cancel</button>
        </span>
      </form>
  )
}

export default MovieForm
