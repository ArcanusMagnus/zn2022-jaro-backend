// import express, { Router } from "express";

// import { ServiceContainer } from "../../services";
// import { Middleware, MiddlewareFunction } from "../abstractRoute";

// const validation: MiddlewareFunction = (req, res, next) => {
//     // TODO
//     next();
// }

// const handler = (serviceContainer: ServiceContainer): Middleware => {
//     return(req: express.Request, res: express.Response) => {
//         const { bandsService } = serviceContainer;
//         res.status(200).json(bandsService.getAllBands())
//     }
// }

// export default (serviceContainer: ServiceContainer, router: Router): Router => {
//     router.post("/", validation, handler(serviceContainer))
//     return router;
// }