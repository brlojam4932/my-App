import React, { useRef, useEffect, useState } from 'react';
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

function HistoryChart({ data }) {
  const chartRef = useRef();

  const [day, week, year, detail] = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determinTimeFormat = () => {
    switch (timeFormat) {
      case "24":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determinTimeFormat(),
              backgroundColor: "rgba(51, 102, 204, 0.5)",
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
    
  });


  return (
    <div className='chart-button mt-1'>
      <button onClick={() => setTimeFormat("24")} className="btn btn-outline-secondary btn-sm">24hr</button>

      <button onClick={() => setTimeFormat("7d")} className="btn btn-outline-secondary btn-sm mx-1">7d</button>

      <button onClick={() => setTimeFormat("1y")} className="btn btn-outline-secondary btn-sm">1y</button>

    </div>
  )
}

export default HistoryChart;
