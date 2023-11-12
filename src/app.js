import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes";
import mongoose from "mongoose";

const app = express();

// Load environment variables from the .env file
dotenv.config();

const { PORT, URL_DB } = process.env;
const maxPayloadSize = '50mb';

app.use(cors());
app.use(express.json({ limit: maxPayloadSize }));
app.use(express.urlencoded({ extended: true, limit: maxPayloadSize }));

mongoose.connect(URL_DB);

app.use("/api", router);

app.listen(PORT, () => {
    console.log("========================================================================");
    console.log("===   Connected to port " + PORT + " successfully                            ");
    console.log("===   URL_DB:  " + URL_DB + " successfully  ");
    console.log("========================================================================");
});
