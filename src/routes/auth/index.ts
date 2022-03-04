import { Router } from "express";

import { ServiceContainer } from "../../services";
import createUser from "./createUser";
import login from "./login";

export default (services: ServiceContainer): Router => {
    const router = Router();

    createUser(services, router);
    login(services, router);
  
    return router;
  };
  