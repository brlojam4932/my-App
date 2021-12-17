import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import coinGecko from "../Utility/coinGecko";
import HistoryChart from './HistoryChart';
import Coin from "../Coin/Coin";

function CoinChart() {
  const {id} = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get(`/coins/${id}/markets/`, {
          params: {
            vs_currency: "usd",
            ids: id,
          },
        }),
      ]);
      console.log(day);
  
      setCoinData({
        day: day.data.prices,
        week: week.data.prices,
        year: year.data.prices,
        detail: detail.data[0]
      });
      setIsLoading(false)
    };

    fetchData();
   
  }, [id]);


  const renderData = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <HistoryChart />
        <Coin />
      </div>
    );
  };


  return renderData();
};

export default CoinChart;
