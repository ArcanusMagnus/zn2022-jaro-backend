import express, { Router } from "express";
import Ajv, { JSONSchemaType } from "ajv";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";
import BandsModel from "../../services/bandsService/models/BandsModel";
import isAuth from "../../middleware/isAuth";

// Might has been moved elsewhere, but it's only actual use will be here. If changes, refactor later.
const ajv = new Ajv();
const schema: JSONSchemaType<BandsModel> = {
  type: "object",
  required: ["name", "genre", "startTime"],
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
  return async (
    req: express.Request,
    res: express.Response,
    next: Function
  ) => {
    const band = req.body;
    const { bandsService } = serviceContainer;
    try {
      await bandsService.postBand(band);
      res.status(201).json({ message: "Band created successfully." });
    } catch (err) {
      next(err);
    }
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.post("/", isAuth, validation, handler(serviceContainer));
  return router;
};
