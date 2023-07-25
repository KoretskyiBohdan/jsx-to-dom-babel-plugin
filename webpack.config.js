const JsxToDomPlugin = require("./src/plugin");

module.exports = {
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: "babel-loader",
        include: process.cwd(),
        options: {
          plugins: [JsxToDomPlugin()],
          presets: [
            [
              "@babel/preset-env",
              {
                modules: "umd",
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    modules: [__dirname, "node_modules"],
  },
  devtool: "none",
  mode: "development",
};
