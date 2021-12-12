//rccp
import React from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
font-size: 1rem;
background-color: #000000;
`;


// rewrite coinlist component into functional component

function CoinList(props) {

  /*
   circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        maxSupply: max_supply,
        volume: volume_24h,
        marketCap:market_cap,
        percentChange1h: percent_change_1h
        */ 
  return (
    
      <Table className="table table-hover">
        <thead>
          <tr class="table-active">
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Change 24h</th>
            {props.showBalance ? <th>Balance</th> : null}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            //distructured version - recommended; more explicit
            props.coinData.map(({ key, name, ticker, price, balance, rank, circulatingSupply,
              totalSupply, maxSupply, volume24h, marketCap, percentChange24h, description }) =>
              <Coin key={key}
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
                circulatingSupply={circulatingSupply}
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                volume24h={volume24h}
                marketCap={marketCap}
                percentChange24h={percentChange24h}
                description={description}
                insufficientUsdBalMessage={props.insufficientUsdBalMessage}
                setInsufficientUsdBalMessage={props.setInsufficientUsdBalMessage}
                insufficientTokenBalMessage={props.insufficientTokenBalMessage}
                setInsufficientTokenBalMessage={props.setInsufficientTokenBalMessage}
                isBuy={props.isBuy}
                setIsBuy={props.setIsBuy}
                isSold={props.isSold}
                setIsSold={props.setIsSold}
              />

            )
          }
        </tbody>
      </Table>
  )

}

export default CoinList;