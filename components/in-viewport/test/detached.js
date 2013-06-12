describe('detached DOM node', function() {
  var visible = false;
  var test = createTest();

  before(function() {
    inViewport(test, function() {
      visible = true;
    });
  });

  it('callback not called', function() {
    assert(visible === false);
  });

  describe('when we insert it into DOM', function() {

    before(function() {
      insertTest(test);
    });

    before(wait(50));

    it('callback still not called', function() {
      // because no event (scroll) triggered a watch
      assert(visible === false);
    });
  });

  describe('when we scroll a little', function() {
    before(scroller(0, 1));
    before(scroller(0, 0));

    it('callback was called', function() {
      assert(visible === true);
    })
  });

  // after(clean(test));
});