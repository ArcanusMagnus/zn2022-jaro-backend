import express, { Router } from "express";
import { ObjectId } from "mongodb";

import { ServiceContainer } from "../../services";
import { Middleware, MiddlewareFunction } from "../abstractRoute";

const validation: MiddlewareFunction = (req, res, next) => {
  // TODO
  next();
};

const handler = (serviceContainer: ServiceContainer): Middleware => {
  return async (req: express.Request, res: express.Response) => {
    const user = req.body;
    const { authService } = serviceContainer;
    const token = await authService.login(user);
    res.status(200).json({ message: "Login successful", body: token });
  };
};

export default(serviceContainer: ServiceContainer, router: Router): Router => {
    router.post("/login", validation, handler(serviceContainer));
    return router;
}