var fs = require('fs');
var path = require('path');
var chokidar = require('chokidar');
var less = require('less');
var resumer = require('resumer');

var watch = function (entryFiles, options, callback) {
  if (arguments.length < 3) callback = arguments[1];
  
  console.log('\nWatching LESS files\n');
  
  var watcher = chokidar.watch(entryFiles, {persistent: true});
  
  watcher.on('change', function (filepath) {
    var fullFilepath = path.resolve(process.cwd(), filepath);
    
    console.log('LESSW: ' + filepath + ' changed');
    
    less.render(fs.readFileSync(fullFilepath).toString(), function (err, css) {
      callback(null, {
        name: '',
        stream: resumer().queue(css).end()
      });
    });
  });
};

module.exports = watch;