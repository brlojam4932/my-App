//rccp
import React from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
font-size: 1rem;
`;

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,

  padding: "10px"
};

const Div = styled.div`
  position: relative;
  top: 0px;
  right: -100px;
`

// rewrite coinlist component into functional component

export default function CoinList(props) {
    return (
     
      <div style={OTHER_CONTENT_STYLES}>
         <Div>
          <h4>Some detail here</h4>
          </Div>

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

      </div>
    
    )
  
}