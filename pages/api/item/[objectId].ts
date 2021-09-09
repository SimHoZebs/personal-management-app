import { NextApiRequest, NextApiResponse } from 'next';
import ItemModel, { ItemSchema } from '../../../schema/ItemSchema';

//interfaces
import ApiRes from '../../../lib/api/ApiRes';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, url, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ res: url, success: true });
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'POST':
      try {
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'PATCH':
      try {
        const updatedItem: ItemSchema = await ItemModel.findOneAndUpdate({ _id: query.objectId }, { title: body.newTitle }, { new: true })
        res.status(200).json({ res: updatedItem, success: true });
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'DELETE':
      try {
        res.status(200).json({ res: "delete successful", success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;
  }
}