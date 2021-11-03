import React, { useState } from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import PopUp from './PopUp';


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


const TradeInput = styled.input`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
background-color: #35393f;
color: white;
`

// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component

function Coin(props) {
  

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);

  const handleRefresh = (event) => {
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }


  const handleBuyClick = (event) => {
    event.preventDefault();
    props.handleBuy(props.tickerId, props.buyInputValue);

  }

  const handleSellClick = (event) => {
    event.preventDefault();
    props.handleSell(props.tickerId, props.buyInputValue);
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
       <tr>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>${props.price}</Td>
        <Td>{props.showBalance?props.balance : "-"}</Td>

        <TdControls>
          <form action="#">

            <Button className="btn btn-success" onClick={() => setModalIsOpen(true)} >Trade</Button>

            <Button className="btn btn-info" onClick={handleRefresh}>Refresh</Button>

            <Button className='btn btn-outline-info' onClick={() => setButtonPopup(true)}>Info</Button>

          </form>
        </TdControls>

      </tr>

      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} >
        <div className="alert alert-dismissible alert-primary">
          <strong>
            Token:&nbsp;
          </strong>
          <small className="text-muted">{props.tickerId}&nbsp; &nbsp; </small>
          <strong>
            Rank:&nbsp;
          </strong>
          <small className="text-muted">{props.rank}&nbsp; &nbsp;</small>
          <strong>
            Circulating Supply:&nbsp;
          </strong>
          <small className="text-muted">{props.circulating_supply}&nbsp;</small>
        </div>
      </PopUp>


      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h1> Trade {props.tickerId} </h1>

        <label className="text-muted"> Amount of Coins to Buy/Sell</label>
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

        {/* Info for buy/sell etc*/}

        {
          <div className="alert alert-dismissible alert-primary" >
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <div className="text-muted">
              Amount:<strong> &nbsp;{props.buyInputValue}&nbsp;</strong>Token: &nbsp;
              <strong>{props.tickerId}</strong> &nbsp; Price: &nbsp; <strong>$ {props.price}.</strong> &nbsp;
              Trade total:&nbsp; <strong>$ {props.price * props.buyInputValue}</strong>
            </div>

          </div>
        }

        {props.isBuy &&
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success!</strong>Your purchase of &nbsp;<strong>{props.tickerId}</strong>is complete</div>
        }

        {props.isSold &&
          <div className="alert alert-dismissible alert-info">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success!</strong>Your sale of &nbsp;<strong>{props.tickerId}</strong> is complete</div>
        }


        <TradeInput id="buyInput"
          type="number"
          required
          placeholder='Enter an amount'
          onChange={(e) => props.setBuyInputValue(+e.target.value)} >
        </TradeInput>

        <Button className="btn btn-success" onClick={handleBuyClick}>Buy</Button>
        <Button className="btn btn-warning" onClick={handleSellClick}>Sell</Button>
        <Button className="btn btn-outline-secondary" onClick={handleClose}>Cancel/Close</Button>
      </ReactModal>

    </>

  );


}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rank: PropTypes.number,
  circulating_supply: PropTypes.number
}

export default Coin;