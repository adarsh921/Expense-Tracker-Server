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
const mongoURL = process.env.mongoURL;
const port = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Your Vite frontend URL
    credentials: true,
}));
app.use("/financial-records", financialRecordRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
mongoose
    .connect(mongoURL)
    .then(() => {
    console.log("Connected to MONGO!");
})
    .catch((err) => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
