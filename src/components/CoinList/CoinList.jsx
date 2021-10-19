//rccp
import React from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
font-size: 1rem;
`;


// rewrite coinlist component into functional component

export default function CoinList(props) {
    return (

          <Table className="table table-primary table border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
          //distructured version - recommended; more explicit
          props.coinData.map(({key, name, ticker, price, balance, rank, circulating_supply}) =>
              <Coin key={key} 
              handleRefresh={props.handleRefresh}
              handleTransaction={props.handleTransaction}
              name={name} 
              ticker={ticker}
              showBalance={props.showBalance}
              balance={balance}
              price={price}
              tickerId={key}
              rank={rank}
              circulating_supply={circulating_supply}
              />
              
            )
        }
      </tbody>
    </Table>
    
    )
  
}