// Prevent double lazyload script on same page
// We NEED to use string as closure compiler would otherwise compile this statement badly
if (!window['Lazyload']) {
  (function(window, document){

    var pageHasLoaded = false;

    // retro compatibility old lazyload
    // will automatically create an instance at first lzld call
    window['lzld'] = (function() {
      var instance;
      return function() {
        if (instance === undefined) instance = new Lazyload;
        instance['lzld'].apply(instance, arguments)
      }
    }());

    window['Lazyload'] = Lazyload;

    addEvent(window, 'load', function onLoadFired() {
      pageHasLoaded = true;
    });

    /**
     * A new lazyloader, watching the whole window right now
     * @constructor
     * @param {Object=} opts Provide offset or lazyAttr or none
     */
    function Lazyload(opts) {
      this.opts = merge({
        offset: 200,
        lazyAttr: 'data-src'
      }, opts || {});

      this.imgs = [];
      this.listening = false;
      this.showImagesT = throttle(bind(this.showImages, this), 20)

      // init
      if (this.opts['container'] === document) {
        this.scrollContainer = window;
        domready(bind(this.setBodyContainer, this));
      } else {
        this.scrollContainer = this.opts['container'];
      }
      domready(bind(this.findImages, this));
      domready(bind(this.showImages, this));
      setTimeout(this.showImagesT, 25);

      addEvent(window, 'load', this.showImagesT);

      // Ok, cannot use setTimeout.apply in IE7/8 LOL, you don't wanna know why, wait 3 years
      // http://stackoverflow.com/questions/11619826/internet-explorer-7-8-and-window-functions-are-empty-objects
      addEvent(window, 'load', bind(function() {
        setTimeout(this.showImagesT, 25);
      }, this));

      // Bind events
      this.subscribe();

      this['lzld'] = bind(this.onDataSrcImgLoad, this);

      // Override image element .getAttribute globally so that we give the real src
      // does not works for ie < 8: http://perfectionkills.com/whats-wrong-with-extending-the-dom/
      // Internet Explorer 7 (and below) [...] does not expose global Node, Element, HTMLElement, HTMLParagraphElement
      if ('HTMLImageElement' in window) {
        this.replaceGetAttribute();
      }
    }

    Lazyload.prototype.replaceGetAttribute = function replaceGetAttribute() {
      var original = HTMLImageElement.prototype.getAttribute;
      var lazyload = this;
      HTMLImageElement.prototype.getAttribute = function(name) {
        if(name === 'src') {
          var realSrc = original.call(this, lazyload.opts.lazyAttr);
          return realSrc || original.call(this, name);
        } else {
          // our own lazyloader will go through theses lines
          // because we use getAttribute(opts.lazyAttr)
          return original.call(this, name);
        }
      }
    }

    // called by img onload= or onerror= for IE6/7
    Lazyload.prototype.onDataSrcImgLoad = function onDataSrcImgLoad(img) {
      // if image is not already in the imgs array
      // it can already be in it if domready was fast and img onload slow

      // For the first image of the stack, it is possible we already shown it
      // But we still got the onload event
      if (img.getAttribute(this.opts.lazyAttr) === null) return;

      if (indexOf.call(this.imgs, img) === -1) {
        // this case happens when the page had loaded but we inserted more lazyload images with
        // javascript (ajax). We need to re-watch scroll/resize
        if (!this.listening) {
          this.subscribe();
        }
        this.showIfVisible(img, this.imgs.push(img) - 1);
      }
    }

    // find and merge images on domready with possibly already present onload= onerror= imgs
    Lazyload.prototype.findImages = function findImages() {
      var
        domreadyImgs = document.getElementsByTagName('img'),
        currentImg;

      // merge them with already self onload registered imgs
      for (var imgIndex = 0, max = domreadyImgs.length; imgIndex < max; imgIndex += 1) {
        currentImg = domreadyImgs[imgIndex];
        if (currentImg.getAttribute(this.opts.lazyAttr) && indexOf.call(this.imgs, currentImg) === -1) {
          this.imgs.push(currentImg);
        }
      }
    }

    // img = dom element
    // index = imgs array index
    Lazyload.prototype.showIfVisible = function showIfVisible(img, index) {
      // We have to check that the current node is in the DOM
      // It could be a detached() dom node
      // http://bugs.jquery.com/ticket/4996
      if (contains(document.documentElement, img)
        && hasScrolled(this.opts['container'], img, this.opts['offset'])) {
        // To avoid onload loop calls
        // removeAttribute on IE is not enough to prevent the event to fire

        img.onload = null;
        img.removeAttribute('onload');
        // on IE < 8 we get an onerror event instead of an onload event
        img.onerror = null;
        img.removeAttribute('onerror');

        img.src = img.getAttribute(this.opts.lazyAttr);
        img.removeAttribute(this.opts.lazyAttr);
        this.imgs[index] = null;

        return true; // img shown
      } else {
        return false; // img to be shown
      }
    }

    // Loop through an images array to find to-be-shown images
    Lazyload.prototype.showImages = function showImages() {
      var
        last = this.imgs.length,
        current,
        allImagesDone = true;

      for (current = 0; current < last; current++) {
        var img = this.imgs[current];
        // if showIfVisible is false, it means we have some waiting images to be
        // shown
        if(img !== null && !this.showIfVisible(img, current)) {
          allImagesDone = false;
        }
      }

      if (allImagesDone && pageHasLoaded) {
        this.unsubscribe();
      }
    }

    Lazyload.prototype.unsubscribe = function unsubscribe() {
      removeEvent(this.scrollContainer, 'scroll', this.showImagesT);
      this.listening = false;
      this.imgs = [];
    }

    Lazyload.prototype.subscribe = function subscribe() {
      addEvent(this.scrollContainer, 'scroll', this.showImagesT);
      this.listening = true;
    }


    /* Lazyload utility belt *\!/* SHINY *\!/* */
    function bind (method, context){
      return function(){
        method.apply(context, arguments);
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

    function throttle(fn, minDelay) {
      var lastCall = 0;
      return function() {
        var now = +new Date();
        if (now - lastCall < minDelay) {
          return;
        }
        lastCall = now;
        // we do not return anything as
        // https://github.com/documentcloud/underscore/issues/387
        fn.apply(this, arguments);
      }
    }

    // X-browser
    function addEvent( el, type, fn ) {
      if (el.attachEvent) {
        el.attachEvent && el.attachEvent( 'on' + type, fn );
      } else {
        el.addEventListener( type, fn, false );
      }
    }

    // X-browser
    function removeEvent( el, type, fn ) {
      if (el.detachEvent) {
        el.detachEvent && el.detachEvent( 'on' + type, fn );
      } else {
        el.removeEventListener( type, fn, false );
      }
    }

    // custom domready function
    // ripped from https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
    // http://javascript.nwbox.com/ContentLoaded/
    // http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
    // kept the inner logic, merged with our helpers/variables
    function domready(callback) {
      var
        done = false,
        top = true;

      function init(e) {
        if (e.type === 'readystatechange' && document.readyState !== 'complete') return;
        removeEvent((e.type === 'load' ? window : document), e.type, init);
        if (!done) {
          done = true;
          callback();
        }
      }

      function poll() {
        try { document.documentElement.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
        init('poll');
      }

      if (document.readyState === 'complete') callback();
      else {
        if (document.createEventObject && document.documentElement.doScroll) {
          try { top = !window.frameElement; } catch(e) { }
          if (top) poll();
        }
        addEvent(document, 'DOMContentLoaded', init);
        addEvent(document, 'readystatechange', init);
        addEvent(window, 'load', init);
      }

    }

    function hasScrolled(container, element, offset) {
      // when no offset given, default to plaholder height or width
      // it means you should set your width= height=
      if (!offset) offset = Math.max(element.clientHeight, element.clientWidth);

      var rect = element.getBoundingClientRect();
      var pos = {
        x: rect.left - offset,
        y: rect.top - offset
      }
      var viewport = {
        x: 0,
        y: 0
      }

      if (container === document.body) {
        viewport.x += document.documentElement.clientWidth;
        viewport.y += document.documentElement.clientHeight;
      } else {
        pos.x += scrollOffset().x;
        pos.y += scrollOffset().y;
        viewport.x += container.clientWidth;
        viewport.y += container.clientHeight;
      }

      return pos.y <= viewport.y && pos.x <= viewport.x;
    }

    function scrollOffset() {
      return {
        x: Math.max(window.pageXOffset || 0, document.body.scrollLeft, document.documentElement.scrollLeft),
        y: Math.max(window.pageYOffset || 0, document.body.scrollTop, document.documentElement.scrollTop)
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

    // as suggested by http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
    var indexOf = [].indexOf || function (value) {
        for (var i = this.length; i-- && this[i] !== value;);
        return i;
    };

  }(this, document))
}
