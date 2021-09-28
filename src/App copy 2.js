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
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  
  }
  

  handleToggleChange() {
    this.setState(prevState => ({
        ...prevState, // cloning - enumerating the old state 
        showBalance: !prevState.showBalance
    } ));
    //console.log(this.setState);  
  }


  // STATE UPDATE IMMUTABILITY
  // passing down event handlers as props; passing back to parent
  handleRefresh(valueChangeTicker) {
    // let isMyArray=[1,2,3,4,5].find( x => x > 4);
    // the state is a pointer to an array, but here it can lead to cloning
    // https://pythontutor.com/

    //const coin = this.state.coinData.find(({ticker}) => ticker === valueChangeTicker);
    const newCoinData = this.state.coinData.map(({ ticker, name, price, balance }) => {
      let newPrice = price; // let is used when the data changes
      if (valueChangeTicker === ticker) {
        //manipulate price here
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage;
      } return {
        ticker, // when key and value names are the same, we can just write "ticker", etc.
        name, 
        price: newPrice, // newPrice has a new key "price"
        balance: balance // we needed to add this refresh the balance
      }
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
