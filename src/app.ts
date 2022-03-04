// External dependencies
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

// My dependecies
import { mongoConnect } from "./services/dbConnect";
import services from "./services";

// Routes
import bandsRoutes from "./routes/bands";
import merchRoutes from "./routes/merch";
import authRoutes from "./routes/auth";

// Declaration and config block
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? "";
const serviceContainer = services();

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

// Route handling
app.use("/auth", authRoutes(serviceContainer));
app.use("/bands", bandsRoutes(serviceContainer));
app.use("/merch", merchRoutes(serviceContainer));

// TODO: Error handling

// Spin up the server
mongoConnect(() => {
  app.listen(PORT);
});
