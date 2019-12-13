"use strict";
// Un funtore è una coppia (F, lift) ove
// - F è un type constructor n-ario (n >= 1) che mappa ogni tipo X in un tipo F<X> (mappa tra oggetti)
// - lift è una fn che mappa ciascuna funzione f: (a: A) => B in una funzione lift(f): (fa: F<A>) => F<B>
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// Come è possibile modellare un programma che produce side effect con una funzione pura?
// La risposta è modellare i side effect tramite effetti, ovvero tipi che rappresentano i side effect
// definire un DSL (domain specific language) per gli effetti
var a = 'test';
var b = 'test2';
function log(message) {
    console.log(a, b); // side effect
}
function logDSL(message) {
    return {
        type: "log",
        message: message
    };
}
function logThunk(message) {
    return function () {
        console.log(message);
    };
}
var read = function (name) {
    return function () { return localStorage.getItem(name); };
};
var write = function (name, value) {
    return function () { return localStorage.setItem(name, value); };
};
// programma puro
// (a: A) => B
// programma con effetti
// (a: A) => F<B>
// Se 
// f: A ⟼ B e g: C ⟼ D:
// dove B !==C
// allora deve essere vero B = F<C>
// Quindi possiamo scrivere
// f: A ⟼ F<B> (programma con effetti)
// g: B ⟼ C (programma pure)
// litfing trasformo g: B ⟼ C in g: F<B> ⟼ F<C> quindi posso fare f ∘ g
// F = Array
function liftArray(g) {
    return function (fb) { return fb.map(g); };
}
// F = Option
var Option_1 = require("fp-ts/lib/Option");
function liftOption(g) {
    return function (fb) { return (Option_1.isNone(fb) ? Option_1.none : Option_1.some(g(fb.value))); };
}
function liftTask(g) {
    return function (fb) { return function () { return fb().then(g); }; };
}
exports.URI = 'Response';
function map(fa, f) {
    return __assign(__assign({}, fa), { body: f(fa.body) });
}
// functor instance for `Response`
exports.functorResponse = {
    URI: exports.URI,
    map: map
};
console.log('functorResponse', exports.functorResponse);
// Composizione di funtori
var Array_1 = require("fp-ts/lib/Array");
var Functor_1 = require("fp-ts/lib/Functor");
var Option_2 = require("fp-ts/lib/Option");
exports.functorArrayOption = Functor_1.getFunctorComposition(Array_1.array, Option_2.option);
console.log('functorArrayOption', exports.functorArrayOption);
// HKT<F, X> = F<X>
var fa = [4, 6, 7, 8, 10];
var f = function (b) {
    return b.toString();
};
var mapExample = function (fa, f) {
    return fa.map(f);
};
var resultMapExample = mapExample(fa, f);
console.log('mapExample', resultMapExample);
// abbiamo lift(g): (fb: F<B>) => F<(c: C) => D>
// sappiamo che liftA2(g): (fb: F<B>) => (fc: F<C>) => F<D> (by curryng)
// quindi ci serve sapere come arrivare da F<(c: C) => D> a (fc: F<C>) => F<D>
// usiamo unpack di Apply
