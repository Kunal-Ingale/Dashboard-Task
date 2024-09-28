import React from 'react'
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = ({data}) => {
    const chartData = {
        labels: Array.isArray(data) ? data.map((item) => item.range) : [],
        datasets: [
           { 
                label: 'Number of Items',
                data: Array.isArray(data) ? data.map((item) => item.count) : [],
                backgroundColor: '#1c8cda'
           }
        ]
    }
    
    return (
        <div>
            <Bar data={chartData}/>
        </div>
    )
}

export default Barchart
