const STYLE = "style";
const EVENT_REG_EXP = /^on/;

/**
 * It converts input to textNode if it isn't a DOM node
 *
 * @param {DOMNode|string} input - data to transform
 * @returns {DOMNode|TextNode} - current node
 */
const toNode = (input) =>
  input instanceof HTMLElement ? input : document.createTextNode(input);

/**
 * It applies style to DOM node
 *
 * @param {DOMNode} $node - element
 * @param {object|string} styles - styles
 * @returns {DOMNode} - current node
 */
const applyStyle = ($node, styles) => {
  if (typeof styles === "string") {
    $node.style.cssText = styles;
  } else {
    for (const prop in styles) $node.style[prop] = styles[prop];
  }
  return $node;
};

/**
 * It applies specify event listener to DOM node
 *
 * @param {DOMNode} $node - element
 * @param {string} name - event name with "on" prefix
 * @param {function} cb - listener
 * @returns {DOMNode} - current node
 */
const applyListener = ($node, name, cb) => {
  // We should get rid of "on" prefix and normalize event name
  const eventName = name.slice(2).toLowerCase();
  $node.addEventListener(eventName, cb);
  return $node;
};

/**
 * It applies children to DOM node
 *
 * @param {DOMNode} $node - element
 * @param {array} children - list of child dom nodes
 * @returns {DOMNode} - current node
 */
const appendChildren = ($node, children) => {
  for (let i = 0; i < children.length; i++) {
    // In JSX one child can be an array of multiple elements.
    // So we have to deal with it
    const childArr = Array.isArray(children[i]) ? children[i] : [children[i]];
    for (let j = 0; j < childArr.length; j++) {
      if (childArr[j] === null) continue;
      $node.appendChild(toNode(childArr[j]));
    }
  }
  return $node;
};

/**
 * Standart pragma function which returns real DOM nodes
 *
 * @param {string} tag - tagname
 * @param {object} attributes - all received properties
 * @param {array} children - nestled DON nodes
 * @returns {DOMNode} - current node
 */
module.exports = function (tag, attributes, ...children) {
  const $node = document.createElement(tag);

  for (const name in attributes) {
    if (name === STYLE) {
      applyStyle($node, attributes[name]);
    } else if (EVENT_REG_EXP.test(name)) {
      applyListener($node, name, attributes[name]);
    } else if (name in $node) {
      $node[name] = attributes[name];
    } else if (attributes[name] !== null) {
      $node.setAttribute(name, attributes[name]);
    }
  }
  appendChildren($node, children);
  return $node;
};
