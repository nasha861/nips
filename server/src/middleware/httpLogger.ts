import pinoHttp from "pino-http";
import { randomUUID } from "node:crypto";
import { logger } from "../utils/logger";

export const httpLogger = pinoHttp({
    logger,
    genReqId: (_req, res) => {
        const id = randomUUID();
        res.setHeader("X-Request-Id", id);
        return id;
    },
    autoLogging: {
        ignore: (req) => req.url === "/api/health",
    },
});