import React, {useState} from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';
import Modal from './Modal';

// table
const Td = styled.td`
  border: 1px solid #ccc;
  width: 14vw;
`;

// actions
const TdControls = styled(Td)`
  width: 34vw;
`;

// space for coin names
const TdName = styled(Td)`
  with: 24vw;
`;

// buy / sell refresh button size
const Button = styled.button`
  font-size: 11px;
  with: 64px;
  margin: 3px 5px 0;
`;

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1
};


// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component
export default function Coin(props) {

  const [isOpen, setIsOpen] = useState(false);

  const handleRefresh = (event) => {
    // prevent form from being submitted
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }

  const handleBuy = (event) => {
    event.preventDefault();
    props.handleTransaction(true, props.tickerId);
    setIsOpen(true);
  }

  const handleSell = (event) => {
    event.preventDefault();
    props.handleTransaction(false, props.tickerId)
  }

  return (
    <tr>
      <TdName>{props.name}</TdName>
      <Td>{props.ticker}</Td>
      <Td>${props.price}</Td>
      <Td>{props.showBalance ? props.balance : "-"}</Td>
      <TdControls>
        <form action="#" method="POST">
          <div style={BUTTON_WRAPPER_STYLES}>
          <Button className="btn btn-info" onClick={handleRefresh}>Refresh</Button>
          <Button className="btn btn-success" onClick={handleBuy}>Buy</Button>
          
          <Button className="btn btn-warning" onClick={handleSell}>Sell</Button>

          <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>

          </div>
          
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
