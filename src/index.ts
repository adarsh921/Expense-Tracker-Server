import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records.js";
import cors from "cors";

dotenv.config(); //loads the envvironment variables from the .env file

const app = express();
if (!process.env.MONGO_URI) {
  throw new Error("mongoURL is not defined in enviorment variables");
}
const MONGO_URI: string = process.env.MONGO_URI;

const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "https://unique-crumble-063c6d.netlify.app", // Allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/financial-records", financialRecordRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MONGO!");
  })
  .catch((err: any) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
