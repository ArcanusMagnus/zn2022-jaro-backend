import express, { Router } from "express";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";

const validation: MiddlewareFunction = (req, res, next) => {
  // TODO (do I really need validation on a get route?)
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (
    req: express.Request,
    res: express.Response,
    next: Function
  ) => {
    const { bandsService } = serviceContainer;
    try {
      const bands = await bandsService.getAllBands();
      res
        .status(200)
        .json({ message: "Bands fetched successfully", body: bands });
    } catch (err) {
      next(err);
    }
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.get("/", validation, handler(serviceContainer));
  return router;
};
