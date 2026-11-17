import { ErrorRequestHandler, RequestHandler } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const notFound: RequestHandler = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : "Internal server error";

  if (!isApiError) {
    console.error(err); // full details go to the log, never to the client
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(env.NODE_ENV === "development" && !isApiError ? { stack: err.stack } : {}),
  });
};