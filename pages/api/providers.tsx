import type { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'
import dbConnect from '../../lib/dbConnect'
import ProviderSchema from '../../models/ProviderSchema'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  try {
    const provider = await ProviderSchema.create(req.body)
    res.status(201).json({ success: true, data: provider })
  } catch (error) {
    res.status(400).json({ success: false })
  }
})

export default handler
