import express, { Router } from "express";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";

const validation: MiddlewareFunction = (req, res, next) => {
  // TODO
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const band = req.body;
    const { bandsService } = serviceContainer;
    await bandsService.postBand(band);
    res
      .status(201)
      .json({ message: "Band created successfully."});
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.post("/", validation, handler(serviceContainer));
  return router;
};
