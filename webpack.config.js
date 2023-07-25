const JsxToDomPlugin = require("./src/plugin");

module.exports = {
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
                useBuiltIns: "entry",
                modules: false,
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
  mode: "production",
};
