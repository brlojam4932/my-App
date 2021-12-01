import React, { useState, useEffect } from 'react';
import "bootswatch/dist/darkly/bootstrap.min.css";
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import coinGecko from './components/Utility/coinGecko';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "fontawesome-free/js/all.js"; // icons
import Navbar from './components/ExchangeHeader/Navbar';
import CoinInfo from './components/Coin/CoinInfo';
import News from './components/News/News';
import useFetch from "./components/Utility/useFetch";
//import Pagination from './components/CoinList/Pagination';

import Footer from './components/Coin/Footer';


//instructor: zsolt-nagy
// bkg area for table
const Div = styled.div`
text-align: center;
background-color: #3E434F;
color: #ccc;`;


// UTILITY FUNCTIONS 
const COIN_COUNT = 10;
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

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchNews, setSearchNews] = useState('cryptocurrency')


  const [items, setItems] = useState(
    [
      {
        id: 1,
        item: "Bitcoin has aperiam sed aut tenetur, itaque error nostrum voluptatem consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "Rex",
        checked: false

      },
      {
        id: 2,
        item: "Ethereum will ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debsamus eos aliquam. Iste upiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "Jill",
        checked: false
      },
      {
        id: 3,
        item: "Third coin has ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excemus commodi autem?",
        author: "mario",
        checked: false

      },
      {
        id: 4,
        item: "Fourth Coin ipsum dolor sit, amet consectetur adipisicing elit. Sit m consectetur id a quaerat laborum et cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "mario",
        checked: false
      },
      {
        id: 5,
        item: "Fith Coin ipsum dolor sit, amet consectetur adipisicing elit. Sit cupiditate? Alias assumenda nisi animi porro libero tempora eum dolor. Ipsum!",
        author: "mario",
        checked: false
      },
      {
        id: 6,
        item: "Sixth Coin ipsum dolor sit, amet consectetur adipisicing elit. Sit corrupti debitis excepturi porro libero tempora eum dolor. Ipsum!",
        author: "mario",
        checked: false
      }
    ]
  )

  //-----------Coin Info------------------------------
  // this could be a for loop
  const handleCheck = (id) => {
    //console.log(`key: ${id}`);
    // list items = a mapping of the array items
    // map the items to a new array if the item.id is the same as the id and flip the checkmark; else just list the item
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : (item));
    setItems(listItems);
    //saving to local storage
    localStorage.setItem('coininfo', JSON.stringify(listItems));

  }

  const handleDelete = (id) => {
    //console.log(`delete: ${id}`);
    // filter the item's id to id and map/copy into listItems array
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('coininfo', JSON.stringify(listItems));


  }


  // read about Temporal Deadzone
  const componentDidMount = async () => {
    setLoading(true);
    let response = await coinGecko.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: ''
      }
    });
    let coinData = response.data.slice(0, COIN_COUNT).map((token) => {
      return {
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
        low24h: token.low_24h,
        circulatingSupply: token.circulating_supply,
        priceChange24h: parseFloat(Number(token.price_change_percentage_24h).toFixed(2)),
      };
    });
    setCoinData(coinData);
    setLoading(false);
  }




  // we don't want to call the same function over and over again. we only want to load it if we need it
  // a synchronous function; moves up, before useEffect
  useEffect(() => {
    if (coinData.length === 0) {
      // component did mount
      componentDidMount();
      console.log('coin data: ' + coinData);
    }

  }, []);


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

const { data: getNews, newsLoading, error, refetch, datePublished } = useFetch(options);

if (newsLoading) return <h1>Loading...</h1>

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
  const ticketUrl = await axios.get("https://api.coingecko.com/api/v3/coins/markets/", {
    params: {
      vs_currency: "usd",
      ids: ''
    }

  });
  const response = await axios.get(ticketUrl);
  const newPrice = formatPrice(response.data.current_price);
  const newCoinData = coinData.map((values) => {
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
  const ticketUrl = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/${valueChangeId}`, {
    params: {
      vs_currency: "usd",
      ids: ''
    }
  });
  const response = await axios.get(ticketUrl);
  const newPrice = formatPrice(response.data.current_price);
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

const handleRefresh = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: "usd",
      ids: ''
    }
  });
  let i = 0;
  let newCoinData = response.data.slice(0, COIN_COUNT).map(function (token) {
    const index = i;
    i++;
    return {
      key: token.id,
      id: token.id,
      image: token.image,
      name: token.name,
      ticker: token.symbol,
      balance: coinData[index].balance,
      price: formatPrice(token.current_price),
      priceChange24h: parseFloat(Number(token.price_change_percentage_24h).toFixed(2)),
    };

  });
  setCoinData(newCoinData);
  console.log(newCoinData);
}


  return (
    <>
      <Router>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Div className="App">
                <ExchangeHeader />
                <AccountBalance
                  amount={accountBalance}
                  showBalance={showBalance}
                  handleBrrr={handleBrrr}
                  handleToggleChange={handleToggleChange}
                  length={items.length}
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
                  loading={loading}
                  setLoading={setLoading}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />

                {getNews && getNews.value.map(news => {
                  return (
                    <News
                    key={news.index}
                    name={news.name}
                    description={news.description}
                    url={news.url}
                    image={news.image}
                    datePublished={datePublished}
                     />
                  )
                })

                }
              </Div>

            </Route>
            <Route path="/coinInfo">
              <CoinInfo
                items={items}
                setItems={setItems}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
              />

              <Footer length={items.length} />

            </Route>

          </Switch>

        </div>

      </Router>


    </>

  );
}

//console.log(Response);

export default App;