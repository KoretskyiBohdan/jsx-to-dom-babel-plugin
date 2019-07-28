const h = require('./index');
const triggerEvent = require('trigger-event');

describe('jsx-dom', () => {
  it('should create a regular div', () => {
    const $div = <div/>;

    expect($div).toEqual(document.createElement('div'));
  });

  it('should create a regular div with styles string', () => {
    const $div = <div style="padding: 10px; color: red;"/>;

    expect($div.style.padding).toEqual('10px');
    expect($div.style.color).toEqual('red');
  });

  it('should create a regular div with styles object', () => {
    const $div = <div style={{padding: '10px', color: 'red'}}/>;

    expect($div.style.padding).toEqual('10px');
    expect($div.style.color).toEqual('red');
  });

  it('should create a regular div with class and id', () => {
    const $div = <div className="test-class" id="test-id"/>;

    expect($div.className).toEqual('test-class');
    expect($div.id).toEqual('test-id');
  });

  it('should create div with attributes', () => {
    const $div = <div data-value="12" tabIndex="1" title="test-div"/>;
    const $expectDiv = document.createElement('div');

    $expectDiv.setAttribute('data-value', '12');
    $expectDiv.setAttribute('tabindex', '1');
    $expectDiv.setAttribute('title', 'test-div');

    expect($div).toEqual($expectDiv);
  });

  it('should create span with text', () => {
    const $span = <span>Test text</span>;
    const $expectSpan = document.createElement('span');

    $expectSpan.innerHTML = 'Test text';

    expect($span).toEqual($expectSpan);
  });

  it('should render array of elements', () => {
    const $element = <div>{[<span/>, <span/>]}</div>;
    const $expectedElement = document.createElement('div');

    $expectedElement.innerHTML = '<span></span><span></span>';

    expect($element).toEqual($expectedElement);
  });

  it('should create dom element with children', () => {
    const $el = (
      <div className="container">
        <h1>Highlight text</h1>
        <span>Content</span>
      </div>
    );
    const $expectEl = document.createElement('div');

    $expectEl.className = 'container';
    $expectEl.innerHTML = '<h1>Highlight text</h1><span>Content</span>';

    expect($el).toEqual($expectEl);
  });

  it('should supports dom listeners', () => {
    const spy = jasmine.createSpy('event');
    const $el = <div onClick={spy}/>;

    triggerEvent($el, 'click');

    expect(spy).toHaveBeenCalled();
  });
});
