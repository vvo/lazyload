describe('an image at y + 10000 pixels, lazyloading with 1000px offset', function() {
  var elt;
  var lazyAttr = 'youpikai';

  before(function() {
    window.customlzld = lazyload({
      offset: 1000,
      lazyAttr: lazyAttr
    });

    insert(getPlayground(), getImage({
      x: 0,
      y: 10000,
      lzld: 'customlzld',
      lazyAttr: 'youpikai'
    }));

    elt = document.getElementById('i0');
  })


  it('does not loads the image at first', eltNotLoaded('i0', lazyAttr));

  describe('when scrolling 8000 pixels', function() {
    before(scroller(0, 8000));

    it('still does not loads the image', eltNotLoaded('i0', lazyAttr));
  });

  describe('when scrolling near the offset', function() {
    before(scroller(0, 9000));

    it('loads the image', eltLoaded('i0', lazyAttr));
  });

  after(clean);
});