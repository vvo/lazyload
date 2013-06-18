(function(win, doc){
  scroll(0, 0);
  var playground = document.createElement('div');
  playground.id = 'playground';
  playground.innerHTML = '<div class="scrollTrigger"></div>';
  doc.body.insertBefore(playground, doc.body.childNodes[0]);

  var style = document.createElement('style');
  var content = '#playground {position:absolute;top:0;left:0;line-height:0;font-size:0}\n.scrollTrigger {position:relative;width:5px;height:5px;background:#000;top:20000px;left:20000px;}';
  style.setAttribute("type", "text/css");
  if (style.styleSheet) {
      style.styleSheet.cssText = content;
  } else {
      style.appendChild(document.createTextNode(content));
  }
  document.getElementsByTagName("head")[0].appendChild(style);

  win.createTest = function createTest(params) {
    params = params || {};

    var test = document.createElement(params.tagName || 'div');

    for (var attr in params.attributes) {
      test.setAttribute(attr, params.attributes[attr]);
    }

    for(var prop in params.style) {
      test.style[prop] = params.style[prop];
    }

    return test;
  }

  win.insertTest = function insertTest(test, parent) {
    parent = parent || playground;
    parent.insertBefore(test, parent.childNodes[0]);
  }

  win.clean = function clean(node, parent) {
    parent = parent || playground;

    return function() {
      parent.removeChild(node);
      scroll(0, 0);
    }
  }

  win.scroller = function scroller(x, y, container, cb) {
    if (typeof cb === 'function') {
      setTimeout(function() {
        smartScroll(x, y, container);
        setTimeout(cb, 70);
      }, 4);
    } else {
      return function(cb) {
        setTimeout(function() {
          smartScroll(x, y, container);
          setTimeout(cb, 70);
        }, 4);
      }
    }
  }

  win.wait = function wait(ms) {

    return function(done) {
      setTimeout(done, ms);
    }
  }

  function smartScroll(x, y, container) {
    if (!container) {
      scroll(x || 0, y || 0);
    } else {
      // tricky, on IE8 this will triggers TWO scroll events
      container.scrollLeft = x;
      container.scrollTop = y;
    }
  }

})(window, document);