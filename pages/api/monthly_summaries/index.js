// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '../supabase_client'

export default async function handler(req, res) {
  const { data, error } = await supabase.from('monthly_summaries').select(`*`)

  res.status(200).json({ data: data })
}
