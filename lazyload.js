(function(window, document){

  var pageHasLoaded = false;
  var lazyAttrs = ['data-src'];

  window['lazyload'] = lazyload;
  window['lzld'] = lzld();

  addEvent(window, 'load', function() {
    pageHasLoaded = true;
  });

  // Provide libs using getAttribute early to get the good src
  // and not the fake data-src
  replaceGetAttribute('Image');
  replaceGetAttribute('IFrame');

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

    var elts = [];

    function show(elt) {
      elt.src = findRealSrc(elt);
      elt['data-lzled'] = true;
      elts[indexOf.call(elts, elt)] = null;
    }

    function findRealSrc(elt) {
      if (typeof opts['cb'] === 'function') {
        return opts['cb'](elt);
      } else {
        return elt.getAttribute(opts['lazyAttr']);
      }
    }

    function register(elt) {
      // unsubscribe onload
      // needed by IE < 9, otherwise we get another onload when changing the src
      elt.onload = null;
      elt.removeAttribute('onload');

      if (indexOf.call(elts, elt) === -1) {
        inViewport(elt, opts, show);
      }
    }

    return register;
  }

  function replaceGetAttribute(elementName) {
    var fullname = 'HTML' + elementName + 'Element';
    if (!fullname in window) {
      return;
    }

    var original = window[fullname].prototype.getAttribute;
    window[fullname].prototype.getAttribute = function(name) {
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
