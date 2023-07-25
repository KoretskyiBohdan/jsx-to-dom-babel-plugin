"use strict";

const webpack = require("./webpack.config");

module.exports = function (config) {
  config.set({
    files: ["src/*.test.js"],
    frameworks: ["jasmine"],
    preprocessors: {
      "./**/*.test.js": ["webpack"],
    },
    reporters: ["dots"],
    browsers: ["PhantomJS"],
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-phantomjs-launcher"),
    ],
    phantomjsLauncher: { exitOnResourceError: true },
    webpack,
  });
};
