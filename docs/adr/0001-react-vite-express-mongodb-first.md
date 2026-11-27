# ADR 0001: Start with React + Vite + TypeScript + Express + MongoDB

- Status: Accepted
- Date: 2026-11-23

## Context
NIPS needs a secure, typed full-stack foundation. The developer is strong in React,
Node, Express and MongoDB, and is learning TypeScript and Next.js.

## Decision
Build the first version as a separate React (Vite, TypeScript) client and an
Express (TypeScript) API on MongoDB. Introduce Next.js later, for example for a
public overview portal. Add a PostgreSQL analytics warehouse at Phase 8.

## Consequences
- Positive: one new major tool at a time, a clear client/API boundary, a reusable API.
- Negative: two deployables, and no server-side rendering until Next.js is added.
- Risk: the data is highly relational, so Mongoose schemas stay strict and
  relationships stay explicit (IDs, not deep nesting) to keep a later
  PostgreSQL migration possible.

## Alternatives considered
- Next.js + TypeScript + MongoDB from day one: two big learning curves at once.
- PostgreSQL as the operational database now: better fit for relational data,
  but slower start given current skills. Revisit at Phase 8.
