"use strict";
exports.__esModule = true;
// F = Array
var Array_1 = require("fp-ts/lib/Array");
exports.applicativeArray = {
    map: function (fa, f) { return fa.map(f); },
    of: function (a) { return [a]; },
    ap: function (fab, fa) {
        return Array_1.flatten(fab.map(function (f) { return fa.map(f); }));
    }
};
var arrayFn = [function (x) { return x + 4; }, function (x) { return x * 2; }];
var arrayNumber = [2, 4, 6];
var resultApApplicativeArray = exports.applicativeArray.ap(arrayFn, arrayNumber);
// [ [ 6, 8, 10 ], [ 4, 8, 12 ] ]] without flatten
console.log('resultApApplicativeArray', resultApApplicativeArray);
// F = Option
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
exports.applicativeOption = {
    map: function (fa, f) {
        return Option_1.isNone(fa) ? Option_1.none : Option_1.some(f(fa.value));
    },
    of: function (a) { return Option_1.some(a); },
    ap: function (fab, fa) {
        return pipeable_1.pipe(fab, Option_1.fold(function () { return Option_1.none; }, function (f) {
            return pipeable_1.pipe(fa, Option_1.map(f));
        }));
    }
};
var optionFn = Option_1.some(function (x) { return x.toString(); });
var optionNumber = Option_1.some(40);
var resultApApplicativeOption = exports.applicativeOption.ap(optionFn, optionNumber);
console.log('resultApApplicativeOption', resultApApplicativeOption);
exports.applicativeTask = {
    map: function (fa, f) { return function () { return fa().then(f); }; },
    of: function (a) { return function () { return Promise.resolve(a); }; },
    ap: function (fab, fa) { return function () {
        return Promise.all([fab(), fa()]).then(function (_a) {
            var f = _a[0], a = _a[1];
            return f(a);
        });
    }; }
};
var promiseFn = function () { return Promise.resolve(function (x) { return "test" + x; }); };
var promiseNumber = function () { return Promise.resolve(5); };
var resultApApplicativeTask = exports.applicativeTask.ap(promiseFn, promiseNumber);
resultApApplicativeTask().then(function (q) { return console.log('resultApApplicativeTask', q); });
