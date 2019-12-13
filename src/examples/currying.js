"use strict";
// g: (args: [B, C]) => D
var sum = function (args) {
    return args[0] + args[1];
};
var resultSum = sum([3, 4]);
console.log('resultSum', resultSum);
var sumCurrying = function (n) { return function (x) { return n + x; }; };
var resultCurrying = sumCurrying(3)(4);
console.log('resultCurrying', resultCurrying);
