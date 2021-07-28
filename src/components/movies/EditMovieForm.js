import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import MovieForm from "./MovieForm"

const EditMovieForm = ({ movies, onSubmitEditMovieForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    runtime: ""
  })
  const history = useHistory()
  const { id } = useParams()
  const movie = movies.find(movie => movie.id === parseInt(id))

  useEffect(() => {
    movie && setFormData({
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
      runtime: movie.runtime
    })
  }, [movie])

  if (!movie) { return <h2>Could not find that movie</h2> }

  const handleChangeInput = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmitMovieForm = (event) => {
    event.preventDefault()
    if (formData.title !== "") {
      onSubmitEditMovieForm(id, formData)
      history.push("/movies")
    } else {
      alert("Please fill in a title and re-submit")
    }
  }

  return (
    <main>
      <h3>Edit Movie Form</h3>
      <p>Update the movie info</p>
      <MovieForm
        formData={formData}
        onChangeInput={handleChangeInput}
        onSubmitMovieForm={handleSubmitMovieForm}
      />
    </main>
  )
}

export default EditMovieForm
