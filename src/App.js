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


class App extends React.Component {
  //classProperty = "value" // not sure how this works. instructor cut, copied the this.state variables into the classProperty and deleted "this"
  state = {
    showBalance: true,
    balance: 1000,
    coinData: [

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

    ]
  };

 
  handleToggleChange = () => {
    this.setState(prevState => ({
        ...prevState, // cloning - enumerating the old state 
        showBalance: !prevState.showBalance
    } )); 
  }


  // STATE UPDATE IMMUTABILITY
  // passing down event handlers as props; passing back to parent
  handleRefresh = (valueChangeTicker) => {
  
    const newCoinData = this.state.coinData.map(( values ) => {
      let newValues = {...values}; // shallow cloning / deep copy
      if (valueChangeTicker === values.ticker) {
        //manipulate price here
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage;
      } return newValues;
      
    });

    // this.setState(prevState => {}) one way to write the new state
    this.setState({coinData: newCoinData}) // here we get the object 'coinData'
  
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
