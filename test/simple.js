describe('a simple usage with an image', function() {
  var fakeSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());
  var elt;

  before(function() {
    insert(getPlayground(), getImage({
      x: 0,
      y: 0,
      realSrc: realSrc,
      fakeSrc: fakeSrc
    }));

    elt = document.getElementById('i0');
  })

  it('src currently fake', function() {
    assert.equal(fakeSrc, elt.src);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, elt.getAttribute('src'));
  });

  it('loads the image when visible for a while', eltLoaded('i0'));

  after(clean);
});