import jwt from "jsonwebtoken";

import { MiddlewareFunction } from "../routes/abstractRoute";

const isAuth: MiddlewareFunction = (req, res, next): void => {
    const token = req.get("Authentication");
    if (!token) {
        res.status(401);
        throw new Error("Not authenticated");
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? "");
    } catch (err) {
      res.status(401);
      throw new Error("Invalid token");
    }
    if (!decodedToken) {
      res.status(401);
      throw new Error("Not authenticated");
    }
    next();
  };

  export default isAuth;