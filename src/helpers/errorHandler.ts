import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const message = error.message;
  const data = error.data;
  res.json({
    message: message,
    data: data,
    status: res.status,
  });
};
