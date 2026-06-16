# AI Automation Bot — production image
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy production deps and app source.
COPY --from=deps /app/node_modules ./node_modules
COPY package.json server.js ./
COPY config ./config
COPY public ./public

# Persisted chat/lead data lives here; mount a volume at /data in production.
ENV DATA_DIR=/data
RUN mkdir -p /data && chown -R node:node /app /data

USER node
EXPOSE 3000

# Liveness probe hits the lightweight /health endpoint.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
