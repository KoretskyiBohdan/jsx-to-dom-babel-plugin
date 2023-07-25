const webpack = require("./webpack.config");

module.exports = function (config) {
  config.set({
    files: ["src/*.test.js"],
    frameworks: ["jasmine"],
    preprocessors: {
      "./**/*.test.js": ["webpack"],
    },
    reporters: ["dots"],
    browsers: ["ChromeHeadless"],
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
    ],
    phantomjsLauncher: { exitOnResourceError: true },
    webpack,
  });
};
