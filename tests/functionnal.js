var async = require('async');
var assert = require('assert');
var baseurl = 'http://192.168.56.1:8080/tests/';
var browse = require('./browse');
var browsers = require('./browsers.local.json');
var remoteCfg = {};

browsers.forEach(launchTests);

function launchTests(desired) {
  var queue = async.queue(runTest, 2);

  findTests(function(err, tests) {
    tests.forEach(function(filename) {
      queue.push({
        url: baseurl + filename + '?' + Date.now(),
        desired: desired
      }, function(err) {
        if (err !== null) {
          console.error(err);
          console.error(filename + ' was NOT OK on ' + desired.browserName + ' ' + (desired.version ? desired.version : ''));
        } else {
          console.log(filename + ' was OK on ' + desired.browserName + ' ' + (desired.version ? desired.version : ''));
        }
      });
    });
  });
}

function findTests(cb) {
  var fs = require('fs');
  fs.readdir(__dirname, function(err, files) {
    files = files.filter(isHtml);
    files = files.sort();
    cb(null, files);
  });

  function isHtml(file) {
    return /\.html$/.test(file);
  }
}

function runTest(opt, cb) {
  var condition = "errorFlag === false && successFlag === true";
  browse(opt.url, opt.desired, remoteCfg, function(err, browser) {
    if (err !== null) {
      console.error(arguments);
      process.exit(1);
    }

    browser.waitForCondition(condition, 3000, 100, function(err, results) {
      if (err !== null) {
        console.error(arguments, opt.url, opt.desired);
        process.exit(1)
      }
      browser.quit(cb.bind(null, err));
    });
  })
}