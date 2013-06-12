describe('without using callbacks', function() {

  describe('when image is visible', function() {
    var result;
    var test = createTest();

    before(function() {
      insertTest(test);
      result = inViewport(test);
    });

    it('gives a positive result immediately', function() {
      assert(result === true);
    });

    after(clean(test));
  });

  describe('when image is not visible', function() {
    var result;
    var test = createTest({
      style: {
        position: 'relative',
        top: '15000px'
      }
    });

    before(function() {
      insertTest(test);
      result = inViewport(test);
    });

    it('gives a negative result immediately', function() {
      assert(result === false);
    });

    after(clean(test));
  });

});