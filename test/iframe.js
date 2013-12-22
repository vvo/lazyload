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
        id: 'iframe',
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

    h.insertTest(test);
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
    beforeEach(h.scroller(0, 2500));
    beforeEach(h.wait(25));
    beforeEach(h.scroller(0, 5000));
    beforeEach(h.wait(200));

    it('loads the iframe', h.eltLoaded('iframe'));

    it('it has really loaded the iframe html content', function() {
      assert.equal(window.iframeLoaded, true);
    });


  });

});