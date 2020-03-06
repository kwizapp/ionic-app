#!/bin/sh -ex

serve --listen tcp://0.0.0.0:${PORT-8001} /app/build
