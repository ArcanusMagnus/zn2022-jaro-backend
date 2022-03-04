import express, { Router } from "express";
import { ObjectId } from "mongodb";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";
import isAuth from "../../middleware/isAuth";

const validation: MiddlewareFunction = (req, res, next) => {
  if (!req.params.bandId || !req.params.bandId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid URL");
    res.status(404);
    throw error;
  }
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const _id = new ObjectId(req.params.bandId);
    const { bandsService } = serviceContainer;
    const band = await bandsService.deleteBand(_id);
    res.status(200).json({ message: "Band deleted successfully", body: band });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
    router.delete("/:bandId", isAuth, validation, handler(serviceContainer));
    return router;
  };
  