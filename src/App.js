import React from 'react';
// imp tab
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';



const Div = styled.div`
text-align: center;
background-color: #000000;
color: #ccc;`;

// TO MOVE FILES USE GIT MV and REMOVE FILES GIT RM (did not work)
// ex. git mv ./logo.svg ./components/ExchangeHeader/logo.svg
// ex. git rm ./App.css
//git mv ./logo.svg ./components/ExhangeHeader/logo.svg 

//cntl shift F to align/reformat code
// Pop Drilling: The state of the app goes down two levels;
// to coinLis and to the coin
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      balance: 1000,
      coinData: [

        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 44790.99
        },

        {
          name: "Ethereum",
          ticker: 'ETH',
          price: 3280.25
        },

        {
          name: 'Litecoin',
          ticker: 'LTC',
          price: 60.30
        },

        {
          name: 'Ripple',
          ticker: 'XRT',
          price: 0.2
        },

        {
          name: 'Compound',
          ticker: 'CMP',
          price: 458.23
        },

      ]
    };
  }


  // abstract header into a component

  render() {
    return (
      <Div className="App">
        <ExchangeHeader />
        <AccountBalance amount={this.state.balance} />
        <CoinList coinData={this.state.coinData} />
      </Div>
    );
  }
}


// above, a Coin component was created
// UUID can be used to create an ID (here we created one key={value.ticker})
// https://www.npmjs.com/package/uuid
/*
// none distructured version
 {
        this.state.coinData.map(value =>
          <Coin key={value.ticker} name={value.name} ticker={value.ticker} price={value.price} />
        )
      }

      ====================================
      {
        //distructured version
        this.state.coinData.map(({ name, ticker, price }) =>
          <Coin key={ticker} name={name} ticker={ticker} price={price} />
        )
      }

      ===================================
      {
        //simplest version using spread operator, enumerates spreads key value pairs into component as props
        this.state.coinData.map(value =>
          <Coin key={value.ticker} {...value} />
        )
      }
      */
//console.log(Response);

export default App;
