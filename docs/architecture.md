# NIPS Architecture (Phase 1)

Request flow:

    Browser (React + Vite + TypeScript, :5173)
            |  JSON over HTTP, CORS restricted to CLIENT_URL
            v
    Express API (TypeScript, :5000)
      request logger -> helmet -> CORS -> rate limit -> JSON parser
      routes (modules added from Phase 2)
      notFound -> errorHandler
            |
            v
    MongoDB Atlas (via Mongoose)

Planned later: Python ETL -> PostgreSQL warehouse -> Power BI.
