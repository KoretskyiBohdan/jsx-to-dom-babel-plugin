const STYLE = 'style';
const EVENT_REG_EXP = /^on/;

const setStyles = ($node, styles) => {
  if (typeof styles === 'string') {
    $node.style.cssText = styles;
  } else {
    for (const prop in styles) $node.style[prop] = styles[prop];
  }
  return $node;
};

const toNode = (node) => typeof node === 'object' ? node : document.createTextNode(node);


module.exports = function (tag, attributes, ...children) {
  const $node = document.createElement(tag);

  for (const name in attributes) {
    if (attributes[name] === null) continue;
    if (name === STYLE) {
      setStyles($node, attributes[name]);
    } else if (EVENT_REG_EXP.test(name)) {
      $node.addEventListener(
        name.slice(2).toLowerCase(),
        attributes[name]
      );
    } else if (name in $node) {
      $node[name] = attributes[name];
    } else {
      $node.setAttribute(name, attributes[name]);
    }
  }
  for (let i = 0; i < children.length; i++) {
    const childArr = Array.isArray(children[i]) ? children[i] : [children[i]];
    for (let j = 0; j < childArr.length; j++) {
      if (childArr[j] === null) continue;
      $node.appendChild(toNode(childArr[j]));
    }
  }
  return $node;
};
