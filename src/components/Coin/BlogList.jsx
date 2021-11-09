import React from 'react';
import { useState } from 'react/cjs/react.production.min';

const BlogList = ( ) => {
  const [items, setItems] = useState(
    [
      {
        id: 1,
        item: "Bitcoin has aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "Rex",
        checked: false
  
      },
      {
        id: 2,
        item: "Ethereum will ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debsamus eos aliquam. Iste upiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "Jill",
        checked: false
      },
      {
        id: 3,
        item: "Third coin has ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excemus commodi autem?",
        author: "mario",
        checked: false
  
      },
      {
        id: 4,
        item: "Fourth Coin ipsum dolor sit, amet consectetur adipisicing elit. Sit m consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "mario",
        checked: false
      },
      {
        id: 5,
        item: "Fith Coin ipsum dolor sit, amet consectetur adipisicing elit. Sit cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "mario",
        checked: false
      },
      {
        id: 6,
        item: "Sixth Coin ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi porro libero tempora eum dolor. Ipsum!",
        author: "mario",
        checked: false
      }
    ] 
)
  return ( 
    <ul>
      {items.map((item)=> (
        <li className='item' key={item.id}>
          <p>{items}</p>

        </li>
      ))}
    </ul>
   );
}
 
export default BlogList;