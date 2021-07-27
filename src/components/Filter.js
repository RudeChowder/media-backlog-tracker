import React from "react"

const Filter = ({ filter, onChangeFilter, completedToggle, onChangeCompletedToggle }) => {
  return(
    <div className="filter" >
      <label htmlFor="completed-toggle">View Finished Movies:</label>
      <input 
        type="checkbox"
        value={completedToggle}
        onChange={onChangeCompletedToggle}
      />
      <br />
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
