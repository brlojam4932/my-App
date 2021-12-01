import React from "react";


const CoinInfo = ({ market_cap, total_supply, total_volume, high_24h, circulating_supply, low_24h}) => {

  return (
    <div className="bg-grey mt-3 p2 rounded border row">
        <div className="col-sm">
          <div className="d-flex flex-column">
            <span className="text-muted coin-data-category">Market</span>
            <span>{market_cap}</span>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <span className="text-muted coin-date-catergory">
              Total Supply
            </span>
            <span>{total_supply}</span>
          </div>
        </div>
        <div className="col-sm">
          <div className="d-flex flex-column">
            <span className="text-muted coin-data-category">Volume 24h</span>
            <span>{total_volume}</span>
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
            <span>{circulating_supply}</span>
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
