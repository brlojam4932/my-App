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

  /*
        key: token.id,
        id: token.id,
        image: token.image,
        name: token.name,
        ticker: token.symbol,
        balance: 0,
        price: formatPrice(token.current_price),
        marketCap: token.market_cap,
        totalSupply: token.total_supply,
        volume24h: token.total_volume,
        high24h: token.high_24h,
        circulatingSupply: token.circulating_supply,
        low24h: token.low_24,
        priceChange24h: parseFloat(Number(token.price_change_percentage_24h).toFixed(2)),
  */


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
            key, id, image, name, ticker, balance, price, marketCap, totalSupply, volume24h, high24h, low24h, circulatingSupply, priceChange24h 
           }) =>
            <Coin key={key}
              id={id}
              name={name}
              image={image}
              ticker={ticker}
              balance={balance}
              price={price}
              marketCap={marketCap}
              totalSupply={totalSupply}
              volume24h={volume24h}
              high24h={high24h}
              low24h={low24h}
              circulatingSupply={circulatingSupply}
              priceChange24h={priceChange24h}
              coinData={props.coinData}
              handleRefresh={props.handleRefresh}
              handleBuy={props.handleBuy}
              handleSell={props.handleSell}
              buyInputValue={props.buyInputValue}
              setBuyInputValue={props.setBuyInputValue}
              showBalance={props.showBalance}
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
            />

          )
        }
      </tbody>
    </Table>

  )

}

export default CoinList;