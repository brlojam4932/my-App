import React, { Component } from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';

const Td = styled.td`
  border: 1px solid #ccc;
  width: 29vh;
`;



//rcc tab for class-based component
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
      <tr>
        <Td>{this.props.name}</Td>
        <Td>{this.props.ticker}</Td>
        <Td>${this.state.price}</Td>
        <Td>
          <form action="#" method="POST">
            <button onClick={this.handleClick}>Refresh</button>
          </form>
        </Td>
      </tr>
    );
  }
}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
