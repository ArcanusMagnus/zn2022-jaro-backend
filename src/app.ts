import fs from "fs";
import http from "http";
import https from "https";
import path from "path";

// External dependencies
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

// My dependecies
import { mongoConnect } from "./services/dbConnect";
import services from "./services";
import { errorHandler } from "./helpers/errorHandler";

// Routes
import bandsRoutes from "./routes/bands";
import merchRoutes from "./routes/merch";
import authRoutes from "./routes/auth";

// Declaration and config block
dotenv.config();

// Certificate
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/majernicek.eu/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/majernicek.eu/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/majernicek.eu/chain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const app = express();

const PORT = process.env.PORT ?? 80;
const HTTPS_PORT = process.env.HTTPS_PORT ?? 443;
const serviceContainer = services();

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

// Middleware
app.use(bodyParser.json());
app.use(
  "/images",
  express.static(path.join(__dirname, "images").replace(/\\/g, "/"))
);
app.use(express.static(__dirname, { dotfiles: "allow" }));

// Route handling
app.use("/auth", authRoutes(serviceContainer));
app.use("/bands", bandsRoutes(serviceContainer));
app.use("/merch", merchRoutes(serviceContainer));

// TODO: Error handling
app.use(errorHandler);

// Spin up the server
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
mongoConnect(() => {
  httpServer.listen(PORT);
  httpsServer.listen(HTTPS_PORT);
});
