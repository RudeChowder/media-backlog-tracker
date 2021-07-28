import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

const ItemCard = ({ item, itemType, onDeleteItem, onChangeItemComplete }) => {
  const { id, title, complete } = item
  // const keys = Object.keys(item).filter(key => key !== "id")
  const generateItemCardElements = () => {
    const itemElements = []
    for (const key in item) {
      switch (key) {
        case "title":
          itemElements.push(<h4 key={key}>{title}</h4>)
          break
        case "complete":
          itemElements.push(
            <input
              key={key}
              type="checkbox"
              checked={complete}
              onChange={() => onChangeItemComplete(id, complete)}
            />
          )
          break
        case "id":
          break
        default:
          itemElements.push(<p key={key}>{item[key]}</p>)
          break
      }
    }
    return itemElements
  }

  const handleClick = () => {
    const result = window.confirm(`Are you sure you'd like to delete '${title}'?`)
    if (result) { onDeleteItem(id) }
  }

  return (
    <div className={`item-card${complete ? " complete" : ""}`}>
      {generateItemCardElements()}
      <span className="button-container">
        <Link to={`/${itemType}s/${id}/edit`}><FontAwesomeIcon className="edit-button" icon={faEdit} /></Link>
        <span className="delete-button" onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></span>
      </span>
    </div>
  )
}

export default ItemCard
