import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Img = styled.img`
max-width: 33px
`;

const ExchHeader = styled.div`
bacground: black;
color: white;
width: 100%;
height: 100px;
display: flex;
flex-direction: column;
justify-constent: center;
alight-items: center;
`;

function Exchanges() {
  const [exchangeData, setExchangeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/exchanges',
    headers: {
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': '9271cb1bffmsh3bfde2fc26f9dd1p125f3cjsn6324533a44df'
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.request(options).then((response) => {
      setExchangeData(response.data);
      //console.log(response.data);
    })
      .catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, []);


  const exchangeList = exchangeData?.data?.exchanges;


  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error...</h1>

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  }


  return (
    <div className="container-lg">
      <ExchHeader>
        <h2>Cryptocurrency Exchanges Stats</h2>
        <h5 className="text-primary">Find out more about major exchanges here.</h5>
      </ExchHeader>
      <div className="row row-cols-5">
        <div className="col"></div>
        <div className='col text-primary'>22h Vol</div>
        <div className='col text-primary'>Markets</div>
        <div className='col text-primary'>Change</div>
      </div>
      <br />
      <br />
      {exchangeList && exchangeList.map((exchange, index) => (
        <div className='col table table-hover'>
          <span>
            <div className="row row-cols-5">
              <div className='col'>
                <h6><strong>{exchange.rank}</strong></h6>
                <Img className='exchange-image' src={exchange.iconUrl} />
                <p><strong>{exchange.name}</strong></p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.volume)}</p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.numberOfMarkets)}</p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.marketShare)}</p>
              </div>
              <div className="Col" onClick={() => toggle(index)} key={index}>
                <span>{clicked === index ? (<FiMinus />) : (<FiPlus />)}</span>
              </div>
            </div>
            {clicked === index ? (
              HTMLReactParser(exchange.description || '')
            ) : (null)}
          </span>
        </div>
      ))};
    </div>
  )
}

export default Exchanges;
