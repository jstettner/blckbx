'use strict';
var Sandbox = require('sandbox');
var minify = require('harp-minify');

var s = new Sandbox();

var runprgm = function(code, params, callback) {
  // code = minify.js(code);
  s.run(code + "main(" + params + ");", callback);
}

module.exports = runprgm;
