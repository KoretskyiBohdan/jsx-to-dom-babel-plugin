const { transformSync } = require("@babel/core");
const Plugin = require("./plugin");

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
    const expected = 'const Block = () => customPragma("div", null, "Hello");';

    expect(toCode(input)).toBe(expected);
  });

  it("should work with nested elements", () => {
    const input = "const Block = () => <div><span>Hello</span></div>";
    const expected =
      'const Block = () => customPragma("div", null, customPragma("span", null, "Hello"));';

    expect(toCode(input)).toBe(expected);
  });
});
