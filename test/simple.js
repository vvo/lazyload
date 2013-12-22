describe('a simple usage with an image', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  // not using a dataURI for IE
  var fakeSrc = '../b.gif?'+(+new Date());
  var realSrc = '/test/fixtures/tiny.gif?'+(+new Date());

  var test;

  beforeEach(function() {
    test = h.createTest({
      tagName: 'img',
      attributes: {
        id: 'simple',
        src: fakeSrc,
        'data-src': realSrc,
        width: 10,
        height: 10,
        onload: 'lzld(this)'
      }
    });
    h.insertTest(test);
  });

  it('src currently fake', function() {
    assert(test.src.indexOf('b.gif') !== -1);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, test.getAttribute('src'));
  });

  describe('after some scrolling', function() {
    beforeEach(h.scroller(0, 50));
    beforeEach(h.wait(50));
    beforeEach(h.scroller(0, 0));
    beforeEach(h.wait(50));

    it('loads the image when visible for a while', h.eltLoaded('simple'));
  });

});