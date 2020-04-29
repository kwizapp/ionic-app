# extend basic alpine image
FROM node:14-alpine

ARG NODE_AUTH_TOKEN

# install serve for static file serving
RUN set -x && npm install -g serve

# inject and install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
COPY .npmrc.ci .npmrc
RUN set -x && npm ci

# inject service logic
COPY . /app/

# build the application
RUN set -x && npm run build

# inject startup script
COPY --chown=1000:0 serve.sh /serve.sh
RUN set -x && chmod u+x /serve.sh

# switch to a non-root user
USER 1000

# start the webserver on a dynamic port (as required by Heroku)
CMD ["/serve.sh"]
