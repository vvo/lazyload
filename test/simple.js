// Some notes on testing, we are using detached dom nodes.
// On IE, detached DOM nodes are not well handed:
// - img `onload` is triggered as soon as element is created
//    - but when src is a dataURI, no onload is triggered
// - img.getBoundingClientRect is not available when detached (in-viewport handles it)

describe('a simple usage with an image', function() {

  // not using a dataURI for IE
  var fakeSrc = '/b.gif?'+(+new Date());
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());

  var test = createTest({
    tagName: 'img',
    attributes: {
      src: fakeSrc,
      'data-src': realSrc,
      width: 1,
      height: 1,

      // Will be triggered on IE as soon as the image is created
      onload: 'lzld(this)',
      onerror: 'lzld(this)'
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

    it('loads the image when visible for a while', eltLoaded(test));

    after(clean(test));
  });

});