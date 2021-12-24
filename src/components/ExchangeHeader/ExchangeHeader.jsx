import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';


const Img = styled.img`
  height: 8rem;
  pointer-events: none;
`;
// TO MOVE FILES USE GIT MV
// we create a const variable and import the values from the CSS sytling file

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
         <div className='Header'>
          <Img src={logo} alt='React Logo' />
          <H1>Falcon Trades Exchange</H1>
          <h5 className="text-primary">Crypto trading, exchanges and news station.</h5>
        </div>
       
      </>

    )
  }
}
