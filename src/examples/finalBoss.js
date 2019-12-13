"use strict";
// ====================
// GUESS THE NUMBER
// ====================
exports.__esModule = true;
var T = require("fp-ts/lib/Task");
var O = require("fp-ts/lib/Option");
var Random_1 = require("fp-ts/lib/Random");
var Ord_1 = require("fp-ts/lib/Ord");
var pipeable_1 = require("fp-ts/lib/pipeable");
var Console_1 = require("fp-ts/lib/Console");
var Task_1 = require("fp-ts/lib/Task");
var readline_1 = require("readline");
/** legge dallo standard input */
exports.getLine = function () {
    return new Promise(function (resolve) {
        var rl = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question("> ", function (answer) {
            rl.close();
            resolve(answer);
        });
    });
};
/** scrive dallo standard output */
exports.putStrLn = function (message) {
    return Task_1.task.fromIO(Console_1.log(message));
};
// il numero da indovinare
exports.secret = T.fromIO(Random_1.randomInt(1, 100));
// combinatore: stampa un messaggio prima di una azione
function withMessage(message, next) {
    return pipeable_1.pipe(exports.putStrLn(message), T.chain(function () { return next; }));
}
// l'input è una stringa perciò dobbiamo validarlo
var isValidInteger = Ord_1.between(Ord_1.ordNumber)(1, 100);
function parseGuess(s) {
    var n = parseInt(s, 10);
    return isNaN(n) || !isValidInteger(n) ? O.none : O.some(n);
}
var question = withMessage("Indovina il numero", exports.getLine);
var answer = pipeable_1.pipe(question, T.chain(function (s) {
    return pipeable_1.pipe(parseGuess(s), O.fold(function () { return withMessage("Devi inserire un intero da 1 a 100", answer); }, function (a) { return T.task.of(a); }));
}));
function check(secret, guess, ok, ko) {
    if (guess > secret) {
        return withMessage("Troppo alto", ko);
    }
    else if (guess < secret) {
        return withMessage("Troppo basso", ko);
    }
    else {
        return ok;
    }
}
var end = exports.putStrLn("Hai indovinato!");
// mantengo lo stato (secret) come argomento della funzione (alla Erlang)
function loop(secret) {
    return pipeable_1.pipe(answer, T.chain(function (guess) { return check(secret, guess, end, loop(secret)); }));
}
var program = pipeable_1.pipe(exports.secret, T.chain(loop));
program();
