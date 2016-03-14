describe('a simple usage with an image background', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  // not using a dataURI for IE
  var fakeSrc = '../b.gif?'+(+new Date());
  var realSrc = '/test/fixtures/tiny.gif?'+(+new Date());

  var test;

  beforeEach(function() {
    test = h.createTest({
      tagName: 'div',
      attributes: {
        id: 'simple_background',
        style: 'background-image: url(' + fakeSrc + ')',
        'data-background-src': realSrc,
        width: 10,
        height: 10
      }
    });
    lzld(test);
    h.insertTest(test);
  });

  it('background src currently fake', function() {
    assert(test.style.backgroundImage.indexOf('b.gif') !== -1);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, test.getAttribute('src'));
  });

  describe('after some scrolling', function() {
    beforeEach(h.scroller(0, 50));
    beforeEach(h.wait(50));
    beforeEach(h.scroller(0, 0));
    beforeEach(h.wait(50));

    it('loads the image when visible for a while', h.eltLoaded('simple_background'));
  });

});
