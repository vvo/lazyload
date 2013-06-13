describe('lazyloading an iframe', function() {

  // not using a dataURI for IE
  var fakeSrc = 'about:blank';
  var realSrc = 'fixtures/page.html';

  var test = createTest({
    tagName: 'iframe',
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
      top: '5000px',
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

  describe('scrolling to its position', function() {
    before(scroller(0, 2500));
    before(scroller(0, 5000));

    it('loads the iframe', eltLoaded(test));

    it('it has really loaded the iframe html content', function() {
      assert.equal(window.iframeLoaded, true);
    });

    after(function() {
      try {
        delete window.iframeLoaded;
      } catch (e) {
        window.iframeLoaded = undefined;
      }
    })

    after(clean(test));
  });

});