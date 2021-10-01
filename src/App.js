import React from 'react';
// imp tab
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div`
text-align: center;
background-color: #000000;
color: #ccc;`;

const COIN_COUNT = 10;

class App extends React.Component {
  //classProperty = "value" // not sure how this works. instructor cut, copied the this.state variables into the classProperty and deleted "this"

  // since we are now using axios, we will not use the hard-coded data

  state = {
    showBalance: true,
    balance: 1000,
    coinData: [
      /*

    {
      name: 'Bitcoin',
      ticker: 'BTC',
      balance: 10000,
      price: 44790.99
    },

    {
      name: "Ethereum",
      ticker: 'ETH',
      balance: 6500,
      price: 3280.25
    },

    {
      name: 'Litecoin',
      ticker: 'LTC',
      balance: 200,
      price: 60.30
    },

    {
      name: 'Ripple',
      ticker: 'XRT',
      balance: 0,
      price: 0.2
    },

    {
      name: 'Compound',
      ticker: 'CMP',
      balance: 1500,
      price: 458.23
    },
    */

    ]
  };


  // https://api.coinpaprika.com/v1/coins
  // Life Cycle methods
  // fetch('https://api.coinpaprika.com/v1/coins') 
  // returns a Promise

  componentDidMount = async () => {
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
    const coinPriceData = coinData.map(function(response) {
    const coin = response.data;
      return {
        key: coin.id, // here we have our key
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: parseFloat((coin.quotes["USD"].price).toFixed(3))
      };
    })
    // retrieve prices
    // we set the state
    this.setState({ coinData: coinPriceData });

  }

  // with Axios, we don't need this
  //componentDidUpdate = () => {
  //  console.log("UPDATE");
  //}
  // we get access to other properties
  //https://api.coinpaprika.com/v1/tickers/btc-bitcoin


  handleToggleChange = () => {
    this.setState(prevState => ({
      ...prevState, // cloning - enumerating the old state 
      showBalance: !prevState.showBalance
    }));
  }


  // STATE UPDATE IMMUTABILITY
  // passing down event handlers as props; passing back to parent
  handleRefresh = (valueChangeTicker) => {

    const newCoinData = this.state.coinData.map((values) => {
      let newValues = { ...values }; // shallow cloning / deep copy
      if (valueChangeTicker === values.ticker) {
        //manipulate price here
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage;
      } return newValues;

    });

    // this.setState(prevState => {}) one way to write the new state
    this.setState({ coinData: newCoinData }) // here we get the object 'coinData'

  }

  // abstract header into a component

  render() {
    return (
      <Div className="App">
        <ExchangeHeader />
        <AccountBalance
          amount={this.state.balance}
          showBalance={this.state.showBalance}
          handleToggleChange={this.handleToggleChange} />
        <CoinList
          coinData={this.state.coinData}
          showBalance={this.state.showBalance}
          handleRefresh={this.handleRefresh}
        />
      </Div>
    );
  }
}

//console.log(Response);

export default App;
