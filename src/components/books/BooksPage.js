import React, { useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

import Filter from "../Filter"
import Sort from "../Sort"
import ViewToggle from "../ViewToggle"
import ItemsList from "../ItemsList"

import EditBookForm from "./EditBookForm"
import NewBookForm from "./NewBookForm"

const BooksPage = ({ books, onDeleteBook, onChangeBookComplete, onSubmitNewBookForm, onSubmitEditBookForm }) => {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("")
  const match = useRouteMatch()
  const sortOptions = ["Title", "Genre", "Year", "Author"]

  const handleChangeFilter = (event) => setFilter(event.target.value)
  const handleChangeSort = (event) => setSort(event.target.value)
  const handleChangeViewCompleted = (value) => setViewCompleted(value)

  const filteredBooks = books
    .filter(book => book.complete === viewCompleted)
    .filter(book => filter === "" ? true : book.title.toLowerCase().includes(filter.toLowerCase()))

  const sortedFilteredBooks = () => {
    switch (sort) {
      case "title":
      case "genre":
      case "author":
        return [...filteredBooks].sort((a, b) => a[sort].localeCompare(b[sort]))
      case "year":
        return [...filteredBooks].sort((a, b) => a[sort] - b[sort])
      default:
        return filteredBooks
    }
  }

  return (
    <Switch>
      <Route exact path={`${match.url}`} >
        <ViewToggle
          viewCompleted={viewCompleted}
          onChangeViewCompleted={handleChangeViewCompleted}
        />
        <Filter
          filter={filter}
          onChangeFilter={handleChangeFilter}
        />
        <Sort
          sort={sort}
          onChangeSort={handleChangeSort}
          options={sortOptions}
        />
        <ItemsList
          dataFields={sortOptions}
          items={sortedFilteredBooks()}
          itemType="Book"
          onDeleteItem={onDeleteBook}
          onChangeItemComplete={onChangeBookComplete}
        />
      </Route>
      <Route path={`${match.url}/new`} >
        <NewBookForm onSubmitNewBookForm={onSubmitNewBookForm} />
      </Route>
      <Route exact path={`${match.url}/:id/edit`}>
        <EditBookForm books={books} onSubmitEditBookForm={onSubmitEditBookForm} />
      </Route>
    </Switch>
  )
}

export default BooksPage
