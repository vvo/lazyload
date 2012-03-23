(function(window, document){

  var
    // Vertical offset in px. Used for preloading images while scrolling
    offset = 200,
    //where to get real src
    lazyAttr = 'data-src',
    // Window height
    winH,
    // Self-populated page images array, we do not getElementsByTagName
    imgs = [],
    pageHasLoaded,

    // throttled functions, so that we do not call them too much
    getWindowHeightT = throttle(getWindowHeight, 50),
    showImagesT = throttle(showImages, 20);

  // Called from every lazy <img> onload event
  window['lzld'] = onload;

  // init
  getWindowHeight();
  addEvent(window, 'resize', getWindowHeightT);
  addEvent(window, 'scroll', showImagesT);
  addEvent(window, 'load', function() {
    pageHasLoaded = true;
  });

  // Functions

  function onload(img) {
    // To avoid onload being called and called and called ...
    img.onload = null;

    // TODO : handle the case where we insert an image that will not be shown
    // and we unsubscribed
    showIfVisible(img, imgs.push(img) - 1);
  }

  // restrict some function calls
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

  // img = dom element
  // index = imgs array index
  function showIfVisible(img, index) {
    if (img.getBoundingClientRect().top < winH + offset) {
      img.src = img.getAttribute(lazyAttr);
      img.removeAttribute(lazyAttr);
      imgs[index] = null;
      return true; // img shown
    } else {
      return false; // img to be shown
    }
  }

  // cross browser window height
  function getWindowHeight() {
    winH = window.innerHeight ||
      (document.documentElement && document.documentElement.clientHeight) ||
      (document.body && document.body.clientHeight) ||
      10000;
  }

  function showImages() {
    var
      last = imgs.length,
      current,
      allImagesDone = true;

    for (current = 0; current < last; current++) {
      var img = imgs[current];
      // if showIfVisible is false, it means we have some waiting images to be
      // shown
      if(img !== null && !showIfVisible(img, current)) {
        allImagesDone = false;
      }
    }

    if (allImagesDone && pageHasLoaded) {
      unsubscribe();
    }
  }

  // TODO : handle the case where we unsubscribed but a new image got inserted, like
  // a waiting invisible javascript dom string
  function unsubscribe() {
    removeEvent(window, 'resize', getWindowHeightT);
    removeEvent(window, 'scroll', showImagesT);
  }

})(this, document)
