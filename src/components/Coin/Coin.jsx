import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import PopUp from './PopUp';
//import HistoryChart from '../chart/HistoryChart';
//import coinGecko from '../Utility/coinGecko';
//import BlogList from './BlogList';


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
  with: 100px;
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
`;

// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component

function Coin(props) {
  const { id } = useParams()
  // with use Params, we get back the id
  //console.log("id: " + id);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 

  // take data from arrays into an object
  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2)
      };
    });
  };

  /*
  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);
      //deconstruct values
      const [day, week, year, detail] = await Promise.all([await coinGecko.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      coinGecko.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "7d",
        },
      }),
      coinGecko.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "365",
        },
      }),
      // we get back the info for that coin
      coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: id,
        },
      }),
    ]);

    //setCoinData
    }
    return () => {
      cleanup
    }
  }, [input])
  */
  

  const handleRefresh = (event) => {
    event.preventDefault();
    props.handleRefresh(props.id);
  }


  const handleBuyClick = (event) => {
    event.preventDefault();
    props.handleBuy(props.id, props.buyInputValue);
  }

  const handleSellClick = (event) => {
    event.preventDefault();
    props.handleSell(props.id, props.buyInputValue);
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
        {/* ---------TABLE: NAME, PRICE, TICKER, BALANCE------------ */ }
        <Td><Img src={props.image}/></Td>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>$&nbsp;{props.price}</Td>
        <Td>{props.showBalance? props.balance : "-"}</Td>

        <TdControls>
          <form action="#">

            <Button className="btn btn-success" onClick={() => setModalIsOpen(true)}>Trade</Button>

            <Button className="btn btn-info" onClick={handleRefresh}>Refresh</Button>

            <Button className='btn btn-outline-info' onClick={() => setButtonPopup(true)}>Info</Button>
          </form>
        </TdControls>
      </tr>

      
      {/* ---------POP UP: FOR INFO ABOU THE COIN------------ */ }
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>

        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Token:
            <span>{props.id}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Market Cap:
            <span>{props.marketCap}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Total Supply:
            <span>{props.totalSupply}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Vol 24h:
            <span>{props.volume24h}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          High 24h:
            <span>{props.high24h}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Low 24h:
            <span>{props.low24h}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Circulating Supply:
            <span>{props.circulatingSupply}</span>
          </li>
        </ul>

      </PopUp>

      {/* ---------MODAL: FOR BUY/SELL----------- */ }
      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h1>Trade {props.tickerId}</h1>

        <label className="text-muted">Amount of Coins to Buy/Sell</label>
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
          <div className="alert alert-dismissible alert-secondary" >
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <div className="text-muted">
              Amount:<strong>&nbsp;{props.buyInputValue}&nbsp;</strong>Token:&nbsp;
              <strong>{props.tickerId}</strong>&nbsp; Price:&nbsp;<strong>$&nbsp;{props.price}.</strong>&nbsp;
              Trade total:&nbsp;<strong>$&nbsp;{props.price * props.buyInputValue}</strong>
            </div>

          </div>
        }

        {props.isBuy &&
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success!</strong>Your purchase of&nbsp;<strong>{props.tickerId}</strong>is complete</div>
        }

        {props.isSold &&
          <div className="alert alert-dismissible alert-info">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
            <strong>Success!</strong>Your sale of&nbsp;<strong>{props.tickerId}</strong>is complete</div>
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
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  circulating_supply: PropTypes.number
}

export default Coin;