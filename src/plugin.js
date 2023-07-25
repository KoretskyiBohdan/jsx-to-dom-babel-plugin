const transformReactJsxPlugin = require("babel-plugin-transform-react-jsx");

module.exports = function plugin() {
  return [transformReactJsxPlugin, { pragma: "customPragma" }];
};
