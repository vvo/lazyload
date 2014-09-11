/**
* @license lazyload v2.1.3 | github.com/vvo/lazyload#license
*/

(function(window, document){

  var lazyAttrs = ['data-src'];

  window['lazyload'] = lazyload;
  window['lzld'] = lazyload();

  // Provide libs using getAttribute early to get the good src
  // and not the fake data-src
  replaceGetAttribute('Image');
  replaceGetAttribute('IFrame');

  function registerLazyAttr(attr) {
    if (indexOf.call(lazyAttrs, attr) === -1) {
      lazyAttrs.push(attr);
    }
  }

  function lazyload(opts) {

    if (arguments.length > 1) {
      return inViewport.apply(undefined, arguments);
    }

    opts = merge({
      'offset': 333,
      'src': 'data-src',
      'container': false
    }, opts || {});

    if (typeof opts['src'] === 'string') {
      registerLazyAttr(opts['src']);
    }

    var elts = [];

    function show(elt) {
      var src = findRealSrc(elt);

      if (src) {
        elt.src = src;
      }

      elt['data-lzled'] = true;
      elts[indexOf.call(elts, elt)] = null;
    }

    function findRealSrc(elt) {
      if (typeof opts['src'] === 'function') {
        return opts['src'](elt);
      } else {
        return elt.getAttribute(opts['src']);
      }
    }

    function register(elt) {
      // unsubscribe onload
      // needed by IE < 9, otherwise we get another onload when changing the src
      elt.onload = null;
      elt.removeAttribute('onload');

      // https://github.com/vvo/lazyload/issues/62
      elt.onerror = null;
      elt.removeAttribute('onerror');

      if (indexOf.call(elts, elt) === -1) {
        inViewport(elt, opts, show);
      }
    }

    return register;
  }

  function replaceGetAttribute(elementName) {
    var fullname = 'HTML' + elementName + 'Element';
    if (fullname in window === false) {
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
        // because we use getAttribute(opts.src)
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

  // http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
  function indexOf(value) {
      for (var i = this.length; i-- && this[i] !== value;) {}
      return i;
  }

}(window, document));
