import React, { useState, useEffect } from 'react';
// imp tab
import "bootswatch/dist/darkly/bootstrap.min.css";
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "fontawesome-free/js/all.js"; // icons
import Navbar from './components/ExchangeHeader/Navbar';
import CoinInfo from './components/Coin/CoinInfo';
//import Pagination from './components/CoinList/Pagination';
import _ from "lodash";
import Footer from './components/Coin/Footer';

//instructor: zsolt-nagy
// bkg area for table
const Div = styled.div`
text-align: center;
background-color: #3E434F;
color: #ccc;`;



// UTILITY FUNCTIONS 
// total count 12 / post per page 4 = 3 pages
const COIN_COUNT = 8; // look up sort method in JS to lsit by rank
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
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [postsPerPage] = useState(2);

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
      const listItems = items.map((item ) => item.id === id ? {...item, checked: !item.checked} : (item));
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
    //console.log("MOUNT");
    setLoading(true);
    const response = await axios.get('https://api.coinpaprika.com/v1/coins/');

    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const ticketUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(ticketUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function (response) {
      const coin = response.data;
      return {
        key: coin.id, // here we have our key
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        rank: coin.rank,
        circulating_supply: coin.circulating_supply,
        total_supply: coin.total_supply,
        max_supply: coin.max_supply,
        beta_value: coin.beta_value,
        first_data_at: coin.first_data_at,
        last_updated: coin.last_updated,
        price: formatPrice(coin.quotes["USD"].price)
      }

    })

    // Retrieve the prices
    console.log("coinData ", coinData);
    //console.log("currentPosts ", currentPosts);
    setCoinData(coinPriceData);
    setPaginatedPosts(_(coinPriceData).slice(0).take(postsPerPage).value());
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

  })


  const pageCount = coinData ? Math.ceil(coinData.length / postsPerPage) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * postsPerPage;
    const paginatedPost = _(coinData).slice(startIndex).take(postsPerPage).value();
    console.log('paginatedPosts ', paginatedPosts);
    setPaginatedPosts(paginatedPost);
    //handleRefresh(props.tickerId);
  }


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
                  coinData={paginatedPosts}
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
                  setPaginatedPosts={setPaginatedPosts}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postsPerPage={postsPerPage} />

              </Div>


              <nav>
                <ul className='pagination'>
                  {
                    pages.map((page) => (
                      <li key={page.toString()} className={
                        page === currentPage ? "page-item active" : "page-item"}>
                        <p className='page-link'
                          onClick={() => pagination(page.toString())}
                        >{page}</p>
                      </li>
                    ))
                  }
                </ul>
              </nav>

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