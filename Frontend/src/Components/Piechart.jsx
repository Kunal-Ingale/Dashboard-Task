import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({ pieChartData, month }) => {
  
  const dataArray = Array.isArray(pieChartData) ? pieChartData : [];
    //  console.log("pieChartData" ,pieChartData );
  
  if (!dataArray.length) return <p>No pie chart data available for {month}</p>;

 
  const labels = dataArray.map(item => item._id);
  const data = dataArray.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Items per Category',
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <h3>Items per Category for {month}</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default Piechart;
