import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import GameForm from "./GameForm"

const NewGameForm = ({ onSubmitNewGameForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    platform: ""
  })

  const history = useHistory()

  const handleChangeInput = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmitGameForm = (event) => {
    event.preventDefault()
    if (formData.title !== "") {
      onSubmitNewGameForm(formData)
      history.push("/games")
    } else {
      alert("Please fill in a title and re-submit")
    }
  }

  return (
    <main>
      <h3>New Game Form</h3>
      <p>Enter the info for the game you want to play</p>
      <GameForm
        formData={formData}
        onChangeInput={handleChangeInput}
        onSubmitGameForm={handleSubmitGameForm}
      />
    </main>
  )
}

export default NewGameForm
