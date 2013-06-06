function testElem(x, y) {
  describe('dealing with an element located at '+x+','+y, function() {
    var $playground = getPlayground();
    var $test;
    var calls = [];

    before(function() {
      var position = 'position:relative;top:' + y + 'px;left:' + x + 'px';
      insert($playground, '<div id=testNotVisible style=' + position + ';width:10px;height:100px>t</div><div class="scrollTrigger"></div>');
      $test = document.getElementById('testNotVisible');
      inViewport($test, cb);
    });

    describe('when we scroll down a little', function() {
      before(scroller(0, 1000));

      it('callback was not called', function() {
        assert(
          calls.length === 0,
          'Callback unnecessarily called'
        );
      });
    });

    describe('when we scroll down too far', function() {
      before(scroller(x * 2, y * 2));

      it('callback is not called', function() {
        assert(calls.length === 0, 'Callback unnecessarily called');
      });
    });

    describe('when we scroll to the element', function() {
      before(scroller(x, y));

      it('callback was called', function() {
        assert(calls.length === 1, 'We got the inViewport callback');
      });
    });

    describe('when we scroll down, up, like crazy', function() {
      before(scroller(0, 200));
      before(scroller(0, 20000));
      before(scroller(0, 0));

      it('no more callback called', function() {
        assert(calls.length === 1, 'Too much callback');
      });
    });

    function cb(result) {
      calls.push(result);
    }

  });

  after(clean);
}

testElem(0, 10000);
testElem(10000, 10000);