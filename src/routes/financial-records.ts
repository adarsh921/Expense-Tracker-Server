import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record.js";
import { log } from "console";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.userId;
  try {
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for this user");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    console.log(req.body);
    
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      {
        new: true,
      }
    );
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
