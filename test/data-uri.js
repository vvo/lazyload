describe('using data-uris as image sources', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  // using a data-uri, will fail on IE, it does not triggers onload
  var fakeSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  var realSrc = '/test/fixtures/tiny.gif?'+(+new Date());

  var test;

  beforeEach(function() {
    test = h.createTest({
      tagName: 'img',
      attributes: {
        'id': 'data-uri',
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

    h.insertTest(test);
  });

  it('src currently fake', function() {
    assert(test.src.indexOf(fakeSrc) !== -1);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, test.getAttribute('src'));
  });

  describe('after some scrolling', function() {

    it('loads the image when visible for a while', h.eltLoaded('data-uri'));

  });

});