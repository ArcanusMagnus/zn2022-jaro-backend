import express, { Router } from "express";
import Ajv, { JSONSchemaType } from "ajv";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";
import MerchModel from "../../services/merchService/models/MerchModel";

// Might has been moved elsewhere, but it's only actual use will be here. If changes, refactor later.
const ajv = new Ajv();
const schema: JSONSchemaType<MerchModel> = {
  type: "object",
  required: ["name", "link", "photo", "price"],
};
const validate = ajv.compile(schema);

const validation: MiddlewareFunction = (req, res, next) => {
  if (!req.body) {
    res.status(204);
    throw new Error("No data sent");
  }
  if (!validate(req.body)) {
    res.status(422);
    throw new Error("Invalid data");
  }
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const merch = req.body;
    const { merchService } = serviceContainer;
    await merchService.postMerch(merch);
    res.status(201).json({ message: "Merchandise item created successfully." });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.post("/", validation, handler(serviceContainer));
  return router;
};
