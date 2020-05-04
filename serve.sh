#!/bin/sh -ex

serve --listen tcp://0.0.0.0:${PORT-3000} /app/build
