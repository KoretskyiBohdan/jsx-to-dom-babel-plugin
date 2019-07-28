'use strict';
const files = ['./index.test.js'];
const frameworks = ['jasmine'];
const preprocessors = {
  './index.test.js': ['webpack']
};
const reporters = ['dots'];
const browsers = ['PhantomJS'];
const webpack = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'babel-loader',
        include: process.cwd(),
        options: {
          plugins: [
            ['babel-plugin-transform-react-jsx', {'pragma': 'h'}]
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                modules: false
              }
            ]
          ]
        }
      }
    ]
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ]
  },
  devtool: 'none',
  mode: 'production'
};
const plugins = [
  require('karma-webpack'),
  require('karma-jasmine'),
  require('karma-phantomjs-launcher')
];
const phantomjsLauncher = {exitOnResourceError: true};

module.exports = function (config) {
  config.set({
    files,
    frameworks,
    preprocessors,
    reporters,
    browsers,
    webpack,
    plugins,
    phantomjsLauncher
  });
};
