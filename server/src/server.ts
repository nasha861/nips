import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

async function start(): Promise<void> {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`NIPS API running on port ${env.PORT} (${env.NODE_ENV})`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

void start();