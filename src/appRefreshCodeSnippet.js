// ALL COMPONENTS

// this belonged in app.js

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

// this belongs in coin.js
export default class Coin extends Component {

  handleClick = (event) => {
    // prevent form from reloading
    event.preventDefault();
    this.props.handleRefresh(this.props.tickerId);
  }


  render() {
    return (
      <tr>
        <Td>{this.props.name}</Td>
        <Td>{this.props.ticker}</Td>
        <Td>${this.props.price}</Td> 
        {this.props.showBalance ? <Td>${this.props.balance}</Td> : null}
        <Td>
          <form action="#" method="POST">
            <button onClick={this.handleClick}>Refresh</button>
          </form>
        </Td>
      </tr>
    );
  }
}

// coinlist component type
//rccp
import React, { Component } from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
margin: 50px auto 50px auto;
display: inline-block;
font-size: 1.4rem;`;

// rewrite coinlist component into functional component

export default class CoinList extends Component {

  render() {
    return (
      <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          {this.props.showBalance ? <th>Balance</th> : null }
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
          //distructured version - recommended; more explicit
          this.props.coinData.map( ({key, name, ticker, price, balance}) =>
              <Coin key={key} 
              handleRefresh={this.props.handleRefresh}
              name={name} 
              ticker={ticker}
              showBalance={this.props.showBalance}
              balance={balance}
              price={price}
              tickerId={key}
               />
            )
        }
      </tbody>
    </Table>
    )
  }
}
