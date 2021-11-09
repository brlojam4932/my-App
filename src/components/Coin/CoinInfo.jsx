import React from 'react';
//import { useState } from 'react/cjs/react.production.min';



const CoinInfo = ({ items, handleCheck, handleDelete }) => {


  return (
    <main>
      {items.length ? (
         <ul>{items.map((item) => (
          <li className="item" key={item.id} >
            <input
              type="checkBox"
              onChange={() => handleCheck(item.id)}
              checked={item.checked}
            />
            <label
              style={(item.checked) ? {textDecoration: 'line-through'} : null}
              onDoubleClick={() => handleCheck(item.id)}
            >{item.item}</label>
    
            <button
            onClick={() => handleDelete(item.id)}
            >Delete</button>
          </li>
        ))}</ul>
      ) : (
        <p style={{marginTop: '2rem'}}>List is empty</p>

      )}
    </main>

    
  );
}

export default CoinInfo;