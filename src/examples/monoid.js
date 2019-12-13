"use strict";
// Se aggiungiamo una condizione in più alla definizione di un semigruppo (A, *), ovvero che esista un elemento u in A tale che per ogni elemento a in A vale:
// u * a = a * u = a
// allora la terna (A, *, u) viene detta monoide e l'elemento u viene detto unità (sinonimi: elemento neutro, elemento identità).
exports.__esModule = true;
var Monoid_1 = require("fp-ts/lib/Monoid");
function identity(a) {
    return a;
}
function getEndomorphismMonoid() {
    return {
        concat: function (x, y) { return function (a) { return x(y(a)); }; },
        empty: identity
    };
}
// Se il tipo M ammette una istanza di monoide allora il tipo (a: A) => M ammette una istanza di monoide per ogni tipo A
function getFunctionMonoid(M) {
    return function () { return ({
        concat: function (f, g) { return function (a) { return M.concat(f(a), g(a)); }; },
        empty: function () { return M.empty; }
    }); };
}
function getReducerMonoid() {
    return getFunctionMonoid(getEndomorphismMonoid())();
}
// non tutti i semigruppi sono un monoide
// qui non trovo un elemento empty
var semigroupSpace = {
    concat: function (x, y) { return x + ' ' + y; }
};
var monoidPoint = Monoid_1.getStructMonoid({
    x: Monoid_1.monoidSum,
    y: Monoid_1.monoidSum
});
var monoidVector = Monoid_1.getStructMonoid({
    from: monoidPoint,
    to: monoidPoint
});
var resultMonoidVector = monoidVector.concat({
    from: {
        x: 5,
        y: 10
    },
    to: {
        x: 100,
        y: 200
    }
}, {
    from: {
        x: 505,
        y: 510
    },
    to: {
        x: 1000,
        y: 2000
    }
});
console.log("ResultMonoidVector :", resultMonoidVector);
// Fold su monoid - non serve elemento di partenza
Monoid_1.fold(Monoid_1.monoidSum)([1, 2, 3, 4]); // 10
Monoid_1.fold(Monoid_1.monoidProduct)([1, 2, 3, 4]); // 24
Monoid_1.fold(Monoid_1.monoidString)(['a', 'b', 'c']); // 'abc'
Monoid_1.fold(Monoid_1.monoidAll)([true, false, true]); // false
Monoid_1.fold(Monoid_1.monoidAny)([true, false, true]); // true
