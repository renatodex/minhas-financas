// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabase } from '../supabase_client'

// export default async function handler(req, res) {

//   const bodyData = req.body

//   console.log(bodyData)
//   // const { data, error } = await supabase.from('monthly_summaries').insert([
//   //   {
//   //     month: '',
//   //     year: '',
//   //     total: '',
//   //     source: {},
//   //     chart_data: {}
//   //   }
//   // ])

//   res.status(200).json({ params: typeof(req.body) })
//   // res.status(200).json({ data: data, error: error })
// }

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const bodyData = req.body

  let csvLines = bodyData.split("\n")

  csvLines.shift() // Removes opening WebKitFormBoundary line (eg: ------WebKitFormBoundaryqDB4LzdoePkkHkl3\r)
  csvLines.shift() // Removes content disposition line (eg: Content-Disposition: form-data; name="selectedFile"; filename="nubank-2022-03.csv"\r)
  csvLines.shift() // Removes mimetype line (eg: Content-Type: text/csv\r)
  csvLines.shift() // Removes \r (Not sure why. ~But I'm afraid this could be a windows thing ç_ç)

  const columns = csvLines.shift().split(",") // return an Array with all Columns. Columns are always 5th line

  csvLines.pop() // Removes the last line, which seems to always be an empty string line. (lol)
  csvLines.pop() // Remove the second to last line, which seem to close WebKitFormBoundary markup. (eg: '------WebKitFormBoundaryqDB4LzdoePkkHkl3--\r',)

  console.log(csvLines)

  csvLines = csvLines.map(csvLine => csvLine.replace("\r", "")) // Removes any annoying \r character.
  csvLines = csvLines.map(csvLine => csvLine.replace("Dm *Godaddycom,L", "Dm *Godaddycom"))
  csvLines = csvLines.map(csvLine => csvLine.split(",")) // Split each column in a sub-array, now we are getting to the point!

  // Creates an Entry data object ready to be inserted in the database
  const entries = csvLines.map(csvLine => {
    return {
      transactioned_at: new Date(csvLine[0]).toISOString(),
      category: csvLine[1] || "uncategorized",
      description: csvLine[2],
      amount: parseFloat(csvLine[3]),
    }
  })

  const positiveEntries = entries.filter(entry => entry.amount > 0)

  const firstTransactionDate = positiveEntries[0].transactioned_at.split('-')
  const month = parseInt(firstTransactionDate[1])
  const year = parseInt(firstTransactionDate[0])


  const summaryData = {
    month: month,
    year: year,
  }

  // Check if Summary already exists, if not, create one. This also prevents duplication.
  let summary = await prisma.MonthlySummary.findFirst({
    where: summaryData
  })

  if (!summary) {
    summary = await prisma.MonthlySummary.create({
      data: summaryData,
    })
  }

  // Add All entries in one single batch operation
  // Although we are skipping duplicates, we are not specifying any unique composition in the entries table. (to avoid lose of data)
  let entriesData = positiveEntries.map(entry => (
    {
      ...entry,
      monthly_summary_id: summary.id,
    }
  ))

  console.log(entriesData)
  const createMany = await prisma.MonthlyEntry.createMany({
    data: entriesData,
    skipDuplicates: true,
  })

  // After we added everything, we open the summary again and update the totals
  let summaryAfterEntries = await prisma.MonthlySummary.findFirst({
    where: summaryData,
    include: {
      monthly_entries: true,
    }
  })

  // Update overall total in the original Summary
  await prisma.MonthlySummary.update({
    where: {
      id: summaryAfterEntries.id,
    },
    data: {
      total: summaryAfterEntries.monthly_entries.reduce((a, b) => a + b.amount, 0),
    }
  })

  res.status(200).json({})
}