import React from "react"
import { Link } from "react-router-dom"

import ItemCard from "./ItemCard"

const ItemsList = ({ items, itemType, onDeleteItem, onChangeItemComplete, dataFields }) => {
  const generateHeaderElements = () => dataFields.map(field => <p key={field}>{field}</p>)

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
        {generateHeaderElements()}
        <p>Complete</p>
      </div>
      {itemCards}
    </div>
  )
}

export default ItemsList
