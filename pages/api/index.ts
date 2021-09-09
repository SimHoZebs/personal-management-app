import dbConnect from '../../lib/dbConnect'

import ApiRes from '../../lib/api/ApiRes'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body } = req;

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ success: true })
      }
      catch (error) {
        res.status(500).json({ error: error, success: false })
      }
  }
}
