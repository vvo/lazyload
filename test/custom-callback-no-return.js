describe('giving a specific callback with no default return', function() {
  var standardSrc = '/test/fixtures/tiny.gif?'+(+new Date());
  var hdSrc = '/test/fixtures/tiny.gif?HD&'+(+new Date());
  var lazyFunc = 'customCallbackNoReturn';
  var called;

  window[lazyFunc] = lazyload({
    src: function(elt) {
      called = true;
    }
  });

  var test = createTest({
    tagName: 'img',
    attributes: {
      src: standardSrc,
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

    it('src was not changed', function() {
      assert(test.src.indexOf(standardSrc) !== -1);
    });

    after(clean(test));
  });

});