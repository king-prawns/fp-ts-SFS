"use strict";
/*
  Dato un tipo `A` è possibile definire una istanza di semigruppo
  per `Ord<A>`. Cosa rappresenta?
*/
exports.__esModule = true;
var Ord_1 = require("fp-ts/lib/Ord");
var Semigroup_1 = require("fp-ts/lib/Semigroup");
var Array_1 = require("fp-ts/lib/Array");
var pipeable_1 = require("fp-ts/lib/pipeable");
var byName = pipeable_1.pipe(Ord_1.ordString, Ord_1.contramap(function (p) { return p.name; }));
var byAge = pipeable_1.pipe(Ord_1.ordNumber, Ord_1.contramap(function (p) { return p.age; }));
var byRememberMe = pipeable_1.pipe(Ord_1.ordBoolean, // false (=0) then true (=1)
Ord_1.contramap(function (p) { return p.rememberMe; }));
var S = Ord_1.getSemigroup();
var users = [
    { id: 1, name: 'Guido', age: 47, rememberMe: false },
    { id: 2, name: 'Guido', age: 46, rememberMe: true },
    { id: 3, name: 'Giulio', age: 44, rememberMe: false },
    { id: 4, name: 'Giulio', age: 44, rememberMe: true }
];
// un ordinamento classico:
// prima per nome, poi per età, poi per `rememberMe`
var O1 = Semigroup_1.fold(S)(byName, [byAge, byRememberMe]);
console.log(Array_1.sort(O1)(users));
/*
[ { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 1, name: 'Guido', age: 47, rememberMe: false } ]
*/
// adesso invece voglio tutti gli utenti con
// `rememberMe = true` per primi
var O2 = Semigroup_1.fold(S)(Ord_1.getDualOrd(byRememberMe), [
    byName,
    byAge
]);
console.log(Array_1.sort(O2)(users));
/*
[ { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 1, name: 'Guido', age: 47, rememberMe: false } ]
*/ 
