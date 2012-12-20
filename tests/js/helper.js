var slowSrc = 'http://1.cuzillion.com/bin/resource.cgi?type=gif&sleep=5&n=1&'
var localSrc = 'imgs/%i.jpg?'
var mainTpl = [
  '<div class="sep"></div>',
  '<img width=200 height=200',
  'data-src="%src"',
  'src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== onload=lzld(this) onerror=lzld(this)%class />'
].join(' ');
var errorFlag = false;

var insertSlowImage = makeInsert(slowSrc);
var insertImage = makeInsert(localSrc);
var error = makeRunOnce(function error(msg) {
  errorFlag = true;
  document.getElementById('debug').innerHTML = msg || 'unknown';
  document.getElementById('result').className = 'error';
});
var success = makeRunOnce(function success() {
  if (errorFlag) return;
  document.getElementById('debug').className = 'hide';
  document.getElementById('result').className = 'success';
});

function makeInsert(src) {
  var tpl = mainTpl.replace('%src', src + new Date().getTime());
  return function insertImage(n, className, fn) {
    var newtpl = tpl;
    n = n || 1;
    if (typeof className === 'function') fn = className;
    if (className !== undefined) newtpl = newtpl.replace('%class', ' class="'+className+'"');
    else newtpl = newtpl.replace('%class', '');

    var content = document.getElementById('content');
    var ret = '';
    for (var i = 1; i <= n; i ++) {
      ret += newtpl.replace('%i', i);
    }

    if (typeof fn === 'function') return fn(ret)

    content.innerHTML = content.innerHTML + ret;
  }
}

function insertSlowScript() {
document.write('<scr' + 'ipt src="http://1.cuzillion.com/bin/resource.cgi?type=js&sleep=2&jsdelay=1&n=1&t=1340197119"></scr' + 'ipt>');
}

function makeRunOnce(fn) {
  var calls = 0;
  return function() {
    if (calls > 0) return;
    calls++;
    return fn.apply(this, arguments);
  }
}

window.onerror = function() {
  window.onload = function() {
    error();  
  }
}
