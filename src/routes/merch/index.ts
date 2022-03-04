import { Router } from "express";

import { ServiceContainer } from "../../services";
import getAllMerch from "./getAllMerch";
import postMerch from "./postMerch";
import deleteMerch from "./deleteMerch";
import updateMerch from "./updateMerch";

export default (services: ServiceContainer): Router => {
  const router = Router();

  getAllMerch(services, router);
  postMerch(services, router);
  deleteMerch(services, router);
  updateMerch(services, router);

  return router;
};
