describe('using a div as a reference container', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var fakeSrc = '../b.gif?'+(+new Date());
  var realSrc = '/test/fixtures/tiny.gif?'+(+new Date());

  var container;
  var test;
  window['customContainerLzld'] = true;

  beforeEach(function() {

    container = h.createTest({
      attributes: {
        id: 'container'
      },
      style: {
        width: '500px',
        height: '500px',
        overflow: 'scroll'
      }
    });
    container.innerHTML = '<div class="scrollTrigger"></div>';
    h.insertTest(container);
    window['customContainerLzld'] = lazyload({container: document.getElementById('container')});

    test = h.createTest({
      tagName: 'img',
      attributes: {
        id: 'custom-container',
        src: fakeSrc,
        'data-src': realSrc,
        width: 10,
        height: 100,
        onload: 'customContainerLzld(this)'
      },
      style: {
        top: '1000px',
        left: '1000px'
      }
    });

    h.insertTest(test, container);
  });

  describe('when we scroll down on body', function() {
    beforeEach(h.scroller(1000, 1000));

    it('does not loads the image', h.eltNotLoaded('custom-container'));
  });

  describe('when we scroll down to 100, 100 inside the container', function() {
    beforeEach(function(cb) {
      h.scroller(100, 100, container, cb)
    });

    it('does not loads the image', h.eltNotLoaded('custom-container'));
  });

  describe('when we scroll down too far at 10000, 10000 inside the container', function() {
    beforeEach(h.scroller(10000, 10000, 'container'));

    it('does not loads the image', h.eltNotLoaded('custom-container'));
  });

  describe('when we scroll down inside the container to the element', function() {
    beforeEach(h.scroller(1000, 1000, 'container'));
    beforeEach(h.scroller(1005, 1005, 'container'));

    it('loads the image', h.eltLoaded('custom-container'));
  });
});