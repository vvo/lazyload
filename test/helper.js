(function(win, doc){
  var defaultAttr = 'data-src'

  win.eltNotLoaded = function eltNotLoaded(elt, lazyAttr) {
    lazyAttr = lazyAttr || defaultAttr;

    return function(done) {
      setTimeout(function() {
        assert(elt.getAttribute('onload') !== null);
        done();
      }, 25);
    }
  }

  win.eltLoaded = function eltLoaded(elt, lazyAttr) {
    lazyAttr = lazyAttr || defaultAttr;

    return function(done) {
      setTimeout(function() {
        assert(elt.getAttribute('onload') === null);
        done();
      }, 25);
    }
  }

})(window, document);