import React from 'react';

function CoinDescription({ data }) {
  const { about } = data;

  const renderInfo = () => {
    if(detail) {
      return (
        <p>{about.description.en}</p>
      )
    }
  }
  
  return (
    <h4>Info:{renderInfo()}</h4>
  )
}

export default CoinDescription;
