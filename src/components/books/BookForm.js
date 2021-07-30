import React from "react"
import { useHistory } from "react-router-dom"

const BookForm = ({ formData, onChangeInput, onSubmitBookForm }) => {
  const history = useHistory()
  const handleClickCancel = () => history.push("/books")

  return (
    <form className="item-form" onSubmit={onSubmitBookForm}>
        <span className="item-form-input">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChangeInput}
          />
        </span>
        <span className="item-form-input">
          <label htmlFor="genre">Genre: </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={onChangeInput}
          />
        </span>
        <span className="item-form-input">
          <label htmlFor="year">Year: </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={onChangeInput}
          />
        </span>
        <span className="item-form-input">
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            name="author"
            value={formData.author}
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

export default BookForm
