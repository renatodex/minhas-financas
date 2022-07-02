// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabase } from '../supabase_client'

// export default async function handler(req, res) {
//   const { data, error } = await supabase.from('monthly_summaries').select(`*`)

//   res.status(200).json({ data: data })
// }

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const summaries = await prisma.MonthlySummary.findMany({ include: { monthly_entries: true }})

  const entries = summaries.map(summary => {
    const entriesByCategory = summary.monthly_entries.reduce((arr, entry) => {
      if (!arr[entry.category]) arr[entry.category] = []
      arr[entry.category].push(entry)
      return arr
    }, {})

    const categoryTotals = Object.values(entriesByCategory).reduce((totals, entryGroup) => {
      totals.push(
        entryGroup.reduce((groupTotal, entry) => {
          groupTotal += entry.amount
          return groupTotal
        }, 0)
      )

      return totals
    }, [])

    return {
      ...summary,
      chart_data: {
        labels: Object.keys(entriesByCategory),
        data: categoryTotals,
      },
    }
  })

  res.status(200).json({ data: entries })
}