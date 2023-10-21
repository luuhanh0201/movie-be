import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes";
import mongoose from "mongoose";

const app = express()
app.use(cors());
app.use(express.json());
dotenv.config()
const { PORT, URL_DB } = process.env;

mongoose.connect(URL_DB)
app.use("/api", router)
app.listen(PORT, () => {
    console.log("========================================================================");
    console.log("===   Connected to port " + PORT + " successfully                            ");
    console.log("===   URL_DB:  " + URL_DB + " successfully  "); 
    console.log("========================================================================");
})
