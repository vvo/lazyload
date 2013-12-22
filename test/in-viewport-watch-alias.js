describe('lazyload(elt, cb) is an alias for in-viewport ', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var called;

  var test;

  beforeEach(function() {
    test = h.createTest({
      tagName: 'div',
      style: {
        top: '10000px'
      }
    });

    h.insertTest(test);
    lazyload(test, {
      offset: 1000
    }, function() {
      called = true;
    })
  });

  describe('scrolling 5000px', function() {
    beforeEach(h.scroller(0, 5000));

    it('callback not called', function() {
      assert(called === undefined);
    });
  });

  describe('scrolling 9000px', function() {
    beforeEach(h.scroller(0, 5000));
    beforeEach(h.wait(200));
    beforeEach(h.scroller(0, 9000));
    beforeEach(h.wait(200));

    it('callback called', function() {
      assert(called === true);
    });
  });



});