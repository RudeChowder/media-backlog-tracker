import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import GameForm from "./GameForm"

const EditGameForm = ({ games, onSubmitEditGameForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    platform: ""
  })
  const history = useHistory()
  const { id } = useParams()
  const game = games.find(game => game.id === parseInt(id))

  useEffect(() => {
    game && setFormData({
      title: game.title,
      genre: game.genre,
      year: game.year,
      platform: game.platform
    })
  }, [game])

  if (!game) { return <h2>Could not find that Game</h2> }

  const handleChangeInput = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmitGameForm = (event) => {
    event.preventDefault()
    if (formData.title !== "") {
      onSubmitEditGameForm(id, formData)
      history.push("/games")
    } else {
      alert("Please fill in a title and re-submit")
    }
  }

  return (
    <main>
      <h3>Edit Game Form</h3>
      <p>Update the game info</p>
      <GameForm
        formData={formData}
        onChangeInput={handleChangeInput}
        onSubmitGameForm={handleSubmitGameForm}
      />
    </main>
  )
}

export default EditGameForm
