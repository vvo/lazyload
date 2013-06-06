describe('without using callbacks', function() {
  var playground = getPlayground();

  describe('when image is visible', function() {
    var result;

    before(function() {
      insert(playground, '<div id=testVisible>am I visible or what?</div>');
      result = inViewport(document.getElementById('testVisible'));
    });

    it('gives a positive result immediately', function() {
      assert(result === true);
    });
  });

  describe('when image is not visible', function() {
    var result;

    before(function() {
      insert(playground, '<div id=testNotVisible style="position:relative;top:15000px">am I visible or what?</div>');
      result = inViewport(document.getElementById('testNotVisible'));
    });

    it('gives a negative result immediately', function() {
      assert(result === false);
    });
  });

  after(clean);
});