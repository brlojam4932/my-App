import React from 'react';

export default function Pagination({postsPerPage, paginate}) {
  
  const totalPosts = 100;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    console.log("totalPosts ", totalPosts);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number)=> (
          <li key={number.toString()} className='page-item' >
            <p onClick={() => paginate(number.toString())} className='page-link'>
              {number}
            </p>
          </li>
        ))}

      </ul>

    </nav>
  )
}