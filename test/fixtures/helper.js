module.exports = {
  eltNotLoaded: eltNotLoaded,
  eltLoaded: eltLoaded
}

var defaultAttr = 'data-src'

function eltNotLoaded(id, lazyAttr) {
  lazyAttr = lazyAttr || defaultAttr;

  return function(done) {
    var elt = document.getElementById(id);
    setTimeout(function() {
      assert(elt['data-lzled'] === undefined);
      done();
    }, 25);
  }
}

function eltLoaded(id, lazyAttr) {
  lazyAttr = lazyAttr || defaultAttr;

  return function(done) {
    var elt = document.getElementById(id);
    setTimeout(function() {
      assert(elt.getAttribute('data-lzled') === 'true');
      done();
    }, 40);
  };
}

