import React from "react"

const Sort = ({ sort, onChangeSort }) => {
  return (
    <div className="sort">
      <label htmlFor="sort">Sort by: </label>
      <select name="sort" onChange={onChangeSort} value={sort}>
        <option value=""></option>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
        <option value="year">Year</option>
        <option value="runtime">Runtime</option>
      </select>
    </div>
  )
}

export default Sort
