FROM node:20-alpine

# Install minimal dependencies for PDF generation
RUN apk add --no-cache \
    chromium \
    nss \
    ca-certificates

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy built files
COPY .next ./.next
COPY public ./public

CMD ["npm", "run", "start"]

EXPOSE 3000