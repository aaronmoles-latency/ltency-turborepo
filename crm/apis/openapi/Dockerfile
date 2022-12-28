FROM node:19-alpine
ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY dist/index.js .
COPY package.json .

EXPOSE 3000
CMD [ "node", "index.js" ]
