import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const NewMovieForm = ({ onSubmitNewMovieForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    runtime: ""
  })

  const history = useHistory()

  const handleChangeInput = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmitMovieForm = (event) => {
    event.preventDefault()
    if (formData.title !== "" && formData.genre !== "" && formData.year !== "" && formData.runtime !== "") {
      onSubmitNewMovieForm(formData)
      history.push("/movies")
    } else {
      alert("Please fill in all fields and re-submit")
    }
  }

  return (
    <main>
      <h3>New Movie Form</h3>
      <p>Enter the info for the movie you want to watch</p>
      <form className="movie-form" onSubmit={handleSubmitMovieForm}>
        <span>
          <label htmlFor="title">Title: </label>
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChangeInput}
          />
        </span>
        <span>
          <label htmlFor="genre">Genre: </label>
          <input 
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChangeInput}
          />
        </span>
        <span>
          <label htmlFor="runtime">Runtime: </label>
          <input 
            type="number"
            name="runtime"
            value={formData.runtime}
            onChange={handleChangeInput}
          />
        </span>
        <span>
          <label htmlFor="year">Year: </label>
          <input 
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChangeInput}
          />
        </span>
        <button type="submit" >Submit</button>
      </form>
    </main>
  )
}

export default NewMovieForm
