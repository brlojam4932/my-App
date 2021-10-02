import React from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';

const Td = styled.td`
  border: 1px solid #ccc;
  width: 29vh;
`;

// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component
export default function Coin(props) {

  const handleClick = (event) => {
    // prevent form from reloading
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }

  return (
    <tr>
      <Td>{props.name}</Td>
      <Td>{props.ticker}</Td>
      <Td>${props.price}</Td>
      {props.showBalance ? <Td>${props.balance}</Td> : null}
      <Td>
        <form action="#" method="POST">
          <button onClick={handleClick}>Refresh</button>
        </form>
      </Td>
    </tr>
  );

}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
