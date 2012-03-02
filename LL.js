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
    winH,
    pageHasLoaded,

    // cross browser window height
    getWindowHeightThrottle = throttle(function getWindowHeight() {
      winH = window.innerHeight ||
        (document.documentElement && document.documentElement.clientHeight) ||
        (document.body && document.body.clientHeight) ||
        10000;
    }, 77),

    checkImagesThrottle = throttle(function checkImages() {
      var
        imgs = document.getElementsByTagName('img'),
        last = imgs.length,
        current,
        allImagesDone = true;

      for (current = 0; current < last; current++) {
        // if showIfVisible is false, it means we have some waiting images to be
        // shown
        if(showIfVisible(imgs[current]) === false) {
          allImagesDone = false;
        }
      }

      if (allImagesDone && pageHasLoaded) {
        unsubscribe();
      }
    }, 77);

  function showIfVisible(el) {
    if (el.getAttribute(lazyAttr) === null) {
      // img already shown
      return true;
    }

    // 200 is the vertical offset used for preloading soon to be visible images
    if (el.getBoundingClientRect().top < winH + 200) {
      el.src = el.getAttribute(lazyAttr);
      el.removeAttribute(lazyAttr);
      // img shown
      return true;
    } else {
      // img to be shown
      return false;
    }
  }

  function unsubscribe() {
    removeEvent(window, 'resize', getWindowHeightThrottle);
    removeEvent(window, 'scroll', checkImagesThrottle);
  }

  getWindowHeightThrottle();
  addEvent(window, 'resize', getWindowHeightThrottle);
  addEvent(window, 'scroll', checkImagesThrottle);
  addEvent(window, 'load', function() {
    pageHasLoaded = true;
  });

  // Indicates that the page is optimized
  window['fstrz'] = true;

  // Import any fzns object
  window['fzns'] = window['fzns'] || {};

  // Export and creates LL.show() to be used by <img onload=/>
  window['fzns']['LL'] = {
    's': showIfVisible
  };

})(this, document)
