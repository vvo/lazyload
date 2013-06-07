(function(win, doc){

  var playground = document.createElement('div');
  playground.id = 'playground';
  doc.body.insertBefore(playground, doc.body.childNodes[0]);

  var style = document.createElement('style');
  var content = '#playground {position:absolute;top:0;left:0;line-height:0;font-size:0};.scrollTrigger {position:relative;width:5px;height:5px;background:#000;top:20000px;left:20000px;}';
  style.setAttribute("type", "text/css");
  if (style.styleSheet) {
      style.styleSheet.cssText = content;
  } else {
      style.appendChild(document.createTextNode(content));
  }
  document.getElementsByTagName("head")[0].appendChild(style);

  win['getPlayground'] = function getPlayground() {
    return playground;
  }

  win['insert'] = function insert(elt, html) {
    elt.innerHTML = html;
  }

  win['clean'] = function clean() {
    insert(playground, '');
    scroll(0, 0);
  }

  win['scroller'] = function scroller(x, y, container, cb) {
    if (typeof cb === 'function') {
      setTimeout(function() {
        smartScroll(x, y, container);
        setTimeout(cb, 12);
      }, 4);
    } else {
      return function(cb) {
        setTimeout(function() {
          smartScroll(x, y, container);
          setTimeout(cb, 12);
        }, 4);
      }
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