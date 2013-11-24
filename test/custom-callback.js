describe('giving a specific callback', function() {
  var fakeSrc = '../b.gif?'+(+new Date());
  var standardSrc = '/test/fixtures/tiny.gif?'+(+new Date());
  var hdSrc = '/test/fixtures/tiny.gif?HD&'+(+new Date());
  var lazyFunc = 'customCallback';
  var called;

  window[lazyFunc] = lazyload({
    src: function(elt) {
      called = true;
      return elt.getAttribute('data-hdSrc');
    }
  });

  var test = createTest({
    tagName: 'img',
    attributes: {
      src: fakeSrc,
      'data-src': standardSrc,
      'data-hdSrc': hdSrc,
      width: 1,
      height: 1,
      onload: lazyFunc+'(this)'
    },
    style: {
      position: 'relative',
      top: 0,
      left: 0
    }
  });

  before(function() {
    insertTest(test);
  });

  describe('after some scrolling', function() {
    before(scroller(1, 1));
    before(wait(600));
    before(scroller(1, 1));
    before(wait(600));

    it('custom callback was called', function() {
      assert(called === true);
    });

    it('loads the image when visible for a while', eltLoaded(test));

    it('has loaded the hdSrc image', function() {
      assert(test.src.indexOf(hdSrc) !== -1);
    });

    after(clean(test));
  });

});