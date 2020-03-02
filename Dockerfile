# extend basic alpine image
FROM node:13.8-alpine AS builder

# inject and install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
RUN set -x && npm ci

# inject service logic
COPY . /app/

# build the application
RUN set -x && npm run build


# extend basic alpine image
FROM node:13.8-alpine

# install serve for static file serving
RUN set -x && npm install -g serve

# switch to a non-root user
USER 1000

# inject service logic
COPY --from=builder --chown=1000:0 /app/build /app/

# start the webserver on a dynamic port (as required by Heroku)
CMD ["serve", "--listen", "tcp://0.0.0.0:${PORT-3000}", "/app"]
