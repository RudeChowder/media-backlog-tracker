import React from "react"
import { Link } from "react-router-dom"

import ItemCard from "./ItemCard"

const ItemsList = ({ items, itemType, onDeleteItem, onChangeItemComplete }) => {
  const generateHeaderElements = () => {
    const headerElements = []
    for (const key in items[0]) {
      switch (key) {
        case "id":
        case "title":
        case "complete":
          break
        default:
          headerElements.push(<p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>)
          break
      }
    }
    return headerElements
  }

  const itemCards = items.map(item => {
    return (
      <ItemCard
        key={item.id}
        item={item}
        itemType={itemType.toLowerCase()}
        onDeleteItem={onDeleteItem}
        onChangeItemComplete={onChangeItemComplete}
      />
    )
  })

  return (
    <div className="item-list">
      <Link className="new-item-link" to={`/${itemType.toLowerCase()}s/new`}>
        Add New {itemType}
      </Link>
      <div className="item-list-header">
        <p>Title</p>
        {generateHeaderElements()}
        <p>Complete</p>
      </div>
      {itemCards}
    </div>
  )
}

export default ItemsList
