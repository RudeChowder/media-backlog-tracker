import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import BookForm from "./BookForm"

const EditBookForm = ({ books, onSubmitEditBookForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    author: ""
  })
  const history = useHistory()
  const { id } = useParams()
  const book = books.find(book => book.id === parseInt(id))

  useEffect(() => {
    book && setFormData({
      title: book.title,
      genre: book.genre,
      year: book.year,
      author: book.author
    })
  }, [book])

  if (!book) { return <h2>Could not find that book</h2> }

  const handleChangeInput = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmitBookForm = (event) => {
    event.preventDefault()
    if (formData.title !== "") {
      onSubmitEditBookForm(id, formData)
      history.push("/books")
    } else {
      alert("Please fill in a title and re-submit")
    }
  }

  return (
    <main>
      <h3>Edit Book Form</h3>
      <p>Update the book info</p>
      <BookForm
        formData={formData}
        onChangeInput={handleChangeInput}
        onSubmitBookForm={handleSubmitBookForm}
      />
    </main>
  )
}

export default EditBookForm
