FROM node:19-alpine
ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY gen/index.js ./index.js

EXPOSE 3000
CMD [ "node", "index.js" ]
