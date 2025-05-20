FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy built files
COPY .next ./.next
COPY public ./public

ENV NODE_ENV=production

CMD ["npm", "run", "start"]

EXPOSE 3000