"use strict";
// DEFINIZIONE
// Sia A un insieme non vuoto e * un'operazione binaria chiusa su (o interna a) A ovvero *: A × A ⟶ A, allora la coppia (A, *) si chiama MAGMA
// Sia (A, *) un magma, se * è associativa allora è un semigruppo.
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
var Semigroup_1 = require("fp-ts/lib/Semigroup");
var sum = Semigroup_1.fold(Semigroup_1.semigroupSum);
var resultSum = sum(0, [1, 2, 3, 4]);
console.log("\nSemigroup Sum [1, 2, 3, 4]");
console.log("Sum: ", resultSum);
// SEMIGROUP CUSTOM
var mySemigroupProduct = {
    concat: function (x, y) { return x * y; }
};
var product = Semigroup_1.fold(mySemigroupProduct);
var resultProduct = product(1, [2, 3, 5]);
console.log("\nSemigroup Product [1, 2, 3, 4]");
console.log("Product", resultProduct);
var some = function (p, as) {
    return Semigroup_1.fold(Semigroup_1.semigroupAny)(false, as.map(p));
};
var semigroupObject = {
    concat: function (x, y) { return (__assign(__assign({}, x), y)); }
};
var assign = function (as) { return Semigroup_1.fold(semigroupObject)({}, as); };
var resultObject = assign([{ key1: "3" }, { key2: "5" }]);
console.log('\nSemigroup Assign { key1: "3" }, { key2: "5" }');
console.log("Assign", resultObject);
// SEMIGRUPPO DUALE
// un semigruppo e' detto "duale" se l'operazione di concat
// torna lo stesso risultato, anche invertendo l'ordine degli elementi
var getDualSemigroup = function (S) {
    return {
        concat: function (x, y) { return S.concat(y, x); }
    };
};
var duelSemigroupSum = getDualSemigroup(Semigroup_1.semigroupString); // non duale
var dualSemigroupProduct = getDualSemigroup(Semigroup_1.semigroupProduct); // duale
console.log("\nThe semigroupString is NOT dual");
console.log(Semigroup_1.semigroupString.concat("1", "5")); // 15
console.log(duelSemigroupSum.concat("1", "5")); // 51
console.log("\nThe semigroupProduct is dual");
console.log(Semigroup_1.semigroupProduct.concat(1, 5)); // 5
console.log(dualSemigroupProduct.concat(1, 5)); // 5
var firstSemigroup = Semigroup_1.getFirstSemigroup();
var result = firstSemigroup.concat("ciao", "test");
console.log('\nFirstSemigroup ("ciao", "test")');
console.log("First semigroup: ", result);
var semigroupPoint = Semigroup_1.getStructSemigroup({
    x: Semigroup_1.semigroupSum,
    y: Semigroup_1.semigroupSum
});
var semigroupVector = Semigroup_1.getStructSemigroup({
    from: semigroupPoint,
    to: semigroupPoint
});
var resultSemigroupVector = semigroupVector.concat({
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
console.log("SemigroupVector :", resultSemigroupVector);
