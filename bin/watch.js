#!/usr/bin/env node

var fs = require('fs');
var watch = require('../index.js');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var entryFiles = argv._[0];
var output = argv.o || argv.output;

watch(entryFiles, {
  // watch: []
}, function (err, file) {
  var destFilepath = path.resolve(process.cwd(), output);
  var w = file.stream.pipe(fs.createWriteStream(destFilepath));
  
  w.on('close', function () {
    console.log('LESSW: ' + '  - compiled to ' + destFilepath);
  });
});