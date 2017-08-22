'use strict';
var Sandbox = require('sandbox');

var s = new Sandbox();

var asdf = 'tas';
var code = 'function(x,y) {return x * y;}';
var param = '4,2';

s.run( "(" + code + ")(" + param + ")", function( output ) {
  console.log( "Example 10: " + output.result + "\n" )
})
