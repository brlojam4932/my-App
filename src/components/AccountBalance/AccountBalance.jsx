//rcc tab for class-based component
import React, { Component } from 'react';
import styled from 'styled-components'
//rccp
import PropTypes from 'prop-types'

const Section = styled.section`
  font-size: 2rem;
  text-align left;
  padding: 1.5rem 0 1.5rem 5rem;
  `;
  

export default class AccountBalance extends Component {
  render() {
    return (
      <Section>Account Balance: ${this.props.amount}</Section>
    );
  }
}


AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired,
}