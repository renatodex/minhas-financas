import PieChart from './pie_chart'
import CurrencyFormat from 'react-currency-format';
import randomColor from "randomcolor";

function monthName(number) {
  return {
    '1': 'Janeiro',
    '2': 'Fevereiro',
    '3': 'Março',
    '4': 'Abril',
    '5': 'Maio',
    '6': 'Junho',
    '7': 'Julho',
    '8': 'Agosto',
    '9': 'Setembro',
    '10': 'Outubro',
    '11': 'Novembro',
    '12': 'Dezembro'
  }[number]
}

function generateChartData(entry) {
  return {
    labels: entry.chart_data.labels,
    datasets: [
      {
        label: '# of Votes',
        data: entry.chart_data.data,
        backgroundColor: Array.from({length: entry.chart_data.labels.length}, (_) => randomColor()),
        borderWidth: 1,
      },
    ],
  }
}

export default function MonthlySummary ({ data }) {
  if (!data) return;

  return (
    <div className="bg-gray-100 text-gray-900 p-10 rounded-xl">
      <h2 className="text-2xl font-bold text-blue-800">
        {monthName(data.month)} {data.year} /
        &nbsp;
        <span className="text-gray-900">
          <CurrencyFormat value={data.total.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'R$ '} />
        </span>

        <div className="w-96 mt-5">
          <PieChart chart_data={generateChartData(data)} />
        </div>
      </h2>
    </div>
  )
}