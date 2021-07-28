import React from "react"

const Filter = ({ filter, onChangeFilter }) => {
  return (
    <span className="filter" >
      <label htmlFor="filter">Filter: </label>
      <input
        type="text"
        name="filter"
        placeholder="Search by title"
        value={filter}
        onChange={onChangeFilter}
      />
    </span>
  )
}

export default Filter
