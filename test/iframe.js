describe('lazyloading an iframe', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var fakeSrc = 'about:blank';
  var realSrc = '/test/fixtures/page.html';

  var test;

  beforeEach(function() {
    test = h.createTest({
      tagName: 'iframe',
      attributes: {
        id: 'iframetest',
        src: fakeSrc,
        'data-src': realSrc,
        width: 10,
        height: 10,
        onload: 'lzld(this)'
      },
      style: {
        top: '5000px'
      }
    });

    h.insertTest(test);
  });

  it('src currently fake', function() {
    assert(test.src.indexOf(fakeSrc) !== -1);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, test.getAttribute('src'));
  });

  describe('scrolling to its position', function() {
    mocha.globals(['iframetest', 'navigator']);
    this.timeout(10000);
    beforeEach(h.scroller(0, 2500));
    beforeEach(h.wait(200));
    beforeEach(h.scroller(0, 5000));
    beforeEach(h.wait(600));

    it('loads the iframe', h.eltLoaded('iframetest'));
  });

});