# ADR 0002: Pin TypeScript to 6.0.x

- Status: Accepted (revisit when typescript-eslint supports TypeScript 7)
- Date: 2026-11-27

## Context
TypeScript 7 is out, but typescript-eslint's peer range is typescript >=4.8.4 <6.1.0,
so installing both fails, and forcing it breaks ESLint.

## Decision
Pin TypeScript to ~6.0.3 in both server and client.

## Consequences
- Positive: lint, typecheck and CI work together.
- Negative: no TypeScript 7 features or speed gains for now.
- Follow-up: when typescript-eslint declares TypeScript 7 support, bump both together.
