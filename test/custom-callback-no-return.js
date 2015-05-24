describe('giving a specific callback with no default return', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var standardSrc = '/test/fixtures/tiny.gif?'+(+new Date());
  var hdSrc = '/test/fixtures/tiny.gif?HD&'+(+new Date());
  var lazyFunc = 'customCallbackNoReturn';
  var called;

  var test;
  window[lazyFunc] = true;

  beforeEach(function() {
    window[lazyFunc] = lazyload({
      src: function(elt) {
        called = true;
      }
    });

    test = h.createTest({
      tagName: 'img',
      attributes: {
        src: standardSrc,
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

    it('src was not changed', function() {
      assert(test.src.indexOf(standardSrc) !== -1);
    });
  });
});
