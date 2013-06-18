(function(win, doc){
  var defaultAttr = 'data-src'

  win.eltNotLoaded = function eltNotLoaded(elt, lazyAttr) {
    lazyAttr = lazyAttr || defaultAttr;

    return function(done) {
      setTimeout(function() {
        assert(elt['data-lzled'] === undefined);
        done();
      }, 25);
    }
  }

  win.eltLoaded = function eltLoaded(elt, lazyAttr) {
    lazyAttr = lazyAttr || defaultAttr;

    return function(done) {
      setTimeout(function() {
        assert(elt['data-lzled'] === true);
        done();
      }, 25);
    }
  }

})(window, document);