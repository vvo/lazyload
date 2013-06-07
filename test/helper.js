(function(win, doc){
  var defaultAttr = 'data-src'

  win.getImage = function getImage(params) {
    params.x = params.x || 0;
    params.y = params.y || 0;
    params.lzld = params.lzld || 'lzld';
    params.lazyAttr = params.lazyAttr || defaultAttr;
    params.id = params.id || 'i0';
    params.fakeSrc = params.fakeSrc ||
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    params.realSrc = params.realSrc ||
      'fixtures/tiny.gif?'+(+new Date());

    return '<img ' +
      'src="'+params.fakeSrc+'" ' +
      'style="position:relative;top: ' + params.y + 'px;left:' + params.x + 'px"' +
      params.lazyAttr + '="' + params.realSrc + '" ' +
      'width=1 height=1 ' +
      'onload="' + params.lzld + '(this)" ' +
      'onerror="' + params.lzld + '(this)" ' +
      'id="' + params.id + '" />';
  }

  win.eltNotLoaded = function eltNotLoaded(eltId, lazyAttr) {
    lazyAttr = lazyAttr || defaultAttr;

    return function(done) {
      setTimeout(function() {
        assert(document.getElementById(eltId).getAttribute(lazyAttr) !== null);
        done();
      }, 25);
    }
  }

  win.eltLoaded = function eltLoaded(eltId, lazyAttr) {
    lazyAttr = lazyAttr || defaultAttr;

    return function(done) {
      setTimeout(function() {
        assert(document.getElementById(eltId).getAttribute(lazyAttr) === null);
        done();
      }, 25);
    }
  }

  var oldClean = win['clean'];
  win.clean = function clean() {
    oldClean();
  }

})(window, document);