import { Router } from "express";

import { ServiceContainer } from "../../services";
import getAllBands from "./getAllBands";
import getOneBand from "./getOneBand";
import postBand from "./postBand";

export default (services: ServiceContainer): Router => {
    const router = Router();

    getAllBands(services, router);
    getOneBand(services, router);
    postBand(services, router);

    return router;
}