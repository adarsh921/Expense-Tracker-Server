import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records.js";
import cors from "cors";

dotenv.config(); //loads the envvironment variables from the .env file

const app = express();
if (!process.env.mongoURL) {
  throw new Error("mongoURL is not defined in enviorment variables");
}
const mongoURL: string = process.env.mongoURL;

const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://unique-crumble-063c6d.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

app.use(
  cors({
    origin: 'https://unique-crumble-063c6d.netlify.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

app.use("/financial-records", financialRecordRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MONGO!");
  })
  .catch((err: any) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
