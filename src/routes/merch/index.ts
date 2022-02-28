import { Router } from "express";

import { ServiceContainer } from "../../services";
import getAllMerch from "./getAllMerch";
import postMerch from "./postMerch";
import deleteMerch from "./deleteMerch";

export default (services: ServiceContainer): Router => {
  const router = Router();

  getAllMerch(services, router);
  postMerch(services, router);
  deleteMerch(services, router);

  return router;
};
