describe('using a div as a reference container', function() {
  // not using a dataURI for IE
  var fakeSrc = '/b.gif?'+(+new Date());
  var realSrc = 'fixtures/tiny.gif?'+(+new Date());

  var container = createTest({
    style: {
      width: '500px',
      height: '500px',
      overflow: 'scroll'
    }
  });
  container.innerHTML = '<div class="scrollTrigger"></div>';

  window['customContainerLzld'] = lazyload({container: container});
  var test = createTest({
    tagName: 'img',
    attributes: {
      src: fakeSrc,
      'data-src': realSrc,
      width: 10,
      height: 100,
      onload: 'customContainerLzld(this)',
      onerror: 'customContainerLzld(this)'
    },
    style: {
      position: 'relative',
      top: '1000px',
      left: '1000px'
    }
  });

  before(function() {
    insertTest(test, container);
    insertTest(container);
  });

  describe('when we scroll down on body', function() {
    before(scroller(1000, 1000));

    it('does not loads the image', eltNotLoaded(test));

    after(scroller(0, 0));
  });

  describe('when we scroll down to 100, 100 inside the container', function() {
    before(function(cb) {
      scroller(100, 100, container, cb)
    });

    it('does not loads the image', eltNotLoaded(test));
  });

  describe('when we scroll down too far at 10000, 10000 inside the container', function() {
    before(function(cb) {
      scroller(10000, 10000, container, cb);
    });

    it('does not loads the image', eltNotLoaded(test));
  });

  describe('when we scroll down inside the container to the element', function() {
    before(function(cb) {
      scroller(1050, 1050, container, cb);
    });

    it('loads the image', eltLoaded(test));
  });

  after(clean(container));
});