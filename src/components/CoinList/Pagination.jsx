import React from 'react'

export default function Pagination( { postsPerPage, totalPosts, paginate }) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //href="/" -- not sure how it works - goes in the anchor tag
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>
        ))}

      </ul>

    </nav>
  )
}
