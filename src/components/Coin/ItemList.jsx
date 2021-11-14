import React from 'react'
import LineItem from './LineItem'

export default function ItemList({ items, handleCheck, handleDelete }) {
  return (
    <ul>
      <ul>{items.map((item) => (

        <LineItem
        key={item.id}
        item={item}
        intems={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        />
         
        ))}
        </ul>
     

    </ul>
  )
}
