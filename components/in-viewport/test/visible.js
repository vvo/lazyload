describe('asking if a visible div scrolled', function() {
  var scrolled = false;
  var test = createTest();

  before(function(done) {
    insertTest(test);
    inViewport(test, function() {
      scrolled = true;
      done();
    });
  });

  it('callback called', function() {
    assert(scrolled === true);
  });

  after(clean(test));
});