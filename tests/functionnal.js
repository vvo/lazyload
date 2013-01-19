var wd = require('wd');
var async = require('async');
var assert = require('assert');

var desired = {
  browserName: 'firefox'
}

findTests(function(err, tests) {
  async.forEachSeries(tests, runTest, function(err) {
    if (err !== null) {
      assert.fail(err, null, err.message)
    }
  })
});

function findTests(cb) {
  var fs = require('fs');
  fs.readdir(__dirname, function(err, files) {
    files = files.filter(isHtml);
    files = files.sort();
    // files = [files[5]]
    cb(null, files);
  });

  function isHtml(file) {
    return /\.html$/.test(file);
  }
}

function runTest(file, cb) {
  var browser = wd.remote();

  async.series([
    browser.init.bind(browser, desired),
    browser.get.bind(browser, 'http://192.168.56.1:8080/tests/' + file),
    // wait for the test to execute before polling
    wait.bind(null, 1000),
    browser.waitForCondition.bind(browser, "errorFlag === false && successFlag === true", 1000, 100)
    ], function(err, results) {
      browser.quit();
      if(err !== null) {
        cb(new Error(file + ' has had an error: ' + err));
      } else {
        console.log(file + ' was OK');
        cb(null);
      }
  });
}

function wait(ms, cb) {
  setTimeout(cb, ms);
}