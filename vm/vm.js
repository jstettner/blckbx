'use strict';
var Sandbox = require('sandbox');
var minify = require('harp-minify');

var s = new Sandbox();

function runprgm(code, params, callback) {
  code = minify.js(code);
  s.run( "(" + code + ")(" + params + ")", callback);
}
