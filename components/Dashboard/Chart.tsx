import { Line } from 'react-chartjs-2';
import { Chart, ChartOptions, registerables } from 'chart.js';
import chartStyles from '../../styles/Chart.module.css';

Chart.register(...registerables);

const ChartComponent: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'category',
        display: true,
        labels: data.labels,
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={chartStyles.chartContainer}>
      <Line className={chartStyles.chartContainer} data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
