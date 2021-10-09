import React, { useState, useEffect } from 'react';
// imp tab
import "bootswatch/dist/flatly/bootstrap.min.css";
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';

//import "bootstrap/dist/css/bootstrap.min.css";


import "fontawesome-free/js/all.js";

const Div = styled.div`
text-align: center;
background-color: rgb(20, 56, 97);
color: #ccc;`;

// UTILITY FUNCTIONS
const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));


function App(props) {
  // React: from State to Hooks
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    //console.log("MOUNT");
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    // we are now receiving strings as data so we don't need an object anymore
    // we also use cont instead of let as we are not changing the data
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
        price: formatPrice(coin.quotes["USD"].price)
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
    setBalance(prevBalance => prevBalance + 1200);
  }

//npm start
//npm i gh-pages --save-dev
//npm run deploy
//npm i bootstrap --save
//npm i bootswatch --save
//npm i fontawesome-free
//https://brlojam4932.github.io/my-App/

  // there are no longer global variables, instead they are now local constants
  const handleToggleChange = () => {
    setShowBalance(prevValue => !prevValue);

  }

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
      } return newValues;
    });
    // this.setState(prevState => {}) one way to write the new state
    setCoinData(newCoinData);
  }

  return (
    <Div className="App">
      <ExchangeHeader />
      <AccountBalance
        amount={balance}
        showBalance={showBalance}
        handleToggleChange={handleToggleChange}
        handleBrrr = {handleBrrr} />
      <CoinList
        coinData={coinData}
        showBalance={showBalance}
        handleRefresh={handleRefresh}
      />
    </Div>
  );
}

//console.log(Response);

export default App;
