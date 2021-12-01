import React from 'react';
import ItemList from './ItemList';



const CoinInfo = ({ items, handleCheck, handleDelete }) => {


  return (
    <main>
       {items.length ? (
         <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />    
        ) : (
          <p style={{ marginTop: '2rem' }}>List is empty</p>
  
        )}
    </main>

    
  );
}

export default CoinInfo;