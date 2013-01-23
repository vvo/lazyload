var wd = require('wd');
var async = require('async');

module.exports = browse;
function browse(url, desired, remoteCfg, cb) {
  if (typeof remoteCfg === 'function') {
    cb = remoteCfg;
    remoteCfg = undefined;
  }

  var browser = wd.remote(remoteCfg);

  // browser.on('status', logStatus);
  // browser.on('command', logCommand);

  async.series([
    browser.init.bind(browser, desired),
    wait4(100),
    browser.get.bind(browser, url),
    wait4(1000)
  ], function(err) {
    cb(err, browser);
  });
}

function logStatus(info) {
  console.log('\x1b[36m%s\x1b[0m', info);
}

function logCommand(meth, path) {
  console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
}

function wait4(ms) {
  return wait.bind(null, ms);
}

function wait(ms, cb) {
  setTimeout(cb, ms);
}