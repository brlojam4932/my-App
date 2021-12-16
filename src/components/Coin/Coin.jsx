import React, { useState } from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import PopUp from './PopUp';
//import millify from 'millify';


// table
const Td = styled.td`
  background-color: #222324;
`;
// actions
const TdControls = styled(Td)`

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

const Img = styled.img`
  max-width: 33px
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

  /*
 circulatingSupply: coin.circulating_supply,
      totalSupply: coin.total_supply,
      maxSupply: max_supply,
      volume: volume_24h,
      marketCap:market_cap,
      percentChange1h: percent_change_1h
      */

  return (
    <>

      <tr>
        <Td> <Img src={props.image} alt="logo-art" /></Td>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>$&nbsp;{props.price}</Td>
        <Td>{props.percentChange24h < 0 ? (
          <span className="align-middle mr-1 coin-percent red">
            {props.percentChange24h}
          </span>
        ) : (
          <span className="align-middle mr-1 coin-percent green">
            {props.percentChange24h}%
          </span>
        )}</Td>
        <Td>{props.showBalance ? props.balance : "****"}</Td>

        <TdControls>
          <form action="#">

            <Button className="btn btn-outline-success" onClick={() => setModalIsOpen(true)} >Trade</Button>

            <Button className="btn btn-outline-primary" onClick={handleRefresh}>Refresh</Button>

            <Button className='btn btn-outline-dark' onClick={() => setButtonPopup(true)}>Info</Button>

          </form>
        </TdControls>

      </tr>


      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} >
        <div className="card border-secondary mb-3">
          <div className="card-body">
            <h4 className="card-title">{props.tickerId}&nbsp;info</h4>
            <p className="card-text text-primary"> An overview showing the stats of {props.tickerId}</p>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Token:
                <span>{props.tickerId}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Rank:
                <span>{props.rank}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Circulating Supply:
                <span>{props.circulatingSupply}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Total Supply:
                <span>{props.totalSupply}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Max Supply:
                <span>{props.maxSupply}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Volume 24h:
                <span>{props.volume}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Market Cap:
                <span>{props.marketCap}</span>
              </li>
            </ul>
          </div>
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

        {
          <div className="alert alert-dismissible alert-secondary">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>{props.buyInputValue}</strong>&nbsp;Token/s of&nbsp;<strong>{props.tickerId}</strong>&nbsp;at$&nbsp;{props.price}.&nbsp;<strong>Trade total:&nbsp;$</strong>{props.price * props.buyInputValue}</div>
        }

        {props.isBuy &&
          <div className="alert alert-dismissible alert-success">
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success!</strong>Your purchase of &nbsp;<strong>{props.tickerId}</strong>is complete</div>

        }

        {(props.isSold) &&
          <div className="alert alert-dismissible alert-warning">
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success!</strong>Your sale of&nbsp;<strong>{props.tickerId}</strong>is complete</div>
        }


        <TradeInput id="buyInput"
          type="number"
          required
          placeholder='Amount'
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
}

export default Coin;