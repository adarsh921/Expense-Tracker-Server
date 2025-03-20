import mongoose from "mongoose";
// const {Schema} = mongoose;

interface FinancialRecord  {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  payment: string;
}

const FinancialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  payment: { type: String, required: true },
});

const FinancialRecordModel = mongoose.model(
  "financialRecord",
  FinancialRecordSchema
);

export default FinancialRecordModel;
