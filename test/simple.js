describe('lazyloading an image ', function() {
  var fakeSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  var realSrc = 'fixtures/tiny.gif?'+(+new Date);
  var img = '<img ' +
    'src="'+fakeSrc+'"' +
    'data-src="'+realSrc+'" ' +
    'onload="lzld(this)" id="testme" />';
  var elt;
  var playground = getPlayground();

  before(function() {
    window.lzld = (new Lazyload).lzld;
    insert(playground, img);
    elt = document.getElementById('testme');
  });

  it('src currently fake', function() {
    assert.equal(fakeSrc, elt.src);
  });

  it('getAttribute still gives real src', function() {
    assert.equal(realSrc, elt.getAttribute('src'));
  });

  it('loads the image after a while', function(done) {
    setTimeout(function() {
      assert(elt.src.indexOf(realSrc) !== -1);
      done();
    }, 12);
  });

  after(function(){
    delete window.lzld;
  });

  after(clean);
});