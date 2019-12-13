"use strict";
exports.__esModule = true;
var Eq_1 = require("fp-ts/lib/Eq");
var Array_1 = require("fp-ts/lib/Array");
var pipeable_1 = require("fp-ts/lib/pipeable");
// const eqNumber: Eq<number> = {
//   equals: (x, y) => x === y
// };
// implementazione di some con equals
function elem(E) {
    return function (a, as) { return as.some(function (item) { return E.equals(item, a); }); };
}
var elemResultOK = elem(Eq_1.eqNumber)(1, [1, 2, 3]); // true
console.log("elemResultOK:", elemResultOK);
var elemResultKO = elem(Eq_1.eqNumber)(4, [1, 2, 3]); // false
console.log("elemResultKO:", elemResultKO);
var eqPointBasic = {
    equals: function (p1, p2) { return p1 === p2 || (p1.x === p2.x && p1.y === p2.y); }
};
var resultEqPointBasic = eqPointBasic.equals({
    x: 10,
    y: 10
}, {
    x: 10,
    y: 10
});
console.log("resultEqPointBasic:", resultEqPointBasic);
var eqPoint = Eq_1.getStructEq({
    x: Eq_1.eqNumber,
    y: Eq_1.eqNumber
});
var eqVector = Eq_1.getStructEq({
    from: eqPoint,
    to: eqPoint
});
var resultEqVector = eqVector.equals({
    from: {
        x: 100,
        y: 100
    },
    to: {
        x: 1000,
        y: 1000
    }
}, {
    from: {
        x: 100,
        y: 100
    },
    to: {
        x: 1000,
        y: 1000
    }
});
console.log("resultEqVector:", resultEqVector);
var eqArrayOfPoints = Array_1.getEq(eqPoint);
var resultEqArrayOfPoints = eqArrayOfPoints.equals([
    {
        x: 10,
        y: 20
    },
    {
        x: 30,
        y: 40
    }
], [
    {
        x: 10,
        y: 20
    },
    {
        x: 30,
        y: 40
    }
]);
console.log("resultEqArrayOfPoints:", resultEqArrayOfPoints);
/** two users are equal if their `userId` field is equal */
var eqUser = pipeable_1.pipe(Eq_1.eqNumber, Eq_1.contramap(function (user) { return user.userId; }));
// Infine un altro utile combinatore per costruire nuove istanze di Eq è il combinatore contramap: data una istanza di Eq per A e una funzione da B ad A, possiamo derivare una istanza di Eq per B
// User => B
// number => A
// (user: User) => user.userId   B=>A
var eqUserOK = eqUser.equals({ userId: 1, name: "Giulio" }, { userId: 1, name: "Giulio Canti" });
console.log("eqUserOK:", eqUserOK);
var eqUserKO = eqUser.equals({ userId: 1, name: "Giulio" }, { userId: 2, name: "Giulio" });
console.log("eqUserKO:", eqUserKO);
/** two users are equal if their `user.name` field has same length */
var eqUser2 = pipeable_1.pipe(Eq_1.eqNumber, Eq_1.contramap(function (user) { return user.name.length; }));
var eqUser2OK = eqUser2.equals({ userId: 1, name: "Marco" }, { userId: 2, name: "Fabio" });
console.log("eqUserKO:", eqUser2OK);
