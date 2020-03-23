# extend basic alpine image
FROM node:13.8-alpine

ARG NODE_AUTH_TOKEN

# install serve for static file serving
RUN set -x && npm install -g serve

# inject and install dependencies
COPY package.json package-lock.json .npmrc /app/
WORKDIR /app
RUN set -x && npm ci

# inject service logic
COPY . /app/

# build the application
RUN set -x && npm run build

# switch to a non-root user
USER 1000

# inject startup script
COPY --chown=1000:0 serve.sh /serve.sh
RUN set -x && chmod u+x /serve.sh

# start the webserver on a dynamic port (as required by Heroku)
CMD ["/serve.sh"]
