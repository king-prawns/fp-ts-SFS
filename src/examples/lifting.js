"use strict";
exports.__esModule = true;
var Array_1 = require("fp-ts/lib/Array");
function liftA2(AF // methods: ap & map 
) {
    return function (g) { return function (fb) { return function (fc) { return AF.ap(AF.map(fb, g), fc); }; }; };
}
function liftA3(F) {
    return function (g) { return function (fb) { return function (fc) { return function (fd) { return F.ap(F.ap(F.map(fb, g), fc), fd); }; }; }; };
}
// monomorphic functions...
var add = function (a) { return function (b) { return a + b; }; };
// ...are ok, liftedAdd: (fa: O.Array<number>) => (fb: O.Array<number>) => O.Array<number>
var liftedAdd = liftA2(Array_1.array)(add);
var resultLiftedAdd = liftedAdd([3, 4, 5])([6, 7, 8]);
console.log('resultLiftedAdd', resultLiftedAdd);
