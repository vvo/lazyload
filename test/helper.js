(function(win, doc){

  win.getImage = function getImage(x, y, id, realSrc, fakeSrc) {
    var fakeSrc = fakeSrc ||
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    var realSrc = realSrc ||
      'fixtures/tiny.gif?'+(+new Date());
    var img = '<img ' +
      'src="'+fakeSrc+'"' +
      'data-src="'+realSrc+'" ' +
      'onload="lzld(this)" id="' + id + '" />';

    return img;
  }

  var oldClean = win['clean'];
  win.clean = function clean() {
    oldClean();
    delete win.lzld;
  }

})(window, document);