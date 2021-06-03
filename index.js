#!/usr/bin/env node
'use strict'

require("@babel/register")({
  extends: './babel.config.js',
  ignore: [/node_modules/],
});

require('./lib/App');