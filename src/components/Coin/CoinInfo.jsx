import React from 'react';




const CoinInfo = (props) => {
 
  return (

    <h1 { ...props.handleClickInfo &&
      <h6>{props.tickerId(1)
        + "Rank:" + props.rank
        + "circulating_supply"
        + props.circulating_supply}</h6>
      }>Helllooo</h1>
    
   
  );
}

export default CoinInfo;