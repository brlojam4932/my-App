import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

const Img = styled.img`
max-width: 33px
`;

function Exchanges() {
  const [exchangeData, setExchangeData] = useState([]); // this can be any type of data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);

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


  return (
    <div className="container-lg">
      <div className="row row-cols-4">
        <div className="col"></div>
        <div className='col text-primary'>22h Vol</div>
        <div className='col text-primary'>Markets</div>
        <div className='col text-primary'>Change</div>
      </div>
      <br />
      <br />
      {exchangeList && exchangeList.map((exchange) => (
        <div className='col'>
          <span>
            <div className="row row-cols-4">
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
            </div>
            {show ? HTMLReactParser(exchange.description || '') : null}
            <button className="btn btn-outline-light" onClick={() => setShow(true)}>Show</button>
            <button className="btn btn-outline-light" onClick={() => setShow(false)}>Hide</button>
          </span>
        </div>
      ))};
    </div>
  )
}

export default Exchanges;
