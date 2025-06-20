FROM node:20 AS build

WORKDIR /app
COPY . .
RUN yarn cache clean
RUN yarn install --immutable

RUN yarn build

FROM node:18-alpine

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY package*.json ./
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80

ENV HOSTNAME "0.0.0.0"
ENV PORT 80

CMD ["node", "server.js"]