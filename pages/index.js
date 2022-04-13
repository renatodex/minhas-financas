import PieChart from './components/pie_chart'
import randomColor from "randomcolor";

export function Button () {
  return (
    <div>
      <button className="bg-slate-400 text-black px-3 py-1.5 rounded">Adicionar</button>
    </div>
  )
}

export function MonthlySummary ({ data }) {
  return (
    <div className="bg-gray-100 text-gray-900 p-10 rounded-xl">
      <h2 className="text-2xl font-bold text-blue-800">
        Março 2022 / <span className="text-gray-900">R$ 5023,29</span>

        <div className="w-96 mt-5">
          <PieChart data={data} />
        </div>
      </h2>
    </div>
  )
}

export default function Index() {
  let data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: Array.from({length: 6}, (_) => randomColor()),
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="p-10 border-2 ">
      <h1 className="text-5xl font-bold font-serif text-gray-600">
        Minhas Finanças
      </h1>

      <div className="bg-gray-700 text-white mt-5 p-5 rounded-xl">
        <p className="text-lg font-semibold">Upload do Extrato Nubank:</p>

        <div className="mt-4">
          <input type="file" />
        </div>

        <div className="mt-4">
          <Button />
        </div>
      </div>

      <div className="border-t-2 mt-9 pt-5">
        <h1 className="text-2xl font-bold font-serif text-gray-700">
          Últimos Meses
        </h1>

        <div className="grid grid-cols-2 py-6 gap-11">
          <MonthlySummary data={data} />
          <MonthlySummary data={data} />
          <MonthlySummary data={data} />
          <MonthlySummary data={data} />
        </div>
      </div>
    </div>
  )
}
