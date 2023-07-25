const { transformSync } = require("@babel/core");
const Plugin = require("./plugin");
const { pragmaFnName } = require("./constants");

const toCode = (value) => {
  const { code } = transformSync(value, {
    retainLines: true,
    plugins: [Plugin()],
  });

  return code;
};

describe("plugin", () => {
  it("should transform code", () => {
    const input = "const Block = () => <div>Hello</div>";
    const expected = `const Block = () => ${pragmaFnName}("div", null, "Hello");`;

    expect(toCode(input)).toBe(expected);
  });

  it("should work with nested elements", () => {
    const input = "const Block = () => <div><span>Hello</span></div>";
    const expected = `const Block = () => ${pragmaFnName}("div", null, ${pragmaFnName}("span", null, "Hello"));`;

    expect(toCode(input)).toBe(expected);
  });
});
