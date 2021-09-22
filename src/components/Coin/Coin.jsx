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
    this.handleClick = this.handleClick.bind(this); // this binding gives us access to handleClick, this.setState...
  }


  handleClick(event) {
    // prevent form from reloading
    event.preventDefault();

    const randomPercentage = 0.995 + Math.random() * 0.01;
    this.setState(function (prevState, e) {
      console.log(prevState, e.target)
      return {
        price: prevState.price * randomPercentage
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

