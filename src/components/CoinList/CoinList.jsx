//rccp
import React from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
font-size: 1rem;
`;


// rewrite coinlist component into functional component

function CoinList(props) {
  
  if (props.loading) {
    // try adding a spinner animation
    return <div className="alert alert-dismissible alert-danger">
    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
    <strong>Request failed!&nbsp;</strong>Loading...
  </div>
  }

  return (

    <Table className="table table-secondary table border table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          {props.showBalance ? <th>Balance</th> : null}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          //distructured version - recommended; more explicit
          props.coinData.map(({ 
            key, id, name, image, ticker, balance, rank, price, market_cap
           }) =>
            <Coin key={key}
              id={id}
              coinData={props.paginatedPosts}
              handleRefresh={props.handleRefresh}
              handleBuy={props.handleBuy}
              handleSell={props.handleSell}
              buyInputValue={props.buyInputValue}
              setBuyInputValue={props.setBuyInputValue}
              name={name}
              image={image}
              ticker={ticker}
              showBalance={props.showBalance}
              balance={balance}
              tickerId={key}
              rank={rank}
              market_cap={market_cap}
              price={price}
              insufficientUsdBalMessage={props.insufficientUsdBalMessage}
              setInsufficientUsdBalMessage={props.setInsufficientUsdBalMessage}
              insufficientTokenBalMessage={props.insufficientTokenBalMessage}
              setInsufficientTokenBalMessage={props.setInsufficientTokenBalMessage}
              isBuy={props.isBuy}
              setIsBuy={props.setIsBuy}
              isSold={props.isSold}
              setIsSold={props.setIsSold}
              loading={props.loading}
              setLoading={props.setLoading}
              setPaginatedPosts={props.setPaginatedPosts}
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              postsPerPage={props.postsPerPage}
            />

          )
        }
      </tbody>
    </Table>

  )

}

export default CoinList;