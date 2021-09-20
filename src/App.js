import React from 'react';

import './App.css';
import logo from './logo.svg';
// imp tab
import Coin from './components/Coin/Coin';

//cntl shift F to align/reformat code
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt='React Logo' className="App-logo"/>
        <h1 className="App-title">
          Coin Exchange
        </h1>

      </header>
      <table className="coin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <Coin name="Bitcoin" ticker="BTC" price={44790.99} />
          <Coin name="Ethereum" ticker="ETH" price={3280.25} />
          <Coin name="Litecoin" ticker="LTC" price={60.3} />
          <Coin name="Ripple" ticker="XRP" price={0.2} />
        </tbody>
      </table>

    </div>
  );
  
}
console.log(Response);

export default App;
