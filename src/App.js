import React, { useState, useEffect } from 'react';
// imp tab
import "bootswatch/dist/flatly/bootstrap.min.css";
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './components/Coin/Modal';

//instructor: zsolt-nagy

import "fontawesome-free/js/all.js";

// bkg area for table
const Div = styled.div`
text-align: center;
background-color: #3E434F;
color: #ccc;`;

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
  padding: "10px"
};



// UTILITY FUNCTIONS
const COIN_COUNT = 3;
const formatPrice = price => parseFloat(Number(price).toFixed(4));


function App(props) {
  // React: from State to Hooks
  
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coinAmount, setCoinAmountInput] = useState(0);


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
    setBalance(prevBalance => prevBalance + 1200);
  }


  // there are no longer global variables, instead they are now local constants
  const handleToggleChange = () => {
    setShowBalance(prevValue => !prevValue);
  }

  /*
  const handleSubmit = (e) => {
    //alert("submit clicked", e)
    setCoinAmountInput(coinAmount);
    setIsOpen(false);
  }
  */

  // create isBuy and valueChangId args
  const handleTransaction = (isBuy, valueChangeId, e) => {
    alert("handleTransaction clicked", e)
    setIsOpen(true);
    //let amountInputToFloat = parseFloat(setCoinAmountInput).value;
    var balanceChange = isBuy ? coinAmount : coinAmount;
   
    const newCoinData = coinData.map(function (values) {
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        // check the coin exists
        newValues.balance += balanceChange;
        setBalance(prevBalance => prevBalance - balanceChange * newValues.price);
        
      }
      return newValues;
      
    });
    setCoinData(newCoinData);
  }


  /*
  const handleBuy = async (valueChangeId, amountValue) => {
    const ticketUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(ticketUrl);
    const newPrice = formatPrice(response.data.quotes["USD"].price);
    const newCoinData = coinData.map( function(values) {
      let newValues = {...values};

      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue);
        let newBalance = AccountBalance - (newPrice * amountOfCoin);

        if (newAccountBalance > 0) {
          setBalance(newBalance);
          newValues.balance += amountOfCoin;
          setInsuffientUsdBalanceMessage(false);
        } else {
          setInsuffientUsdBalanceMessage(true);
        }

      };
      return newValues;
    });
    setCoinData(newCoinData);
  }
  */

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
      <div style={BUTTON_WRAPPER_STYLES}>

        <Modal 
           handleTransaction={handleTransaction}
          coinAmount={coinAmount}
          setCoinAmountInput={setCoinAmountInput}
          open={isOpen}
          onClose={() => setIsOpen(false)}>
          {/* children go here */
            <>
             <h4>How many tokens</h4>
              <input
                type="number"
                required
                placeholder='Enter Amount'
                value={coinAmount}
                onChange={(e) => setCoinAmountInput(+e.target.value)}
              />
              <button onClick={(e) => handleTransaction(e)} >Submit</button>
              <p > Amount of tokens: {coinAmount} </p>          
            </>
          }
        </Modal>



      </div>
      <div style={OTHER_CONTENT_STYLES}>
        <Div className="App">
          <ExchangeHeader />
          <AccountBalance
            amount={balance}
            showBalance={showBalance}
            handleBrrr={handleBrrr}
            handleToggleChange={handleToggleChange}
          />

          <CoinList
            coinData={coinData}
            showBalance={showBalance}
            handleTransaction={handleTransaction}
            handleRefresh={handleRefresh}
          />
        </Div>

      </div>
    </>

  );
}

//console.log(Response);

export default App;