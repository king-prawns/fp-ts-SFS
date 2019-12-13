"use strict";
exports.__esModule = true;
var Array_1 = require("fp-ts/lib/Array");
var Ord_1 = require("fp-ts/lib/Ord");
var pipeable_1 = require("fp-ts/lib/pipeable");
var Semigroup_1 = require("fp-ts/lib/Semigroup");
var semigroupCustomer = Semigroup_1.getStructSemigroup({
    // keep the longer name
    name: Semigroup_1.getJoinSemigroup(pipeable_1.pipe(Ord_1.ordNumber, Ord_1.contramap(function (s) { return s.length; }))
    // ordString
    ),
    // accumulate things
    favouriteThings: Array_1.getMonoid(),
    // keep the least recent date
    registeredAt: Semigroup_1.getMeetSemigroup(Ord_1.ordNumber),
    // keep the most recent date
    lastUpdatedAt: Semigroup_1.getJoinSemigroup(Ord_1.ordNumber),
    // boolean semigroup under disjunction (or ||)
    hasMadePurchase: Semigroup_1.semigroupAny
});
var resultSemigroupCustomer = semigroupCustomer.concat({
    name: "Giulio",
    favouriteThings: ["math", "climbing"],
    registeredAt: new Date(2018, 1, 20).getTime(),
    lastUpdatedAt: new Date(2018, 2, 18).getTime(),
    hasMadePurchase: false
}, {
    name: "Giulio Canti",
    favouriteThings: ["functional programming"],
    registeredAt: new Date(2018, 1, 22).getTime(),
    lastUpdatedAt: new Date(2018, 2, 9).getTime(),
    hasMadePurchase: true
});
console.log("resultSemigroupCustomer:", resultSemigroupCustomer);
/*
{ name: 'Giulio Canti',
  favouriteThings: [ 'math', 'climbing', 'functional programming' ],
  registeredAt: 1519081200000, // new Date(2018, 1, 20).getTime()
  lastUpdatedAt: 1521327600000, // new Date(2018, 2, 18).getTime()
  hasMadePurchase: true }
*/
