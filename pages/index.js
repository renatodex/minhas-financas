// import randomColor from "randomcolor";
// console.log(Array.from({length: 6}, (_) => randomColor()))
import { useCallback, useEffect, useState } from 'react';
import MonthlySummary from './components/monthly_summary';
import SourceUpload from './components/source_upload';

export default function Index() {
  const [monthlySummaries, setMonthlySummaries] = useState([])

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [1200, 1900, 300, 500, 200, 300],
        backgroundColor: ['#e0cf60', '#4cce71', '#7be845', '#1f577c', '#7ce285', '#18f2b0'],
        borderWidth: 1,
      },
    ],
  }

  useEffect(() => {
    const load = async function () {
      const result = await fetch('/api/monthly_summaries')
      const resultJson = await result.json()
      setMonthlySummaries(resultJson.data)
    }

    load()
  }, [])

  const handleSourceCreation = async function ({ event, selectedFile }) {
    console.log('Selectedfile', selectedFile)

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "selectedFile",
      selectedFile,
      selectedFile.name ,
    );

    const response = await fetch('/api/monthly_summaries/create', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    });

  }

  return (
    <div className="p-10 border-2 ">
      <h1 className="text-5xl font-bold font-serif text-gray-600">
        Minhas Finanças
      </h1>

      <SourceUpload onSubmit={e => handleSourceCreation(e)} />

      <div className="border-t-2 mt-9 pt-5">
        <h1 className="text-2xl font-bold font-serif text-gray-700">
          Últimos Meses
        </h1>

        <div className="grid grid-cols-2 py-6 gap-11">
          {monthlySummaries.map(monthlySummary => (
            <div key={monthlySummary.id}>
              <MonthlySummary data={monthlySummary} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
