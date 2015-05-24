describe('giving a specific callback', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var fakeSrc = '../b.gif?'+(+new Date());
  var standardSrc = '/test/fixtures/tiny.gif?'+(+new Date());
  var hdSrc = '/test/fixtures/tiny.gif?HD&'+(+new Date());
  var lazyFunc = 'customCallback';
  var called;

  var test;
  window[lazyFunc] = true;

  beforeEach(function() {
    window[lazyFunc] = lazyload({
      src: function(elt) {
        called = true;
        return elt.getAttribute('data-hdSrc');
      }
    });

    test = h.createTest({
      tagName: 'img',
      attributes: {
        id: 'custom-callback',
        src: fakeSrc,
        'data-src': standardSrc,
        'data-hdSrc': hdSrc,
        width: 10,
        height: 10,
        onload: lazyFunc+'(this)'
      }
    });
    h.insertTest(test);
  });

  describe('after some scrolling', function() {
    beforeEach(h.scroller(0, 50));
    beforeEach(h.wait(200));
    beforeEach(h.scroller(0, 0));
    beforeEach(h.wait(200));

    it('custom callback was called', function() {
      assert(called === true);
    });

    it('loads the image when visible for a while', h.eltLoaded('custom-callback'));

    it('has loaded the hdSrc image', function() {
      assert(test.src.indexOf(hdSrc) !== -1);
    });
  });
});
