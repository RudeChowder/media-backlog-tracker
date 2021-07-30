import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import BookForm from "./BookForm"

const NewBookForm = ({ onSubmitNewBookForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    author: ""
  })

  const history = useHistory()

  const handleChangeInput = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmitBookForm = (event) => {
    event.preventDefault()
    if (formData.title !== "") {
      onSubmitNewBookForm(formData)
      history.push("/books")
    } else {
      alert("Please fill in a title and re-submit")
    }
  }

  return (
    <main>
      <h3>New Book Form</h3>
      <p>Enter the info for the book you want to play</p>
      <BookForm
        formData={formData}
        onChangeInput={handleChangeInput}
        onSubmitBookForm={handleSubmitBookForm}
      />
    </main>
  )
}

export default NewBookForm
