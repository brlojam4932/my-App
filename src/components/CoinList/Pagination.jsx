import React from 'react'

export default function Pagination( { postsPerPage, paginate }) {
  const totalPosts = 100;
  const pageNumbers = [];

  for (let i = 1; i <= (totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //href="/" -- not sure how it works - goes in the anchor tag
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <p onClick={() => paginate(number)}  className='page-link'>
              {number}
            </p>
          </li>
        ))}

      </ul>

    </nav>
  )
}
