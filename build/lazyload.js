/**
* @license in-viewport v0.4.2 | github.com/vvo/in-viewport#license
*/

(function(win, doc){
  var instances = [];

  win['inViewport'] = inViewport;

  function inViewport(elt, params, cb) {
    var opts = {
      container: doc.body,
      offset: 0
    };

    if (params === undefined || typeof params === 'function') {
      cb = params;
      params = {};
    }

    var container = opts.container = params['container'] || opts.container;
    var offset = opts.offset = params['offset'] || opts.offset;

    for (var i = 0; i < instances.length; i++) {
      if (instances[i].container === container) {
        return instances[i].inViewport(elt, offset, cb);
      }
    }

    return instances[
      instances.push(createInViewport(container)) - 1
    ].inViewport(elt, offset, cb)
  }

  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  // https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
  var contains = document.documentElement.compareDocumentPosition ?
    function( a, b ) {
      return !!(a.compareDocumentPosition( b ) & 16);
    } :
    document.documentElement.contains ?
    function( a, b ) {
      return a !== b && ( a.contains ? a.contains( b ) : false );
    } :
    function( a, b ) {
      while ( (b = b.parentNode) ) {
        if ( b === a ) {
          return true;
        }
      }
      return false;
    };

  function createInViewport(container) {
    var watches = [];
    var watching = [];

    var scrollContainer = container === doc.body ? win : container;
    var debouncedCheck = debounce(checkElements, 15);

    addEvent(scrollContainer, 'scroll', debouncedCheck);


    if (scrollContainer === win) {
      addEvent(win, 'resize', debouncedCheck);
    }

    if (typeof window['MutationObserver'] === 'function') {
      observeDOM(watching, container, debouncedCheck);
    }

    function inViewport(elt, offset, cb) {
      if (!contains(doc.documentElement, elt) ||
          !contains(doc.documentElement, container)) {
          if (cb) {
            return setTimeout(addWatch(elt, offset, cb), 0);
          } else {
            return false;
          }
      }

      var eltRect = elt.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();

      var pos = {
        left: eltRect.left,
        top: eltRect.top
      };

      var viewport = {
        width: offset,
        height: offset
      };

      if (container === doc.body) {
        viewport.width += doc.documentElement.clientWidth;
        viewport.height += doc.documentElement.clientHeight;

        // We update body rect computing because
        // when you have relative/absolute childs, you get bad compute
        // we need to create a new Object, because it's read only
        containerRect = {
          bottom: container.scrollHeight,
          top: 0,
          left: 0,
          right: container.scrollWidth
        };
      } else {
        pos.left -= containerRect.left;
        pos.top -= containerRect.top;
        viewport.width += container.clientWidth;
        viewport.height += container.clientHeight;
      }

      var visible =
      // 1. They must overlap
      !(
        eltRect.right < containerRect.left ||
        eltRect.left > containerRect.right ||
        eltRect.bottom < containerRect.top ||
        eltRect.top > containerRect.bottom
      ) && (
      // 2. They must be visible in the viewport
        pos.top <= viewport.height &&
        pos.left <= viewport.width
      );

      if (visible) {
        if (cb) {
          watching.splice(indexOf.call(watching, elt), 1);
          cb(elt);
        } else {
          return true;
        }
      } else {
        if (cb) {
          setTimeout(addWatch(elt, offset, cb), 0);
        } else {
          return false;
        }
      }
    }

    function addWatch(elt, offset, cb) {
      if (indexOf.call(watching, elt) === -1) {
        watching.push(elt);
      }

      return function() {
        watches.push(function() {
          inViewport(elt, offset, cb);
        });
      }
    }

    function checkElements() {
      var cb;
      while(cb = watches.shift()) {
        cb();
      }
    }

    return {
      container: container,
      inViewport: inViewport
    }
  }

  function indexOf(value) {
    for (var i = this.length; i-- && this[i] !== value;) {}
    return i;
  }

  function observeDOM(elements, container, cb) {
    var observer = new MutationObserver(watch);
    var filter = Array.prototype.filter;

    observer.observe(container, {
      childList: true,
      subtree: true
    });

    function watch(mutations) {
      // some new DOM nodes where previously watched
      // we should check their positions
      if (mutations.some(knownNodes) === true) {
        setTimeout(cb, 0);
      }
    }

    function isWatched(node) {
      return indexOf.call(elements, node) !== -1;
    }

    function knownNodes(mutation) {
      return filter.call(mutation.addedNodes, isWatched).length > 0
    }
  }

})(window, document);
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
