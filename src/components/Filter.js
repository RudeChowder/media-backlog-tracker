import React from "react"

const Filter = ({ filter, onChangeFilter }) => {
  return(
    <div className="filter" >
      <label htmlFor="filter">Filter: </label>
      <input 
        type="text"
        name="filter"
        placeholder="Search"
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  )
}

export default Filter
