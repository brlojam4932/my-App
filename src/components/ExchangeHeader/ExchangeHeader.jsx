import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';


const Img = styled.img`
  height: 8rem;
  pointer-events: none;
`;
// TO MOVE FILES USE GIT MV
// we create a const variable and import the values from the CSS sytling file

//  background-color: #1d2124;
const Header = styled.header`
  background-color: #000000;
  min-height: 10vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 48px;
  color: white;
`;
const H1 = styled.h1`
  font-size: 3rem;
  line-height: 8rem;
  fold-weight: bold;
  min-width: 300px;
`;



// rcc

export default class ExchangeHeader extends Component {
  render() {
    return (
      <>
        <Header>
          <Img src={logo} alt='React Logo' />
          <H1>Falcon Trades Exchange</H1>
        </Header>
        <h5 class="text-primary">Crypto trading, exchanges and news station.</h5>
      </>

    )
  }
}
