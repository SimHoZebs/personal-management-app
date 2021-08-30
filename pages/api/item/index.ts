//connection
import corsMethods from '../../../lib/corsMiddleware'
import dbConnect from '../../../lib/dbConnect'

//interfaces
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosRequestConfig } from 'axios'
import IapiRes from '../../../interface/IApiRes';
import ItemModel, { IItemModel } from '../../../schema/ItemSchema'

export interface IGetReq extends AxiosRequestConfig {
  method: "get" | "GET"
}
export interface IPostReq extends AxiosRequestConfig {
  method: "post" | "POST"
  data: { newItem: IItemModel }
}

export interface IGetRes extends IapiRes {
  res: IItemModel[]
}

export interface IPostRes extends IapiRes {

}

const cors = corsMethods(["DELETE"])

export default async function handler(req: NextApiRequest, res: NextApiResponse<IapiRes>) {
  const { method, body } = req;

  await cors(req, res);
  await dbConnect();

  console.log(body)

  switch (method) {
    case "GET":
      try {
        const itemList = await ItemModel.find({})
        res.status(200).json({ res: itemList, success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case "POST":
      try {
        const newItem = await ItemModel.create(new ItemModel(body.newItem));
        res.status(201).json({ success: true, res: newItem })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case "DELETE":
      try {
        const removedItem = await ItemModel.findByIdAndRemove(req.body._id)
        res.status(201).json({ success: true, res: removedItem })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;
  }
}