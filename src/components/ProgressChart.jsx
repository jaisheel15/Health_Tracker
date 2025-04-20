import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ current, goal }) => {
  const remaining = Math.max(0, goal - current);
  
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [current, remaining],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="max-w-xs mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProgressChart;