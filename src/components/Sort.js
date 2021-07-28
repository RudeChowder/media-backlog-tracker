import React from "react"

const Sort = ({ sort, onChangeSort, options }) => {
  const optionsItems = options.map(option => {
    return (
      <option key={option} value={option.toLowerCase()} >{option}</option>
    )
  })

  return (
    <span className="sort">
      <label htmlFor="sort">Sort by: </label>
      <select name="sort" onChange={onChangeSort} value={sort}>
        <option value=""></option>
        {optionsItems}
      </select>
    </span>
  )
}

export default Sort
