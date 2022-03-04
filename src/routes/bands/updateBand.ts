import express, { Router } from "express";
import { ObjectId } from "mongodb";
import Ajv, { JSONSchemaType } from "ajv";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";
import BandsModel from "../../services/bandsService/models/BandsModel";
import isAuth from "../../middleware/isAuth";

const ajv = new Ajv();
const schema: JSONSchemaType<BandsModel> = {
  type: "object",
  required: ["name", "genre", "startTime"],
};
const validate = ajv.compile(schema);

const validation: MiddlewareFunction = (req, res, next) => {
  if (!req.params.bandId || !req.params.bandId.match(/^[0-9a-fA-F]{24}$/)) {
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
    const _id = new ObjectId(req.params.bandId);
    const band = req.body;
    const { bandsService } = serviceContainer;
    const result = await bandsService.updateBand(_id, band);
    res.status(200).json({ message: "Band updated successfully", body: result });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.patch("/:bandId", isAuth, validation, handler(serviceContainer));
  return router;
};
