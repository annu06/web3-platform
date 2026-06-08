# Build context: monorepo root (required for pnpm workspace hoisting)

# ──────────── Stage 1: deps + build ────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@9

# Copy everything needed for install and build
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api ./apps/api

# Install deps
RUN pnpm install --frozen-lockfile --filter @web3/api

# Remove ox raw .ts files that cause TS2322
RUN find /app/node_modules/.pnpm -path "*ox@*" -name "*.ts" ! -name "*.d.ts" -delete 2>/dev/null || true

# Generate Prisma client and build
WORKDIR /app/apps/api
RUN npx prisma generate && pnpm build

# Use pnpm deploy to create a self-contained output (no symlinks)
WORKDIR /app
RUN pnpm deploy --filter @web3/api --prod /app/deployed

# Re-generate Prisma client inside the deployed node_modules
WORKDIR /app/deployed
RUN npx prisma generate --schema=./prisma/schema.prisma

# ──────────── Stage 2: production ──────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /app/deployed/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/apps/api/dist         ./dist
COPY --from=builder --chown=appuser:appgroup /app/apps/api/prisma       ./prisma

USER appuser

EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:4000/api/v1/health || exit 1

CMD ["node", "dist/main"]
