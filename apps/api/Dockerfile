# Build context: monorepo root (required for pnpm workspace hoisting)

# ──────────── Stage 1: deps ────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm@9

# Copy workspace manifests first for better layer caching
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile --filter @web3/api

# ──────────── Stage 2: build ───────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@9

COPY --from=deps /app/node_modules        ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY package.json pnpm-workspace.yaml     ./
COPY apps/api                             ./apps/api

WORKDIR /app/apps/api
RUN npx prisma generate && pnpm build

# ──────────── Stage 3: production ──────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /app/apps/api/dist        ./dist
COPY --from=builder --chown=appuser:appgroup /app/apps/api/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/apps/api/prisma       ./prisma

USER appuser

EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:4000/api/v1/health || exit 1

CMD ["node", "dist/main"]
