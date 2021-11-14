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
            key, name, ticker, balance, rank, circulating_supply, price, total_supply, max_supply, beta_value, first_data_at, last_updated
           }) =>
            <Coin key={key}
              coinData={props.paginatedPosts}
              handleRefresh={props.handleRefresh}
              handleBuy={props.handleBuy}
              handleSell={props.handleSell}
              buyInputValue={props.buyInputValue}
              setBuyInputValue={props.setBuyInputValue}
              name={name}
              ticker={ticker}
              showBalance={props.showBalance}
              balance={balance}
              tickerId={key}
              rank={rank}
              circulating_supply={circulating_supply}
              total_supply={total_supply}
              max_supply={max_supply}
              beta_value={beta_value}
              first_data_at={first_data_at}
              last_updated={last_updated}
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