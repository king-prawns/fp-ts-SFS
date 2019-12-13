"use strict";
// Una funzione pura: è una procedura che dato lo stesso input restituisce sempre lo stesso output e non ha alcun side effect osservabile.
// Trasparenza referenziale: Una espressione contiene un "side effect" se non gode della trasparenza referenziale.
// Siano f: Y ⟶ Z e g: X ⟶ Y due funzioni, allora la funzione h: X ⟶ Z definita da h(x) = f(g(x))
exports.__esModule = true;
// Pattern Matching
var customFold = function (onNil, onCons) { return function (fa) { return (fa.type === 'Nil' ? onNil() : onCons(fa.head, fa.tail)); }; };
var lengthList = customFold(function () { return 0; }, function (_, tail) { return 1 + lengthList(tail); });
function makeDessert(fruit) {
    switch (fruit) {
        case 'banana': return 'Banana Shake';
        case 'orange': return 'Orange Juice';
    }
}
//////////////////////////////////////////////////
//    err     |       data      |     legal     //
//            |                 |               //
//    Error   |    undefined    |      V        //
//            |                 |               //
//  undefined |      string     |       V       //
//            |                 |               //
//    Error   |      string     |      X        //
//            |                 |               //
//  undefined |    undefined    |       X       //
//////////////////////////////////////////////////
var Semigroup_1 = require("fp-ts/lib/Semigroup");
var Option_1 = require("fp-ts/lib/Option");
var Monoid_1 = require("fp-ts/lib/Monoid");
// type Option<A> =
//   | { _tag: 'None' }
//   | {
//       _tag: 'Some'
//       value: A
//     }
// Option<boolean>: 1 + 2 = 3 abitanti.
// a nullary constructor can be implemented as a constant
// const none: Option<never> = { _tag: 'None' }
// const some = <A>(value: A): Option<A> => ({ _tag: 'Some', value })
var fold = function (onNone, onSome) { return function (fa) {
    return fa._tag === 'None' ? onNone() : onSome(fa.value);
}; };
//                this is a lie ↓
function head(as) {
    if (as.length === 0) {
        throw new Error('Empty array');
    }
    return as[0];
}
//                              ↓ the type system "knows" that this computation may fail
function head2(as) {
    return as.length === 0 ? Option_1.none : Option_1.some(as[0]);
}
var S = Option_1.getApplySemigroup(Semigroup_1.semigroupSum);
S.concat(Option_1.some(1), Option_1.none); // none
S.concat(Option_1.some(1), Option_1.some(2)); // some(3)
var monoidSettings = Monoid_1.getStructMonoid({
    fontFamily: Option_1.getLastMonoid(),
    fontSize: Option_1.getLastMonoid(),
    maxColumn: Option_1.getLastMonoid()
});
var workspaceSettings = {
    fontFamily: Option_1.some('Courier'),
    fontSize: Option_1.none,
    maxColumn: Option_1.some(80)
};
var userSettings = {
    fontFamily: Option_1.some('Fira Code'),
    fontSize: Option_1.some(12),
    maxColumn: Option_1.none
};
/** userSettings overrides workspaceSettings */
var resultMonoidSettings = monoidSettings.concat(workspaceSettings, userSettings);
/*
{ fontFamily: some("Fira Code"),
  fontSize: some(12),
  maxColumn: some(80) }
*/
console.log('resultMonoidSettings', resultMonoidSettings);
