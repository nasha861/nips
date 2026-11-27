import { env } from "./config/env";
import { connectDB } from "./config/db";
import app from "./app";
import { logger } from "./utils/logger";

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(env.PORT, () => {
    logger.info(`NIPS API running on port ${env.PORT}`);
  });
};

start().catch((err: unknown) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
