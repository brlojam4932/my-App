import React, { useState, useEffect } from 'react';
// imp tab
import "bootswatch/dist/flatly/bootstrap.min.css";
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';


//instructor: zsolt-nagy

import "fontawesome-free/js/all.js";


// bkg area for table
const Div = styled.div`
text-align: center;
background-color: #3E434F;
color: #ccc;`;



// UTILITY FUNCTIONS
const COIN_COUNT = 3;
const formatPrice = price => parseFloat(Number(price).toFixed(4));


function App() {

  const [accountBalance, setAccountBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [buyInputValue, setBuyInputValue] = useState('');
  const [insufficientUsdBalMessage, setInsufficientUsdBalMessage] = useState(false);
  const [insufficientTokenBalMessage, setInsufficientTokenBalMessage] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [isSold, setIsSold] = useState(false);

  const componentDidMount = async () => {
  
    //console.log("MOUNT");
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    // we are now receiving strings as data so we don't need an object anymore
    // we also use const instead of let as we are not changing the data
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const ticketUrl = 'https://api.coinpaprika.com/v1/tickers/';
    // we get a promise that our data will be sent to us sometime in the future
    const promises = coinIds.map(id => axios.get(ticketUrl + id));
    // we use the await operator to wait for our promise
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function (response) {
      const coin = response.data;
      return {
        key: coin.id, // here we have our key
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes["USD"].price),
        rank: coin.rank,
        circulating_supply: coin.circulating_supply
      };
    });

    // Retrieve the prices
    setCoinData(coinPriceData);
    //console.log(response); 
  }

  // we don't want to call the same function over and over again. we only want to load it if we need it
  // a synchronous function
  useEffect(() => {
    if (coinData.length === 0) {
      // component did mount
      componentDidMount();
    }
  });



  const handleBrrr = () => {
    setAccountBalance(prevBalance => prevBalance + 1200);
  }


  // there are no longer global variables, instead they are now local constants
  const handleToggleChange = () => {
    setShowBalance(prevValue => !prevValue);
  }
  

  // create isBuy and valueChangId args
  const handleBuy = async (valueChangeId, amountValue) => {
    const ticketUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(ticketUrl);
    const newPrice = formatPrice(response.data.quotes["USD"].price);
    const newCoinData = coinData.map(function (values) {
      let newValues = { ...values };

      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue);
        let newAccountBalance = accountBalance - (newPrice * amountOfCoin);

        if (newAccountBalance > 0 && amountValue > 0) {
          setAccountBalance(newAccountBalance);
          newValues.balance += amountOfCoin;
          setInsufficientUsdBalMessage(false);
          setIsBuy(true);
        }
        else {
          setInsufficientUsdBalMessage(true)
          setIsBuy(false);
        }

      };
      return newValues;

    });
    setCoinData(newCoinData);
  }


  const handleSell = async (valueChangeId, amountValue) => {
    const ticketUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(ticketUrl);
    const newPrice = formatPrice(response.data.quotes["USD"].price);
    const newCoinData = coinData.map(function (values) {
      let newValues = { ...values };

      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue);
        let newAccountBalance = accountBalance + (newPrice * amountOfCoin);

        if (amountOfCoin <= newValues.balance && amountValue > 0) {
          setAccountBalance(newAccountBalance);
          newValues.balance -= amountOfCoin;
          setInsufficientTokenBalMessage(false);
          setIsSold(true)
        }
        else {
          setInsufficientTokenBalMessage(true);
          setIsSold(false);
        }

      };
      return newValues;

    });
    setCoinData(newCoinData);
  }

  //https://api.coinpaprika.com/v1/tickers/{coin_id}/historical
  const handleRefresh = async (valueChangeId) => {
    const ticketUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(ticketUrl);
    //debugger;
    const newPrice = formatPrice(response.data.quotes["USD"].price);
    const newCoinData = coinData.map((values) => {
      let newValues = { ...values }; // shallow cloning / deep copy
      if (valueChangeId === values.key) {
        //manipulate price here
        newValues.price = newPrice;
      }
      return newValues;
    });
    // this.setState(prevState => {}) one way to write the new state
    setCoinData(newCoinData);
  }

  return (
    <>

     <Div className="App">
        <ExchangeHeader/>
        <AccountBalance
          amount={accountBalance}
          showBalance={showBalance}
          handleBrrr={handleBrrr}
          handleToggleChange={handleToggleChange}/>

        <CoinList
          coinData={coinData}
          showBalance={showBalance}
          handleBuy={handleBuy}
          handleSell={handleSell}
          handleRefresh={handleRefresh}
          buyInputValue={buyInputValue}
          setBuyInputValue={setBuyInputValue}
          insufficientUsdBalMessage={insufficientUsdBalMessage}
          setInsufficientUsdBalMessage={setInsufficientUsdBalMessage}
          insufficientTokenBalMessage={insufficientTokenBalMessage}
          setInsufficientTokenBalMessage={setInsufficientTokenBalMessage}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          isSold={isSold}
          setIsSold={setIsSold}/>

      </Div>
    </>

  );
}

//console.log(Response);

export default App;