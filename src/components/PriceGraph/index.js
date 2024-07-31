import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const PriceGraph = ({ symbol }) => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const mockData = {
      weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [150, 152, 151, 153, 155],
      },
      monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [151, 153, 152, 155],
      },
      historic: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [145, 150, 148, 152, 155, 160],
      },
    };

    setChartData({
      labels: mockData[timeframe].labels,
      datasets: [
        {
          label: `${symbol} Price`,
          data: mockData[timeframe].data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  }, [timeframe, symbol]);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${symbol} Price Chart - ${timeframe}`,
      },
    },
  };

  return (
    <div className="price-graph">
      <h2>Price Graph</h2>
      <select value={timeframe} onChange={handleTimeframeChange}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="historic">Historic</option>
      </select>
      {chartData && <Line options={options} data={chartData} />}
    </div>
  );
};

export default PriceGraph;