import express, { Router } from "express";

import { ServiceContainer } from "../../services";
import { Middleware } from "../abstractRoute";

// maybe some security middleware to be add later, fot now imo not necessary

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const { merchService } = serviceContainer;
    const merch = await merchService.getAllMerch();
    res
      .status(200)
      .json({ message: "Merchandise fetched successfully", body: merch });
  };
};

export default (serviceContainer: ServiceContainer, router: Router): Router => {
  router.get("/", handler(serviceContainer));
  return router;
};
