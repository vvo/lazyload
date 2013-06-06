(function(win, doc){

  var instances = [];
  win["inViewport"] = inViewport;

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

    var newInstance = createInViewport(container);
    instances.push(newInstance);
    return newInstance.inViewport(elt, offset, cb);
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

  function createInViewport(container) {
    var watches = [];
    var scrollContainer = container === doc.body ? win : container;
    var debouncedScrollCheck = debounce(scrollCheck, 12);

    addEvent(scrollContainer, 'scroll', debouncedScrollCheck);

    function inViewport(elt, offset, cb) {
      debugger;
      var eltRect = elt.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();

      var pos = {
        left: eltRect.left,
        top: eltRect.top
      };

      var viewport = {
        width: 0,
        height: 0
      };

      if (container === doc.body) {
        viewport.width += doc.documentElement.clientWidth;
        viewport.height += doc.documentElement.clientHeight;
      } else {
        pos.left -= containerRect.left;
        pos.top -= containerRect.top;
        viewport.width += container.clientWidth;
        viewport.height += container.clientHeight;
      }

      var visible =
        pos.left >= -offset &&
        pos.left <= viewport.width + offset &&
        pos.top >= -offset &&
        pos.top <= viewport.height + offset;

      if (visible) {
        if (cb) {
          cb();
        } else {
          return true;
        }
      } else {
        if (cb) {
          setTimeout(addWatch, 0);
        } else {
          return false;
        }
      }

      function addWatch() {
        watches.push(function() {
          inViewport(elt, offset, cb, true);
        });
      }
    }

    function scrollCheck() {
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

})(window, document);