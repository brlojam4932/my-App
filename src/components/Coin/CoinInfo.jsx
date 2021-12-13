import React from "react";


const CoinInfo = ({ marketCap, totalSupply, volume24h, high_24h, circulatingSupply, low_24h}) => {

  return (
    <div className="bg-grey mt-3 p2 rounded border row">
        <div className="col-sm">
          <div className="d-flex flex-column">
            <span className="text-muted coin-data-category">Market</span>
            <span>{marketCap}</span>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <span className="text-muted coin-date-catergory">
              Total Supply
            </span>
            <span>{totalSupply}</span>
          </div>
        </div>
        <div className="col-sm">
          <div className="d-flex flex-column">
            <span className="text-muted coin-data-category">Volume 24h</span>
            <span>{volume24h}</span>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <span className="text-muted coin-date-catergory">
              High 24h
            </span>
            <span>{high_24h}</span>
          </div>
        </div>
        <div className="col-sm">
          <div className="d-flex flex-column">
            <span className="text-muted coin-data-category">Circulating Supply</span>
            <span>{circulatingSupply}</span>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <span className="text-muted coin-date-catergory">
              low 24h
            </span>
            <span>{low_24h}</span>
          </div>
        </div>
      </div>
  )


};



export default CoinInfo;
