import React, { useState, useEffect } from 'react';
// imp tab
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "fontawesome-free/js/all.js"; // icons
import News from './components/News/News';
import useFetch from "./components/Utility/useFetch";
import Navbar from './components/ExchangeHeader/Navbar';
import Exchanges from './components/Exchanges/Exchanges';
//instructor: zsolt-nagy

// bkg area for table
const Div = styled.div`
text-align: center;
background-color: #000000;
color: #ccc;`;


// UTILITY FUNCTIONS 
const COIN_COUNT = 5; // look up sort method in JS to lsit by rank
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

  const [searchNews, setSearchNews] = useState('cryptocurrency')

  //https://api.coinpaprika.com/v1/coins/{coin_id}/twitter
  // read about Temporal Deadzone
  const componentDidMount = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: ''
        }
      })
      const coinData = response.data.slice(0, 10).map((coin) => {
        return {
          key: coin.id,
          image: coin.image,
          name: coin.name,
          ticker: coin.symbol,
          balance: 0,
          price: coin.current_price,
          rank: coin.market_cap_rank,
          circulatingSupply: coin.circulating_supply,
          totalSupply: coin.total_supply,
          maxSupply: coin.max_supply,
          volume: coin.total_volume,
          marketCap: coin.market_cap,
          percentChange24h: coin.price_change_percentage_24h
        }
      });
      setCoinData(coinData);

    } catch (error) {
      console.log(error);
    }


  }


  useEffect(() => {
    if (coinData.length === 0) {
      componentDidMount();
    }
  });

  //-------news----------------
  const newsCatergory = searchNews;

  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: newsCatergory,
      count: '20',
      freshness: 'Week',
      textFormat: 'Raw',
      safeSearch: 'Off'
    },
    headers: {
      'user-agent': 'cryptonews',
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '9271cb1bffmsh3bfde2fc26f9dd1p125f3cjsn6324533a44df'
    }

  };

  // destructured data - useFetch("https://...any_address")
  // in the case of Pedro's api...
  // <h1>{data?.setup} : {data?.delivery}</h1>
  // change the data variable...
  // <h1>{joke?.setup} : {joke?.delivery}</h1>
  const { data: getNews, loading, error, datePublished, getCryptoDetails } = useFetch(options);

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error...</h1>

  //------news--end-----------------


  const handleBrrr = () => {
    setAccountBalance(prevBalance => prevBalance + 1200);
  }


  // there are no longer global variables, instead they are now local constants
  const handleToggleChange = () => {
    setShowBalance(prevValue => !prevValue);
  }


  // create isBuy and valueChangId args
  const handleBuy = async (valueChangeId, amountValue) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=${valueChangeId}`);
    //console.log("Response: ", response);
    const newPrice = response?.data?.[0]?.current_price;
    //console.log("New Price: ", newPrice);
    const newCoinData = coinData.map((values) => { // copy coinData values into newCoinData, newValues
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue);
        let newAccountBalance = accountBalance - (newPrice * amountOfCoin);
        if (newAccountBalance > 0 && amountValue > 0) {
          setAccountBalance(newAccountBalance);
          newValues.balance += amountOfCoin; // if account bal conditions are met, newValues.balance = newValues.balance + amountOfCoin
          setInsufficientUsdBalMessage(false);
          setIsBuy(true);
        }
        else {
          setInsufficientUsdBalMessage(true);
          setIsBuy(false);
        }
      };
      return newValues;
    });
    setCoinData(newCoinData);
  }


  const handleSell = async (valueChangeId, amountValue) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=${valueChangeId}`);
    const newPrice = response?.data?.[0].current_price; // get current price from api
    const newCoinData = coinData.map((values) => { // newCoinData will equal coinData copied as new values into an Object
      //copy values into newValues using spread operator
      let newValues = { ...values }; // we have our Object: newValues = {id: name, price: current_price}
      // if clicked "id" - matches the values.key, then let amountOfCoin equal; amountValue (amount of coins to sell), parseFloat...converterd from JSON string to integers
      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue); //ex. {id: bitcoin, price: 44000}
        // update newAccountBalance: we are selling so we mult the newPrice * the amount of coins and add that to our newAccountBalance. Then return newValues
        let newAccountBalance = accountBalance + (newPrice * amountOfCoin);
        // but also add a condition: newAccountBalance > 0 and amount to buy cannot be 0; must be also > 0.
        if (newAccountBalance > 0 && amountOfCoin > 0) {
          // update the state: setNewAccountBalance -> to newAccountBalance
          setAccountBalance(newAccountBalance);
          // set the newValues.balance equal newValues.balance - the amount Of Coin sold.
          newValues.balance -= amountOfCoin; // if these conditions met, make the sell: setIsBuy = true and amount of coins will be deducted while value will be added to newAccountBalance
          // also set insufficient amount of usd to true false
          setInsufficientUsdBalMessage(false);
          setIsSold(true);
        } else {
          // if not true: set to false and setInsuffientUsd to true
          setInsufficientUsdBalMessage(true);
          setIsSold(false);
        }
      };
      return newValues; // newValues returned
    }); // finally, setCoinData to newCoinData. (newCoinData is the current price from the api)
    setCoinData(newCoinData);
  }



  const handleRefresh = async (valueChangeId) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=${valueChangeId}`);
    const newPrice = response?.data?.[0].current_price; // get current price from api
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
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path="/">
              <Div className="App">
                <ExchangeHeader />
                <AccountBalance
                  amount={accountBalance}
                  showBalance={showBalance}
                  handleBrrr={handleBrrr}
                  handleToggleChange={handleToggleChange}
                />

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
                  setIsSold={setIsSold}
                />
                <div className='container'>
                  <div className='row'>
                    {getNews && getNews.value.map(news => {
                      return (
                        <News
                          key={news.index}
                          name={news.name}
                          description={news.description}
                          url={news.url}
                          image={news.image}
                          provider={news.provider}
                          datePublished={datePublished}
                        />
                      )
                    })};
                  </div>
                </div>
              </Div>
            </Route>
            <Route path="/exchanges">
              <Exchanges />
            </Route>
          </Switch>
        </div>
      </Router>
    </>

  );
}

//console.log(Response);

export default App;