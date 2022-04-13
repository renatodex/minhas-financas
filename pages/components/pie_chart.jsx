import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartComponent ({ data }) {
  return (
    <Pie
      data={data.chart_data}
    />
  )
}