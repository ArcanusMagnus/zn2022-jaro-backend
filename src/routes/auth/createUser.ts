import express, { Router } from "express";
import Ajv, { JSONSchemaType } from "ajv";

import { ServiceContainer } from "../../services";
import { Middleware, AsyncMiddlewareFunction } from "../abstractRoute";
import User from "../../services/authService/models/UserModel";
import { getDb } from "../../services/dbConnect";

const ajv = new Ajv();
const schema: JSONSchemaType<User> = {
  type: "object",
  required: ["username", "password"],
};
const validate = ajv.compile(schema);

const validation: AsyncMiddlewareFunction = async (req, res, next) => {
  if (!req.body) {
    res.status(404);
    throw new Error("No data sent");
  }
  if (!validate(req.body)) {
    res.status(422);
    throw new Error("Invalid data");
  }
  if (!req.body.password || req.body.password.length < 6) {
    res.status(422);
    throw new Error(
      "Password must be set and must be at least 6 characters long"
    );
  }
  if (!req.body.username || req.body.username.length < 4) {
    res.status(422);
    throw new Error(
      "Username must be set and must be at least 5 characters long"
    );
  }
  const userNameAlreadyExists = await getDb()
    .collection("users")
    .findOne({ username: req.body.username });
  if (userNameAlreadyExists) {
    res.status(409);
    throw new Error("Username already exists");
  }
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const user = req.body;
    const { authService } = serviceContainer;
    await authService.createUser(user);
    res.status(201).json({ message: "User successfully created." });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.post("/createUser", validation, handler(serviceContainer));
  return router;
};
