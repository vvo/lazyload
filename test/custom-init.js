describe('an image at x0, y10000, lazyload stored as `customlzld`, 1000px offset, youpikai as data-src ', function() {

  var lazyAttr = 'youpikai';
  var lazyFunc = 'customlzld';

  var fakeSrc = '../b.gif?'+(+new Date());
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());
  var offset = 1000;

  var scrollTo = 10000 -
    document.documentElement.clientHeight -
    offset;

  // on IE, onload will immediately be called so init lazyload before inserting
  // the image into the DOM
  window[lazyFunc] = lazyload({
    offset: offset,
    src: lazyAttr
  });

  var test = createTest({
    tagName: 'img',
    attributes: {
      src: fakeSrc,
      'youpikai': realSrc,
      width: 1,
      height: 1,
      onload: lazyFunc + '(this)'
    },
    style: {
      position: 'relative',
      top: '10000px',
      left: 0
    }
  });

  before(function() {
    insertTest(test);
  });

  it('does not loads the image at first', eltNotLoaded(test, lazyAttr));

  describe('when scrolling 1000 pixels', function() {
    before(scroller(0, 1000));

    it('does not loads the image', eltNotLoaded(test, lazyAttr));
  });

  describe('when scrolling 1px the triggering scroll position ('+(scrollTo-1)+'px)', function() {
    before(scroller(0, scrollTo - 1));

    it('still does not loads the image', eltNotLoaded(test, lazyAttr));
  });

  describe('when scrolling at the triggering scroll position ('+scrollTo+'px)', function() {
    before(scroller(0, scrollTo));

    it('loads the image', eltLoaded(test, lazyAttr));
  });

  after(clean(test));
});