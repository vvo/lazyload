describe('lazyloading an image ', function() {
  var fakeSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());
  var elt;
  var playground = getPlayground();

  before(function() {
    insert(playground, getImage(0, 0, 'i0', realSrc, fakeSrc));
    elt = document.getElementById('i0');
  });

  it('src currently fake', function() {
    assert.equal(fakeSrc, elt.src);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, elt.getAttribute('src'));
  });

  it('loads the image when visible for a while', function(done) {
    setTimeout(function() {
      assert(elt.src.indexOf(realSrc) !== -1);
      done();
    }, 12);
  });

  after(clean);
});