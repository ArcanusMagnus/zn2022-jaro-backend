import express, { Router } from "express";
import { ObjectId } from "mongodb";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";

const validation: MiddlewareFunction = (req, res, next) => {
  // TODO
  if (!req.params.bandId || !req.params.bandId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid URL");
    res.status(404);
    throw error;
  }
  next();
};

// A lot of shared code, maybe refactor into one route with conditions?

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (
    req: express.Request,
    res: express.Response,
    next: Function
  ) => {
    const _id = new ObjectId(req.params.bandId);
    const { bandsService } = serviceContainer;
    try {
      const band = await bandsService.getOneBand(_id);
      res
        .status(200)
        .json({ message: "Band fetched successfully", body: band });
    } catch (err) {
      next(err);
    }
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.get("/:bandId", validation, handler(serviceContainer));
  return router;
};
