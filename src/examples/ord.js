"use strict";
exports.__esModule = true;
var Ord_1 = require("fp-ts/lib/Ord");
var pipeable_1 = require("fp-ts/lib/pipeable");
var Semigroup_1 = require("fp-ts/lib/Semigroup");
// interface Ord<A> extends Eq<A> {
//   readonly compare: (x: A, y: A) => Ordering
// }
// const ordNumber: Ord<number> = {
//   equals: (x, y) => x === y,
//   compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
// }
// const ordNumber: Ord<number> = fromCompare((x, y) =>
//   x < y ? -1 : x > y ? 1 : 0
// );
var equalsOrdNumber = Ord_1.ordNumber.equals(5, 5);
var compareOrdNumber = Ord_1.ordNumber.compare(5, 5);
console.log("equalsOrdNumber:", equalsOrdNumber);
console.log("compareOrdNumber:", compareOrdNumber);
function min(O) {
    return function (x, y) { return (O.compare(x, y) === 1 ? y : x); };
}
var resultMin = min(Ord_1.ordNumber)(2, 1);
console.log("min:", resultMin);
var byAgeSimple = Ord_1.fromCompare(function (x, y) {
    return Ord_1.ordNumber.compare(x.age, y.age);
});
var resultByAgeSimple = byAgeSimple.compare({
    name: "Bob",
    age: 22
}, {
    name: "Carl",
    age: 32
});
console.log("resultByAgeSimple:", resultByAgeSimple);
// Possiamo eliminare un po' di boilerplate usando il combinatore contramap: data una istanza di Ord per A e una funzione da B ad A, possiamo derivare una istanza di Ord per B:
// User => B
// number => A
// (user: User) => user.age   B=>A
var byAge = pipeable_1.pipe(Ord_1.ordNumber, Ord_1.contramap(function (user) { return user.age; }));
var resultByAge = byAge.compare({
    name: "Bob",
    age: 22
}, {
    name: "Carl",
    age: 32
});
console.log("resultByAge:", resultByAge);
var getYounger = min(byAge);
var resultGetYounger = getYounger({ name: "Guido", age: 48 }, { name: "Giulio", age: 45 });
console.log("resultGetYounger:", resultGetYounger);
function max(O) {
    return min(Ord_1.getDualOrd(O));
}
var getOlder = max(byAge);
var resultGetOlder = getOlder({ name: "Guido", age: 48 }, { name: "Giulio", age: 45 });
console.log("resultGetOlder:", resultGetOlder);
/** Takes the minimum of two values */
var semigroupMin = Semigroup_1.getMeetSemigroup(Ord_1.ordNumber);
/** Takes the maximum of two values  */
var semigroupMax = Semigroup_1.getJoinSemigroup(Ord_1.ordNumber);
var resultSemigroupMin = semigroupMin.concat(2, 1);
var resultSemigroupMax = semigroupMax.concat(3, 1);
console.log("resultSemigroupMin:", resultSemigroupMin);
console.log("resultSemigroupMax:", resultSemigroupMax);
