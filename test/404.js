// https://github.com/vvo/lazyload/issues/62
describe('when an image resolves to 404', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var fakeSrc = '../b.gif?'+(+new Date());
  var standardSrc = '/IDONOTEXISTSLOL.gif?'+(+new Date());
  var lazyFunc = 'customCallback';
  var calls = 0;

  var test;
  window[lazyFunc] = true;

  beforeEach(function() {
    window[lazyFunc] = lazyload({
      src: function(elt) {
        calls++;
        return elt.getAttribute('data-src');
      }
    });

    test = h.createTest({
      tagName: 'img',
      attributes: {
        id: 'custom-callback',
        src: fakeSrc,
        'data-src': standardSrc,
        width: 10,
        height: 10,
        onload: lazyFunc+'(this)',
        onerror: lazyFunc+'(this)',
      }
    });
    h.insertTest(test);
  });

  describe('after some scrolling', function() {
    beforeEach(h.scroller(0, 50));
    beforeEach(h.wait(200));
    beforeEach(h.scroller(0, 0));
    beforeEach(h.wait(200));

    it('custom callback was called only once (no infinite loop)', function() {
      assert.equal(calls, 1, 'We should have called the callback only once');
    });
  });
});
