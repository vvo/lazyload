describe('using data-uris as image sources', function() {
  // using a data-uri, will fail on IE, it does not triggers onload
  var fakeSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());

  var test = createTest({
    tagName: 'img',
    attributes: {
      src: fakeSrc,
      'data-src': realSrc,
      width: 1,
      height: 1,
      onload: 'lzld(this)'
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

  it('src currently fake', function() {
    assert(test.src.indexOf(fakeSrc) !== -1);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, test.getAttribute('src'));
  });

  // ON IE, since the onload was triggered too early, we need to force in-viewport to check
  // again for visibility
  describe('after some scrolling', function() {

    // on anything but IE, this scroll is not needed
    before(scroller(1, 1));
    before(scroller(5, 5));
    before(scroller(1, 1));

    it('loads the image when visible for a while', eltLoaded(test));

    after(clean(test));
  });

});