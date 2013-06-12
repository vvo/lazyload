(function(window, document){

  var pageHasLoaded = false;
  var lazyAttrs = ['data-src'];

  window['lazyload'] = lazyload;
  window['lzld'] = lzld();

  addEvent(window, 'load', function() {
    pageHasLoaded = true;
  });

  // Provide libs using getAttribute early to get the good src
  if ('HTMLImageElement' in window) {
    replaceGetAttribute();
  }

  function registerLazyAttr(attr) {
    if (indexOf.call(lazyAttrs, attr) === -1) {
      lazyAttrs.push(attr);
    }
  }

  function lzld() {
    var instance;

    return function(element) {
      if (instance === undefined) {
        instance = lazyload();
      }

      instance(element);
    }
  }

  function lazyload(opts) {

    opts = merge({
      'offset': 200,
      'lazyAttr': 'data-src',
      'container': false,
      'cb': false
    }, opts || {});

    registerLazyAttr(opts['lazyAttr']);

    var imgs = [];

    function showImage(img) {
      var realSrc = findRealSrc(img);

      // needed by IE < 9, otherwise we get another onload when changing the src
      img.onload = null;
      img.removeAttribute('onload');

      // on IE < 8 we get an onerror event instead of an onload event
      img.onerror = null;
      img.removeAttribute('onerror');

      img.src = realSrc;
      imgs[indexOf.call(imgs, img)] = null;
    }

    function findRealSrc(img) {
      if (typeof opts['cb'] === 'function') {
        return opts['cb'](img);
      } else {
        return img.getAttribute(opts['lazyAttr']);
      }
    }

    function registerImage(img) {
      if (indexOf.call(imgs, img) === -1) {
        inViewport(img, opts, showImage);
      }
    }

    return registerImage;
  }

  function replaceGetAttribute() {
    var original = HTMLImageElement.prototype.getAttribute;

    HTMLImageElement.prototype.getAttribute = function(name) {
      if(name === 'src') {
        var realSrc;
        for (var i = 0, max = lazyAttrs.length; i < max; i++) {
          if (realSrc = original.call(this, lazyAttrs[i])) {
            break;
          }
        }

        return realSrc || original.call(this, name);
      } else {
        // our own lazyloader will go through theses lines
        // because we use getAttribute(opts.lazyAttr)
        return original.call(this, name);
      }
    }
  }

  function merge(defaults, opts) {
    for (var name in defaults) {
      if (opts[name] === undefined) {
        opts[name] = defaults[name];
      }
    }

    return opts;
  }

  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  // http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
  var indexOf = [].indexOf || function (value) {
      for (var i = this.length; i-- && this[i] !== value;);
      return i;
  };

}(this, document))
