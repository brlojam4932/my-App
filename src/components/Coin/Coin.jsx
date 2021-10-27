import React, { useState } from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';
//import Modal from 'react-modal';
import ReactModal from 'react-modal';


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

/*
{const CoinInfo = styled.div`
  font-size: 8px;
  with: 70px;
  margin: 2px 4px 0;
`};
*/

const TradeInput = styled.input`
width: 34%;
`



// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component

function Coin(props) {


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleRefresh = (event) => {
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }


  const handleBuyClick = (event) => {
    event.preventDefault();
    props.handleBuy(props.tickerId, props.buyInputValue);

    //console.log('Buy Clicked');
  }

  const handleSellClick = (event) => {
    event.preventDefault();
    props.handleSell(props.tickerId, props.buyInputValue);
  }


  const handleClickInfo = (event) => {
    // prevent form from being submitted
    event.preventDefault();
    props.handleRefresh(props.tickerId);
    // if btc is picked by tickerId
    // display text info about that token
    alert(props.tickerId
      + "Rank:" + props.rank
      + "circulating_supply"
      + props.circulating_supply);   

  }

  const handleClose = () => {
    setModalIsOpen(false);
    props.setInsufficientUsdBalMessage(false);
    props.setInsufficientTokenBalMessage(false);
    props.setIsBuy(false);
    props.setIsSold(false);
  }

  return (
    <>
    <div className='container'>
    <h6>{props.tickerId
      + "Rank:" + props.rank
      + "circulating_supply"
      + props.circulating_supply}</h6>

    </div>

      <tr>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>${props.price}</Td>
        <Td>{props.showBalance ? props.balance : "-"}</Td>

        <TdControls>
          <form action="#">

            <Button className="btn btn-success" onClick={() => setModalIsOpen(true)} >Trade</Button>

            <Button className="btn btn-info" onClick={handleRefresh}>Refresh</Button>

            <Button className='btn btn-outline-info' onClick={handleClickInfo}>Info</Button>

          </form>
        </TdControls>

      </tr>


      <ReactModal

        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h1> Trade {props.tickerId} </h1>

        <label> Amount of Coins to Buy/Sell</label>
        {props.insufficientUsdBalMessage &&
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Insufficient USD Balance!</strong> Transaction not Completed.
          </div>
        }
        {props.insufficientTokenBalMessage &&
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Insufficient Token Balance!</strong> Transaction not Completed.
          </div>
        }

        {props.isBuy &&
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success! {props.buyInputValue} </strong> Token of {props.tickerId} at {props.price} purchased.</div>
        }

        {(props.isSold) &&
          <div className="alert alert-dismissible alert-info">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success! {props.buyInputValue} </strong> Token {props.tickerId} at {props.price} sold</div>
        }

        <TradeInput id="buyInput"
          type="number"
          required
          onChange={(e) => props.setBuyInputValue(+e.target.value)} >
        </TradeInput>

        <Button className="btn btn-success" onClick={handleBuyClick}>Buy</Button>
        <Button className="btn btn-warning" onClick={handleSellClick}>Sell</Button>
        <Button className="btn btn-outline-secondary" onClick={handleClose}>Cancel</Button>
      </ReactModal>

    </>

  );


}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  circulating_supply: PropTypes.number.isRequired
}

export default Coin;