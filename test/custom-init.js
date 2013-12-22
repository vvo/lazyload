describe('an image at x0, y4000, lazyload stored as `customlzld`, 500px offset, youpikai as data-src ', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var lazyAttr = 'youpikai';
  var lazyFunc = 'customlzld';

  var fakeSrc = '../b.gif?'+(+new Date());
  var realSrc = '/test/fixtures/tiny.gif?'+(+new Date());
  var offset = 500;

  var scrollTo = 4000 -
    document.documentElement.clientHeight -
    offset;

  var test;
  window[lazyFunc] = true;

  beforeEach(function() {
    window[lazyFunc] = lazyload({
      offset: offset,
      src: lazyAttr
    });

    test = h.createTest({
      tagName: 'img',
      attributes: {
        id: 'custom-init',
        src: fakeSrc,
        'youpikai': realSrc,
        width: 10,
        height: 10,
        onload: lazyFunc + '(this)'
      },
      style: {
        top: '4000px'
      }
    });

    h.insertTest(test);
  });

  it('does not loads the image at first', h.eltNotLoaded('custom-init', lazyAttr));

  describe('when scrolling 1000 pixels', function() {
    beforeEach(h.scroller(0, 1000));

    it('does not loads the image', h.eltNotLoaded('custom-init', lazyAttr));
  });

  describe('when scrolling 1px the triggering scroll position ('+(scrollTo-1)+'px)', function() {
    beforeEach(h.scroller(0, scrollTo - 1));

    it('still does not loads the image', h.eltNotLoaded('custom-init', lazyAttr));
  });

  describe('when scrolling at the triggering scroll position ('+scrollTo+'px)', function() {
    beforeEach(h.scroller(0, scrollTo));
    beforeEach(h.wait(50));
    beforeEach(h.scroller(0, scrollTo + 1));
    beforeEach(h.wait(50));
    beforeEach(h.scroller(0, scrollTo + 10));
    beforeEach(h.wait(50));

    it('loads the image', h.eltLoaded('custom-init', lazyAttr));
  });
});