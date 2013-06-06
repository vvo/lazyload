(function(win, doc){

  win.getImage = function getImage(params) {

    params.x = params.x || 0;
    params.y = params.y || 0;
    params.lzld = params.lzld || 'lzld';
    params.lazyAttr = params.lazyAttr || 'data-src';
    params.id = params.id || 'i0';
    params.fakeSrc = params.fakeSrc ||
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    params.realSrc = params.realSrc ||
      'fixtures/tiny.gif?'+(+new Date());

    return '<img ' +
      'src="'+params.fakeSrc+'" ' +
      'style="position:relative;top: ' + params.y + 'px;left:' + params.x + 'px"' +
      params.lazyAttr + '="' + params.realSrc + '" ' +
      'onload="' + params.lzld + '(this)" ' +
      'onerror="' + params.lzld + '(this)" ' +
      'id="' + params.id + '" />';
  }

  var oldClean = win['clean'];
  win.clean = function clean() {
    oldClean();
  }

})(window, document);