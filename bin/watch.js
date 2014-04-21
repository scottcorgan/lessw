#!/usr/bin/env node

var fs = require('fs');
var watch = require('../index.js');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var asArray = require('as-array');

var output = argv.o || argv.output;
var filesToWatch = argv.w || argv.watch;
var options = {};

if (filesToWatch) options.watch = asArray(filesToWatch);

watch(argv._[0], options, function (err, file) {
  var destFilepath = path.resolve(process.cwd(), output);
  var w = file.stream.pipe(fs.createWriteStream(destFilepath));
  
  w.on('close', function () {
    console.log('LESSW: ' + '  - compiled to ' + destFilepath);
  });
});