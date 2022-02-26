import express, { Router } from "express";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";

const validation: MiddlewareFunction = (req, res, next) => {
  // TODO
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const { bandsService } = serviceContainer;
    const bands = await bandsService.getAllBands();
    res
      .status(200)
      .json({ message: "Bands fetched successfully", body: bands });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.get("/", validation, handler(serviceContainer));
  return router;
};
