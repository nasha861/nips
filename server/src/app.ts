import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { httpLogger } from "./middleware/httpLogger";
import { apiLimiter } from "./middleware/rateLimiter";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app: Application = express();

if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // we run behind a reverse proxy (e.g., Nginx, Cloudflare, etc.)
}

app.use(httpLogger);
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL }));
app.use("/api", apiLimiter);
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "nips-api",
    timestamp: new Date().toISOString(),
  });
});

// Must be LAST: unmatched routes, then the error handler
app.use(notFound);
app.use(errorHandler);

export default app;
