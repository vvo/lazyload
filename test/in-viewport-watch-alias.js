describe('lazyload(elt, cb) is an alias for in-viewport ', function() {
  var called;

  var test = createTest({
    tagName: 'div',
    style: {
      position: 'relative',
      top: '10000px',
      left: 0,
      width: '1px',
      height: '1px'
    }
  });

  before(function() {
    insertTest(test);
    lazyload(test, {
      offset: 1000
    }, function() {
      called = true;
    })
  });

  describe('scrolling 5000px', function() {
    before(scroller(0, 5000));

    it('callback not called', function() {
      assert(called === undefined);
    });
  });

  describe('scrolling 9000px', function() {
    before(scroller(0, 5000));
    before(wait(600));
    before(scroller(0, 9000));
    before(wait(600));

    it('callback called', function() {
      assert(called === true);
    });
  });

  after(clean(test));

});