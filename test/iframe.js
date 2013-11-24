describe('lazyloading an iframe', function() {

  var fakeSrc = 'about:blank';
  var realSrc = '/test/fixtures/page.html';

  var test = createTest({
    tagName: 'iframe',
    attributes: {
      src: fakeSrc,
      'data-src': realSrc,
      width: 1,
      height: 1,
      onload: 'lzld(this)'
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
    this.timeout(10000);
    mocha.globals(['iframeLoaded']);
    before(scroller(0, 2500));
    before(wait(600));
    before(scroller(0, 5000));
    before(wait(1500));

    it('loads the iframe', eltLoaded(test));

    it('it has really loaded the iframe html content', function() {
      assert.equal(window.iframeLoaded, true);
    });

    after(clean(test));
  });

});