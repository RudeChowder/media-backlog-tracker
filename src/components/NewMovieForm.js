import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import MovieForm from "./MovieForm"

const NewMovieForm = ({ onSubmitNewMovieForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    runtime: ""
  })

  const history = useHistory()

  const handleChangeInput = (event) => setFormData({...formData, [event.target.name]: event.target.value})

  const handleSubmitMovieForm = (event) => {
    event.preventDefault()
    if (formData.title !== "") {
      onSubmitNewMovieForm(formData)
      history.push("/movies")
    } else {
      alert("Please fill in a title and re-submit")
    }
  }

  return (
    <main>
      <h3>New Movie Form</h3>
      <p>Enter the info for the movie you want to watch</p>
      <MovieForm
        formData={formData}
        onChangeInput={handleChangeInput}
        onSubmitMovieForm={handleSubmitMovieForm}
      />
    </main>
  )
}

export default NewMovieForm
