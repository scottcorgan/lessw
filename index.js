var fs = require('fs');
var path = require('path');
var chokidar = require('chokidar');
var less = require('less');
var resumer = require('resumer');
var glob = require('glob');
var async = require('async');

var watch = function (entryFile, options, callback) {
  if (arguments.length < 3) callback = arguments[1];
  
  console.log('\nWatching LESS files\n');
  
  options.watch = options.watch || [];
  options.watch.push(entryFile);
  
  fileList(options.watch, options, function (err, files) {
    var watcher = chokidar.watch(files, {ignored: /\.css/i,persistent: true});
    
    watcher.on('change', function (filepath) {
      var fullFilepath = path.resolve(process.cwd(), entryFile);
      
      console.log('LESSW: ' + filepath + ' changed');
      
      // TODO: only render the entry file
      less.render(fs.readFileSync(fullFilepath).toString(), {
        paths: [path.dirname(entryFile)] // Set available paths
      }, function (err, css) {
        callback(null, {
          name: '',
          stream: resumer().queue(css).end()
        });
      });
    });
  });
};

function fileList (files, options, callback) {
  var list = [];
  
  async.each(files, function (val, cb) {
    glob(val, function (err, files) {
      list = list.concat(files);
      cb();
    })
  }, function (err) {
    callback(err, list);
  });
}

module.exports = watch;