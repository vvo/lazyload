describe('using offsets', function() {
  function testElemOffset(x, y, offset) {
    describe(offset+' offset with an element at '+x+','+y, function() {
      var test = createTest({
        style: {
          width: 0,
          height: 0,
          position: 'relative',
          left: x +  'px',
          top: y + 'px'
        }
      });

      var calls = [];

      // at this scroll position, element should be shown
      var scrollTo = y -
        document.documentElement.clientHeight -
        offset;

      before(function() {
        insertTest(test);
        inViewport(test, { offset: offset }, cb);
      });

      describe('when we scroll down a little too low (' + (scrollTo-1) + 'px)', function() {

        before(scroller(0, scrollTo - 1));

        it('callback was not called', function() {
          assert(
            calls.length === 0,
            'Callback unnecessarily called'
          );
        });
      });

      describe('when we scroll down at the exact position (' + scrollTo + 'px)', function() {

        before(scroller(0, scrollTo));

        it('callback was called', function() {
          assert(
            calls.length === 1,
            'Callback unnecessarily called'
          );
        });
      });

      after(clean(test));

      function cb(result) {
        calls.push(result);
      }
    });
  }

  testElemOffset(0, 10000, 200);
  testElemOffset(0, 10000, 1500);
});