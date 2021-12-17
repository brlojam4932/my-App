import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
//import { withTheme } from 'styled-components';
//import Chartjs from "chart.js";


/*
const data = {
  labels: ['1', '2', '3', '4', '5'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 99, 132],
      fill: true,
      backgroundColor: "#2e4355",
      borderColor: "rgba(255, 99, 132, 0.2)"
    
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  
};
*/


function ChartTest() {
  const [chartData, setChartData] = useState({})

  const chart = () => {
    setChartData({
      type: "line",
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: "level of thickness",
          data: [32, 45, 12, 76, 60],
          backgroundColor: [
            'rgba(171, 15, 15, 0.75)'
          ],
          borderColor: [
            'rgba(100, 100, 100, .3)'
          ],
          color: "w#666",
          borderWidth: 4,
          
        }
      ]
    });
  };


 useEffect(() => {
   chart()
 }, []);


  return (
    <div className='ChartTest'> 
      <h2>Chart Test</h2>
      <div style={{height: "1000px", width: "1000px"}}>
       <Line data={chartData} options={{
         responsive: true,
         title: {text: "Thickness Scale", display: true},
         scales: {
           yAxes: [
             {
               ticks: {
                 autoSkip: true,
                 maxTicksLimit: 10,
                 beginAtZero: true
               },
               gridLines: {
                 display: false
               }
             }
           ]
         }
         }} />
      </div>
     
    </div>
  );
};

export default ChartTest;
