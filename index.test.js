const h = require('./index');
const triggerEvent = require('trigger-event');

const createDOMFromString = (string = '') => {
  const _$wrapper = document.createElement('div');
  _$wrapper.innerHTML = string;
  return _$wrapper.firstChild;
};

describe('jsx-dom', () => {
  it('should create a regular div', () => {
    expect(<div/>)
      .toEqual(
        createDOMFromString('<div></div>')
      );
  });

  it('should create a regular div with styles string', () => {
    const $el = <div style="padding: 10px; color: red;"/>;

    expect($el.style.padding)
      .toEqual('10px');
    expect($el.style.color)
      .toEqual('red');
  });

  it('should create a regular div with styles object', () => {
    const $el = <div style={{padding: '10px', color: 'red'}}/>;

    expect($el.style.padding)
      .toEqual('10px');
    expect($el.style.color)
      .toEqual('red');
  });

  it('should create a regular div with class and id', () => {
    const $el = <div className="test-class" id="test-id"/>;

    expect($el.className)
      .toEqual('test-class');
    expect($el.id)
      .toEqual('test-id');
  });

  it('should create div with attributes', () => {
    expect(<div data-value="12" tabIndex="1" title="test-div"/>)
      .toEqual(
        createDOMFromString(
          '<div data-value="12" tabindex="1" title="test-div"></div>'
        )
      );
  });

  it('should create span with text', () => {
    expect(<span>Test text</span>)
      .toEqual(
        createDOMFromString('<span>Test text</span>')
      );
  });

  it('should render array of elements', () => {
    expect(<div>{[<span/>, <span/>]}</div>)
      .toEqual(
        createDOMFromString('<div><span></span><span></span></div>')
      );
  });

  it('should create dom element with children', () => {
    const $el = (
      <div className="container">
        <h1>Highlight text</h1>
        <span>Content</span>
      </div>
    );

    expect($el)
      .toEqual(
        createDOMFromString(
          '<div class="container"><h1>Highlight text</h1><span>Content</span></div>'
        )
      );
  });

  it('should work with falsy values', () => {
    expect(<div>{null}</div>)
      .toEqual(createDOMFromString('<div></div>'));
    expect(<div>{false}</div>)
      .toEqual(createDOMFromString('<div>false</div>'));
    expect(<div>{undefined}</div>)
      .toEqual(createDOMFromString('<div>undefined</div>'));
    expect(<div>{0}</div>)
      .toEqual(createDOMFromString('<div>0</div>'));
  });

  it('should supports dom listeners', () => {
    const spy = jasmine.createSpy('event');
    const $el = <div onClick={spy}/>;

    triggerEvent($el, 'click');
    expect(spy).toHaveBeenCalled();
  });
});
