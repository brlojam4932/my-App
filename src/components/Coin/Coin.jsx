import React, { Component } from 'react';
import "./Coin.css";
// imp tab
import PropTypes from 'prop-types';


//rcc tab
export default class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price
    }
    this.handleClick = this.handleClick(this); // this binding gives us access to handleClick, this.setState...
  }
  
 handleClick(e) {
   // prevent form from reloading
    e.preventDefault();
   const randomPercentage = 0.995 + Math.random() * 0.01;
   this.setState(function(oldState){
    return {
      price: oldState.price * randomPercentage
    };
  });

 }
  render() {
    return (
      <tr className="coin-row">
        <td>{this.props.name}</td>
        <td>{this.props.ticker}</td>
        <td>${this.state.price}</td>
        <td>
          <form action="#" method="POST"> 
          <button onClick={this.handleClick}>Refresh</button>
          </form>
        </td>
      </tr>
    );
  }
}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
