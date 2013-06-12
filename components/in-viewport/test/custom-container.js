describe('using a div as a reference container', function() {
  var test = createTest({
    style: {
      width: '10px',
      height: '100px',
      position: 'relative',
      left: '1000px',
      top: '1000px'
    }
  });

  var container = createTest({
    style: {
      width: '500px',
      height: '500px',
      overflow: 'scroll'
    }
  });
  container.innerHTML = '<div class="scrollTrigger"></div>';

  var calls = [];

  before(function() {
    insertTest(test, container);
    insertTest(container);

    inViewport(test, {
      container: container
    }, scrolledCb);
  });

  describe('when we scroll down on body', function() {
    before(scroller(10000, 10000));

    it('callback was not called', function() {
      assert(
        calls.length === 0,
        'Callback unnecessarily called'
      );
    });

    after(scroller(0, 0))
  });

  describe('when we scroll down inside the container', function() {
    before(function(cb) {
      scroller(100, 100, container, cb)
    });

    it('callback was not called', function() {
      assert(
        calls.length === 0,
        'Callback unnecessarily called'
      );
    });
  });

  describe('when we scroll down too far in the container', function() {
    before(function(cb) {
      scroller(10000, 10000, container, cb);
    });

    it('callback was not called', function() {
      assert(
        calls.length === 0,
        'Callback unnecessarily called'
      );
    });
  });

  describe('when we scroll down inside the container to the element', function() {
    before(function(cb) {
      scroller(1000, 1000, container, cb);
    });

    it('callback was called', function() {
      assert(calls.length === 1, 'We got the inViewport callback');
    });
  });

  describe('when we scroll down, up, like crazy', function() {
    before(function(cb) {
      scroller(0, 200, container, cb);
    });
    before(function(cb) {
      scroller(0, 20000, container, cb);
    });
    before(scroller(0, 0));

    it('no more callback called', function() {
      assert(calls.length === 1, 'Too much callback');
    });
  });

  function scrolledCb(result) {
    calls.push(result);
  }

  after(clean(container));
});