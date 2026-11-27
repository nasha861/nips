import { useEffect, useState } from "react";
import { getJson } from "./services/api";
import type { HealthResponse } from "./types/health";

type HealthState =
  { kind: "loading" } | { kind: "ok"; data: HealthResponse } | { kind: "error"; message: string };

function App() {
  const [health, setHealth] = useState<HealthState>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    getJson<HealthResponse>("/api/health", controller.signal)
      .then((data) => setHealth({ kind: "ok", data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setHealth({ kind: "error", message });
      });

    return () => controller.abort();
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>NIPS</h1>
      <p>Nigerian IDP Profiling &amp; Support System</p>

      {health.kind === "loading" && <p>Checking API...</p>}
      {health.kind === "ok" && (
        <p>
          API status: <strong>{health.data.status}</strong> ({health.data.service}) at{" "}
          {health.data.timestamp}
        </p>
      )}
      {health.kind === "error" && (
        <p style={{ color: "crimson" }}>API unreachable: {health.message}</p>
      )}
    </main>
  );
}

export default App;
