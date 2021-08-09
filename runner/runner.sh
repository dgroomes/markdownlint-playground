#!/usr/bin/env bash
# This file is the shell runner script to run the "runner" program! Phew! That's a lot of runners.

node src/index.js "$@" | less
