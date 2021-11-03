//rccp
import React from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
font-size: 1rem;
`;


// rewrite coinlist component into functional component

function CoinList(props, {loading})  {

  if (loading) {
    // try adding a spinner animation
    console.log('loading');
    return <h2>Loading...</h2>;
    
  }

  return (

    <Table className="table table-primary table border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          {props.showBalance?<th>Balance</th> : null}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
        {
          //distructured version - recommended; more explicit
          props.paginatedPosts.map(({ key, name, ticker, price, balance, rank, circulating_supply }) =>
            <Coin key={key}
              coinData={props.currentPosts}
              handleRefresh={props.handleRefresh}
              handleBuy={props.handleBuy}
              handleSell={props.handleSell}
              buyInputValue={props.buyInputValue}
              setBuyInputValue={props.setBuyInputValue}
              name={name}
              ticker={ticker}
              showBalance={props.showBalance}
              balance={balance}
              price={price}
              tickerId={key}
              rank={rank}
              circulating_supply={circulating_supply}
              insufficientUsdBalMessage={props.insufficientUsdBalMessage}
              setInsufficientUsdBalMessage={props.setInsufficientUsdBalMessage}
              insufficientTokenBalMessage={props.insufficientTokenBalMessage}
              setInsufficientTokenBalMessage={props.setInsufficientTokenBalMessage}
              isBuy={props.isBuy}
              setIsBuy={props.setIsBuy}
              isSold={props.isSold}
              setIsSold={props.setIsSold}

              loading={props.loading}
              posts={props.currentPosts}
              paginatedPosts={props.paginatedPosts}
          
       
            />

          )
        }
      </tbody>
    </Table>

  )

}

export default CoinList;