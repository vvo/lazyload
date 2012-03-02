(function(window, document){

  function throttle(fn, minDelay) {
    var lastCall = 0;
    return function() {
      var now = +new Date;
      if (now - lastCall < minDelay) {
        return;
      }
      lastCall = now;
      // we do not return anything as
      // https://github.com/documentcloud/underscore/issues/387
      fn.apply(this, arguments);
    }
  }

  // cross browser event handling
  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent && el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  // cross browser event handling
  function removeEvent( el, type, fn ) {
    if (el.detachEvent) {
      el.detachEvent && el.detachEvent( 'on' + type, fn );
    } else {
      el.removeEventListener( type, fn, false );
    }
  }

  // glocal variables
  var
    lazyAttr = 'data-src',
    offset = 200,
    winH,

    // cross browser window height
    getWindowHeight = throttle(function getWindowHeight() {
      winH = window.innerHeight ||
        (document.documentElement && document.documentElement.clientHeight) ||
        (document.body && document.body.clientHeight) ||
        10000;
    }, 30),

    checkImages = throttle(function checkImages() {
      var imgs = document.getElementsByTagName('img'),
        last = imgs.length,
        current;

      for (current = 0; current < last; current++) {
        showIfVisible(imgs[current]);
      }
    }, 30);

  function showIfVisible(el) {
    if (el.getAttribute(lazyAttr) !== null && el.getBoundingClientRect().top < winH + offset) {
      el.src = el.getAttribute(lazyAttr);
      el.removeAttribute(lazyAttr);
    }
  }

  getWindowHeight();
  addEvent(window, 'resize', getWindowHeight);
  addEvent(window, 'scroll', checkImages);

})(this, document)
