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

  // cross browser event add
  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent && el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  // cross browser event remove
  function removeEvent( el, type, fn ) {
    if (el.detachEvent) {
      el.detachEvent && el.detachEvent( 'on' + type, fn );
    } else {
      el.removeEventListener( type, fn, false );
    }
  }

  function showIfVisible(img, index) {
    // 200 is the vertical offset used for preloading soon to be visible images
    if (img.getBoundingClientRect().top < winH + 200) {
      img.src = img.getAttribute(lazyAttr);
      img.removeAttribute(lazyAttr);
      // we do not use splice() as we could be in the checkImages's for loop
      imgs[index] = null;

      return true; // img shown
    } else {
      return false; // img to be shown
    }
  }

  function unsubscribe() {
    removeEvent(window, 'resize', getWindowHeightThrottle);
    removeEvent(window, 'scroll', checkImagesThrottle);
  }

  var
    lazyAttr = 'data-src',
    winH,
    imgs = [],
    pageHasLoaded,

    // cross browser window height
    getWindowHeightThrottle = throttle(function getWindowHeight() {
      winH = window.innerHeight ||
        (document.documentElement && document.documentElement.clientHeight) ||
        (document.body && document.body.clientHeight) ||
        10000;
    }, 50),

    checkImagesThrottle = throttle(function checkImages() {
      var
        last = imgs.length,
        current,
        allImagesDone = true;

      for (current = 0; current < last; current++) {
        var img = imgs[current];
        // if showIfVisible is false, it means we have some waiting images to be
        // shown
        if(img !== null && showIfVisible(img, current) === false) {
          allImagesDone = false;
        }
      }

      if (allImagesDone && pageHasLoaded) {
        unsubscribe();
      }
    }, 20);

  // Indicates that the page is optimized
  window['fstrz'] = true;
  // Import any fzns object (Fasterize Name Space)
  window['fzns'] = window['fzns'] || {
    'LL' : {
      's' : function(el) {
        // To avoid onload being called and called and called ...
        el.onload = null;
        showIfVisible(el, imgs.push(el) - 1);
      }
    }
  };

  getWindowHeightThrottle();
  addEvent(window, 'resize', getWindowHeightThrottle);
  addEvent(window, 'scroll', checkImagesThrottle);
  addEvent(window, 'load', function() {
    pageHasLoaded = true;
  });

})(this, document)
