//
//  LAZY Loading Images
//
//  Handles lazy loading of images in one or more targeted divs,
//  or in the entire page. It also keeps track of scrolling and
//  resizing events, and removes itself if the work is done.
//
//  Licensed under the terms of the MIT license.
//
//  (c) 2010 Balázs Galambosi
//

(function(window, document){
// glocal variables
var lazyAttr = "data-src",
    winH;

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
    el.attachEvent && el.attachEvent( "on" + type, fn );
  } else {
    el.addEventListener( type, fn, false );
  }
}

// cross browser event handling
function removeEvent( el, type, fn ) {
  if (el.detachEvent) {
    el.detachEvent && el.detachEvent( "on" + type, fn );
  } else {
    el.removeEventListener( type, fn, false );
  }
}

// cross browser window height
function getWindowHeight() {
  winH = window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    (document.body && document.body.clientHeight) ||
    10000;

  return winH;
}
var getWindowHeight = throttle(getWindowHeight, 30);

function getTopPos( el ) {
  return el.$$top || el.getBoundingClientRect().top;
}

// sorts images by their vertical positions
function img_sort( a, b ) {
  return getTopPos( a ) - getTopPos( b );
}

function LazyImg () {

  var imgs = null,    // images array (ordered)
      last = 0,    // last visible image (index)
      target = document,
      offset = 200; // prefetching vertical offset

  function destroy() {
    removeEvent( window, "scroll", fetchImages );
    removeEvent( window, "error", fetchImages );
    removeEvent( window, "resize", getWindowHeight );
  }

  function fetchImages() {
    var img, temp, len, i;

    // if it's the first time
    // initialize images array
    if ( !imgs && target ) {

      temp = target.getElementsByTagName( "img" );

      if ( temp.length ) {
        imgs = [];
        len  = temp.length;
      } else return;

      // fill the array for sorting
      for ( i = 0; i < len; i++ ) {
        img = temp[i];
        if ( img.nodeType === 1
            && img.getAttribute('src') === null
            && img.getAttribute(lazyAttr) ) {
          // store them and cache current
          // positions for faster sorting
          img.$$top = getTopPos( img );
          imgs.push( img );
        }
      }
      imgs.sort( img_sort );
    }

    // loop through the images
    while ( imgs[last] ) {

      img = imgs[last];

      // delete cached position
      if ( img.$$top ) img.$$top = null;

      // check if the img is above the fold
      if ( getTopPos( img ) < winH + offset )  {

        // then change the src
        img.src = img.getAttribute(lazyAttr);
        last++;
      }
      else return;
    }

    // we've fetched the last image -> finished
    if ( last && last === imgs.length )  {
      destroy();
    }
  }

  var fetchImages = throttle(fetchImages, 15);

  destroy();

  addEvent( window, "resize", getWindowHeight);
  addEvent( window, 'scroll', fetchImages );
  addEvent( window, 'error', fetchImages );

  getWindowHeight();
  setTimeout(fetchImages, 15);
}

// initialize
addEvent( window, "load", LazyImg);
LazyImg();

})(this, document)
