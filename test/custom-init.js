describe('an image at y + 10000 pixels, lazyloading with 1000px offset', function() {

  var lazyAttr = 'youpikai';
  var lazyFunc = 'customlzld';

  // not using a dataURI for IE
  var fakeSrc = '/b.gif?'+(+new Date());
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());

  // on IE, onload will immediately be called so init lazyload before inserting
  // the image into the DOM
  window[lazyFunc] = lazyload({
    offset: 1000,
    lazyAttr: lazyAttr
  });

  var test = createTest({
    tagName: 'img',
    attributes: {
      src: fakeSrc,
      'youpikai': realSrc,
      width: 1,
      height: 1,

      // Will be triggered on IE as soon as the image is created
      onload: lazyFunc + '(this)',
      onerror: lazyFunc + '(this)'
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

  describe('when scrolling 8000 pixels', function() {
    before(scroller(0, 8000));

    it('still does not loads the image', eltNotLoaded(test, lazyAttr));
  });

  describe('when scrolling near the offset', function() {
    before(scroller(0, 9000));

    it('loads the image', eltLoaded(test, lazyAttr));

    after(clean(test));
  });

});