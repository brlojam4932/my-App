import React from 'react'

// NOT USING THIS

function Posts({ coinData, loading }) {

  if (loading) {
    // try adding a spinner animation
    return <h2>Loading...</h2>
  }

  // key, name, ticker, price, balance, rank, circulating_supply 
  return (
    <ul className='list-group mb-4'>
      {coinData.map(post => (
        <li key={post.key} className='list-group-item'>
          {post.key} 
          {post.name} 
          {post.ticker} 
          {post.price}
          {post.balance}
        </li>
      ))}

    </ul>
  )
};

export default Posts;
