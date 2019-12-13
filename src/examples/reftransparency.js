"use strict";
exports.__esModule = true;
var Console_1 = require("fp-ts/lib/Console");
var IO_1 = require("fp-ts/lib/IO");
var pipeable_1 = require("fp-ts/lib/pipeable");
var fs = require("fs");
//
// funzioni di libreria
//
var readFile = function (filename) { return function () {
    return fs.readFileSync(filename, "utf-8");
}; };
var writeFile = function (filename, data) { return function () {
    return fs.writeFileSync(filename, data, { encoding: "utf-8" });
}; };
//
// programma
//
var read = pipeable_1.pipe(readFile("file.txt"), IO_1.chain(Console_1.log));
var program = pipeable_1.pipe(read, IO_1.chain(function () { return writeFile("./src/examples/file.txt", "hello"); }), IO_1.chain(function () { return read; }));
program();
//
// programma 2
//
// function interleave<A, B>(a: IO<A>, b: IO<B>): IO<A> {
//   return pipe(
//     a,
//     chain(() => b),
//     chain(() => a)
//   );
// }
// const program2 = interleave(read, writeFile("./src/examples/file.txt", "foo"));
