import { Router } from "express";

import { ServiceContainer } from "../../services";
import getAllBands from "./getAllBands";

export default (services: ServiceContainer): Router => {
    const router = Router();

    getAllBands(services, router);

    return router;
}