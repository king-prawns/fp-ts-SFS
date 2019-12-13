"use strict";
exports.__esModule = true;
var IO_1 = require("fp-ts/lib/IO");
var Date_1 = require("fp-ts/lib/Date");
var Console_1 = require("fp-ts/lib/Console");
function time(ma) {
    return IO_1.io.chain(Date_1.now, function (start) {
        return IO_1.io.chain(ma, function (a) {
            return IO_1.io.chain(Date_1.now, function (end) { return IO_1.io.map(Console_1.log("Elapsed: " + (end - start)), function () { return a; }); });
        });
    });
}
exports.time = time;
var fakeNow = function () { return 100; };
function time2() {
    return IO_1.io.chain(fakeNow, function (start) { return IO_1.io.map(Console_1.log("Elapsed: " + start), function () { return 6; }); });
}
exports.time2 = time2;
var resTime = time2()();
// console.log("resTime", resTime);
// function fib(n: number): number {
//   return n <= 1 ? 1 : fib(n - 1) + fib(n - 2);
// }
// const printFib: IO<void> = pipe(
//   randomInt(30, 35),
//   chain(n => log(fib(n)))
// );
// function replicateIO(n: number, mv: IO<void>): IO<void> {
//   return fold(getMonoid(monoidVoid))(replicate(n, mv));
// }
// time(replicateIO(3, printFib))();
// // Stampando anche i parziali
// time(replicateIO(3, time(printFib)))();
