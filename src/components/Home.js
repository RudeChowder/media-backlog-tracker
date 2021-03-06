import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faFilm, faGamepad, faSync } from "@fortawesome/free-solid-svg-icons"

const Home = ({ movies, games, books }) => {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    generateSuggestions()
  }, [movies, games, books])

  const generateSuggestions = () => {
    const updatedSuggestions = []
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length)
      updatedSuggestions.push({ movie: movies[randomIndex] })
    }
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length)
      updatedSuggestions.push({ game: games[randomIndex] })
    }
    if (books.length > 0) {
      const randomIndex = Math.floor(Math.random() * books.length)
      updatedSuggestions.push({ book: books[randomIndex] })
    }
    setSuggestions(updatedSuggestions)
  }

  const suggestionElements = suggestions.map(suggestion => {
    const type = Object.keys(suggestion)[0]
    let icon = ""
    switch (type) {
      case "movie":
        icon = <FontAwesomeIcon className="suggestion-icon" icon={faFilm}></FontAwesomeIcon>
        break
      case "game":
        icon = <FontAwesomeIcon className="suggestion-icon" icon={faGamepad}></FontAwesomeIcon>
        break
      case "book":
        icon = <FontAwesomeIcon className="suggestion-icon" icon={faBook}></FontAwesomeIcon>
        break
      default:
        break
    }
    return (
      <div key={suggestion[type].title} className="suggestion-item">
        {icon}
        <h3>{suggestion[type].title}</h3>
        <p>{suggestion[type].genre}</p>
      </div>
    )
  })

  const determineContent = () => {
    if (suggestions.length === 0) {
      return <h3 className="suggestion-container">Looks like you have no unfinished media items!</h3>
    } else {
      return (
        <div className="suggestion-container">
          <h3>Here are some suggestions you can to tackle!</h3>
          {suggestionElements}
          <FontAwesomeIcon className="refresh-button" onClick={generateSuggestions} icon={faSync}></FontAwesomeIcon>
        </div>
      )
    }
  }

  return (
    <main className="home">
      <h2 className="suggestion-container">Welcome!</h2>
      <br />
      {determineContent()}
      <br></br>
    </main>
  )
}

export default Home
