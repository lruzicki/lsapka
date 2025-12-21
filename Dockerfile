# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG API_BASE_URL

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV API_BASE_URL=${API_BASE_URL}

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

# Install minimal dependencies for PDF generation
RUN apk add --no-cache \
    chromium \
    nss \
    ca-certificates

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --production

# Copy built files from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["node", "server.js"]

EXPOSE 3000