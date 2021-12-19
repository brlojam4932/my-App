import React, { useRef, useEffect, useState } from 'react';
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

function HistoryChart({ data }) {
  const ChartRef = useRef();
  // we need to create a new chart...we use useEffect
  // we must pass ctx and configs

  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");


  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    };
  };

  useEffect(() => { //we create a new chart
    if (ChartRef && ChartRef.current) {
      new Chartjs(ChartRef.current, {
        type: 'line',
        data: {
          datasets: [
            {
              label: "name",
              data: determineTimeFormat(),
              backgroundColor: "rgba(59, 65, 67, 0.8)",
              borderColor: "rgba(204, 255, 255, 0.4)",
              pointRadius: 0,
              borderWidth: 1
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  }, [day]);


  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">$&nbsp;{detail.current_price.toFixed(2)}</p>
          <p className={
            detail.price_change_24h < 0
              ? "text-danger my-0"
              : "text-success my-0"
          }
          >{detail.price_change_percentage_24h.toFixed(2)}&nbsp;%</p>
        </>
      )
    }

  }

  return (
    <>
      <div className='bg-white border mt-2 rounded p-3'>
        <h1>{renderPrice()}</h1>
        <div>
          <canvas ref={ChartRef} id="myChart" width="400" height="400"></canvas>
        </div>
      </div>

      <div className="chart-button mt-1">
        <button onClick={() => setTimeFormat("24h")} className="btn btn-outline-secondary btn-sm">24hr</button>
        <button onClick={() => setTimeFormat("7d")} className="btn btn-outline-secondary btn-sm mx-1">7d</button>
        <button onClick={() => setTimeFormat("1y")} className="btn btn-outline-secondary btn-sm">1y</button>
      </div>
    </>

  );
};

export default HistoryChart;
