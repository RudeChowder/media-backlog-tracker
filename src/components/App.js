import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router"

import "../App.css"
import Fetcher from "./Fetcher"

import Home from "./Home"
import NavBar from "./NavBar"

import BooksPage from "./books/BooksPage"
import GamesPage from "./games/GamesPage"
import MoviesPage from "./movies/MoviesPage"

const App = () => {
  const [books, setBooks] = useState([])
  const [games, setGames] = useState([])
  const [movies, setMovies] = useState([])
  const booksUrl = `${process.env.REACT_APP_API_URL}/books`
  const gamesUrl = `${process.env.REACT_APP_API_URL}/games`
  const moviesUrl = `${process.env.REACT_APP_API_URL}/movies`

  useEffect(() => {
    document.title = "Backlog Tracker"

    Fetcher.get(booksUrl)
      .then(data => {
        setBooks(data)
      })
      .catch((error) => alert(`Could not fetch books. Please try again. ${error}`))

    Fetcher.get(gamesUrl)
      .then(data => {
        setGames(data)
      })
      .catch((error) => alert(`Could not fetch games. Please try again. ${error}`))

    Fetcher.get(moviesUrl)
      .then(data => {
        setMovies(data)
      })
      .catch((error) => alert(`Could not fetch movies. Please try again. ${error}`))
  }, [])

  const handleSubmitNewMovieForm = (newMovie) => {
    const { title, genre, year, runtime } = newMovie
    const newRecordInfo = {
      title: title,
      genre: genre,
      year: parseInt(year),
      runtime: parseInt(runtime),
      complete: false
    }

    Fetcher.post(moviesUrl, newRecordInfo)
      .then(data => setMovies([...movies, data]))
      .catch((error) => alert(`Ran into an error while trying to save. Please try again. ${error}`))
  }

  const handleSubmitEditMovieForm = (id, movieInfo) => {
    const { title, genre, year, runtime } = movieInfo
    const updateObj = {
      title: title,
      genre: genre,
      year: parseInt(year),
      runtime: parseInt(runtime)
    }

    Fetcher.patch(moviesUrl, id, updateObj)
      .then(data => {
        const updatedMovies = movies.map(movie => movie.id === parseInt(id) ? data : movie)
        setMovies(updatedMovies)
      })
      .catch((error) => alert(`Failed to update item. Please try again. ${error}`))
  }

  const handleChangeMovieComplete = (id, complete) => {
    const updateObj = { complete: !complete }

    Fetcher.patch(moviesUrl, id, updateObj)
      .then(data => {
        const updatedMovies = movies.map(movie => movie.id === id ? data : movie)
        setMovies(updatedMovies)
      })
  }

  const handleDeleteMovie = (id) => {
    Fetcher.delete(moviesUrl, id)
      .then(() => {
        const updatedMovies = movies.filter(movie => movie.id !== id)
        setMovies(updatedMovies)
      })
      .catch((error) => alert(`Could not delete. Please try again. ${error}`))
  }

  const handleSubmitNewGameForm = (newGame) => {
    const { title, genre, year, platform } = newGame
    const newRecordInfo = {
      title: title,
      genre: genre,
      year: parseInt(year),
      platform: platform,
      complete: false
    }

    Fetcher.post(gamesUrl, newRecordInfo)
      .then(data => setGames([...games, data]))
      .catch((error) => alert(`Ran into an error while trying to save. Please try again. ${error}`))
  }

  const handleSubmitEditGameForm = (id, gameInfo) => {
    const { title, genre, year, platform } = gameInfo
    const updateObj = {
      title: title,
      genre: genre,
      year: parseInt(year),
      platform: platform
    }

    Fetcher.patch(gamesUrl, id, updateObj)
      .then(data => {
        const updatedGames = games.map(game => game.id === parseInt(id) ? data : game)
        setGames(updatedGames)
      })
      .catch((error) => alert(`Failed to update item. Please try again. ${error}`))
  }

  const handleChangeGameComplete = (id, complete) => {
    const updateObj = { complete: !complete }

    Fetcher.patch(gamesUrl, id, updateObj)
      .then(data => {
        const updatedGames = games.map(game => game.id === id ? data : game)
        setGames(updatedGames)
      })
  }

  const handleDeleteGame = (id) => {
    Fetcher.delete(gamesUrl, id)
      .then(() => {
        const updatedGames = games.filter(game => game.id !== id)
        setGames(updatedGames)
      })
      .catch((error) => alert(`Could not delete. Please try again. ${error}`))
  }

  const handleSubmitNewBookForm = (newBook) => {
    const { title, genre, year, author } = newBook
    const newRecordInfo = {
      title: title,
      genre: genre,
      year: parseInt(year),
      author: author,
      complete: false
    }

    Fetcher.post(booksUrl, newRecordInfo)
      .then(data => setBooks([...books, data]))
      .catch((error) => alert(`Ran into an error while trying to save. Please try again. ${error}`))
  }

  const handleSubmitEditBookForm = (id, bookInfo) => {
    const { title, genre, year, author } = bookInfo
    const updateObj = {
      title: title,
      genre: genre,
      year: parseInt(year),
      author: author
    }

    Fetcher.patch(booksUrl, id, updateObj)
      .then(data => {
        const updatedBooks = books.map(book => book.id === parseInt(id) ? data : book)
        setBooks(updatedBooks)
      })
      .catch((error) => alert(`Failed to update item. Please try again. ${error}`))
  }

  const handleChangeBookComplete = (id, complete) => {
    const updateObj = { complete: !complete }

    Fetcher.patch(booksUrl, id, updateObj)
      .then(data => {
        const updatedBooks = books.map(book => book.id === id ? data : book)
        setBooks(updatedBooks)
      })
  }

  const handleDeleteBook = (id) => {
    Fetcher.delete(booksUrl, id)
      .then(() => {
        const updatedBooks = books.filter(book => book.id !== id)
        setBooks(updatedBooks)
      })
      .catch((error) => alert(`Could not delete. Please try again. ${error}`))
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home
            movies={movies.filter(movie => !movie.complete)}
            games={games.filter(game => !game.complete)}
            books={books.filter(book => !book.complete)}
          />
        </Route>
        <Route path="/movies">
          <MoviesPage
            movies={movies}
            onSubmitNewMovieForm={handleSubmitNewMovieForm}
            onSubmitEditMovieForm={handleSubmitEditMovieForm}
            onChangeMovieComplete={handleChangeMovieComplete}
            onDeleteMovie={handleDeleteMovie}
          />
        </Route>
        <Route path="/games">
          <GamesPage
            games={games}
            onSubmitNewGameForm={handleSubmitNewGameForm}
            onSubmitEditGameForm={handleSubmitEditGameForm}
            onChangeGameComplete={handleChangeGameComplete}
            onDeleteGame={handleDeleteGame}
          />
        </Route>
        <Route path="/books">
        <BooksPage
            books={books}
            onSubmitNewBookForm={handleSubmitNewBookForm}
            onSubmitEditBookForm={handleSubmitEditBookForm}
            onChangeBookComplete={handleChangeBookComplete}
            onDeleteBook={handleDeleteBook}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App
