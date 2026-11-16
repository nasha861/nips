import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" })); // Vite's default dev port
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "nips-api",
    timestamp: new Date().toISOString(),
  });
});

export default app;