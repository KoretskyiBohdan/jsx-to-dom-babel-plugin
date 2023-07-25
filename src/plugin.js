const transformReactJsxPlugin = require("babel-plugin-transform-react-jsx");
const { pragmaFnName } = require("./constants");

module.exports = function plugin() {
  return [transformReactJsxPlugin, { pragma: pragmaFnName }];
};
