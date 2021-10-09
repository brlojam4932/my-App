import React from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';

const Td = styled.td`
  border: 1px solid #ccc;
  width: 16vw;
`;

const TdControls = styled(Td)`
  width: 36vw;
`;

const Button = styled.button`
  font-size: 11px;
  with: 64px;
  margin: 3px 5px 0;
`;


// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component
export default function Coin(props) {

  const handleRefresh = (event) => {
    // prevent form from being submitted
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }

  const handleBuy = (event) => {
    event.preventDefault();
    props.handleBuy(true, props.tickerId);
  }

  const handleSell = (event) => {
    event.preventDefault();
    props.handleSell(false, props.tickerId);
  }

  return (
    <tr>
      <Td>{props.name}</Td>
      <Td>{props.ticker}</Td>
      <Td>${props.price}</Td>
      {props.showBalance ? <Td>${props.balance}</Td> : null}
      <TdControls>
        <form action="#" method="POST">
          <Button className="btn btn info" onClick={handleRefresh}>Refresh</Button>
          <Button className="btn btn info" onClick={handleBuy}>Buy</Button>
          <Button className="btn btn info" onClick={handleSell}>Sell</Button>
        </form>
      </TdControls>
    </tr>
  );

}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
