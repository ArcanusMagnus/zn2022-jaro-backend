// Dependencies
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
//
import { mongoConnect } from "./services/dbConnect";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? "";

// Middleware
app.use(bodyParser.json());

// Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoConnect(() => {
  app.listen(PORT);
});
