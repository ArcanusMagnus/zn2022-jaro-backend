import express, { Router } from "express";
import { ObjectId } from "mongodb";
import Ajv, { JSONSchemaType } from "ajv";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";
import MerchModel from "../../services/merchService/models/MerchModel";
import isAuth from "../../middleware/isAuth";

const ajv = new Ajv();
const schema: JSONSchemaType<MerchModel> = {
  type: "object",
  required: ["name", "link", "photo", "price"],
};
const validate = ajv.compile(schema);

const validation: MiddlewareFunction = (req, res, next) => {
  if (!req.params.merchId || !req.params.merchId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid URL");
    res.status(404);
    throw error;
  }
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

// A lot of shared code, maybe refactor into one route with conditions?

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const _id = new ObjectId(req.params.merchId);
    const merch = req.body;
    const { merchService } = serviceContainer;
    await merchService.updateMerch(_id, merch);
    res.status(200).json({ message: "Merch item updated successfully" });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.patch("/:merchId", isAuth, validation, handler(serviceContainer));
  return router;
};
