import express, { Router } from "express";
import { ObjectId } from "mongodb";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";

const validation: MiddlewareFunction = (req, res, next) => {
  if (!req.params.merchId || !req.params.merchId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid URL");
    res.status(404);
    throw error;
  }
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const _id = new ObjectId(req.params.merchId);
    const { merchService } = serviceContainer;
    const band = await merchService.deleteMerch(_id);
    // now tells success even if item was not found
    res.status(200).json({ message: "Merchandise item deleted successfully", body: band });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
    router.delete("/:merchId", validation, handler(serviceContainer));
    return router;
  };
  