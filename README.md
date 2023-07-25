# JSX to DOM.

##### Plugin which use [babel-plugin-transform-react-jsx](https://www.npmjs.com/package/babel-plugin-transform-react-jsx) under the hood.
##### It allows to create a regular dom elements from JSX syntax (useful for any non-react env if you want to use JSX syntax)

## Setup
```js
const JsxToDomPlugin = require("./src/plugin");

const webpack = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: "babel-loader",
        options: {plugins: [JsxToDomPlugin()]},
      },
    ],
  },
};
```
## Example:
<b>createDOM</b> is a runtime function which will resolve params as real DOM elements. <br/>
You can consider it as a [pragma function](https://www.npmjs.com/package/babel-plugin-transform-react-jsx#pragma) for "transform-react-jsx"
### In
```js
const markup = (
  <div className="block">
    <p>Some title</p>
    <a href="link">Click me</a>
  </div>
);
```

### Out
```js
// Will be transformed into:
const markup = createDOM("div", { className: "block" },
  createDOM("p", null, "Some title"),
  createDOM("a", { href: "link" }, "Click me")
);
```
