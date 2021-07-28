import React from "react"
import { useHistory } from "react-router-dom"

const GameForm = ({ formData, onChangeInput, onSubmitGameForm }) => {
  const history = useHistory()
  const handleClickCancel = () => history.push("/games")

  return (
    <form className="item-form" onSubmit={onSubmitGameForm}>
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
          <label htmlFor="platform">Platform: </label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
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

export default GameForm
