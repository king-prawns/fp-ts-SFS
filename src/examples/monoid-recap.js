"use strict";
exports.__esModule = true;
/*
  Possiamo definire un primo combinatore che data una forma
  restituisce la sua forma complementare (il negativo)
*/
function outside2D(s) {
    return function (point) { return !s(point); };
}
exports.outside2D = outside2D;
/*
  Notate che non stiamo usando in nessun modo il fatto
  che stiamo lavorando in due dimensioni. Generalizziamo!
*/
function outside(s) {
    return function (point) { return !s(point); };
}
exports.outside = outside;
/*
  Per testare outside definiamo la forma disco e un modo
  per visualizzare una forma nella console
*/
function disk(center, radius) {
    return function (point) { return distance(point, center) <= radius; };
}
exports.disk = disk;
// distanza euclidea
function distance(p1, p2) {
    return Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) +
        Math.pow(Math.abs(p1.y - p2.y), 2));
}
var Monoid_1 = require("fp-ts/lib/Monoid");
exports.showShape2D = {
    show: function (s) {
        var r = '───────────────────────\n';
        for (var j = 10; j >= -10; j--) {
            r += '│';
            for (var i = -10; i <= 10; i++) {
                r += s({ x: i, y: j }) ? '▧' : ' ';
            }
            r += '│\n';
        }
        r += '───────────────────────';
        return r;
    }
};
// console.log(showShape2D.show(disk({ x: 0, y: 0 }, 5)))
// console.log(showShape2D.show(outside(disk({ x: 0, y: 0 }, 5))))
/*
  Definiamo ora l'intersezione e l'unione di due forme.
  Per farlo possiamo sfruttare il risultato che il tipo
  di una funzione ammette una istanza di monoide se il tipo
  del codominio ammette una istanza di monoide
*/
var intersect = Monoid_1.getFunctionMonoid(Monoid_1.monoidAll)();
// AND
// valore neutro: true
// Se ho un monoide su Boolean, getFunctionMonoid mi da una funzione che mi restituisce un monoide da A a Boolean
var intersect2 = Monoid_1.getFunctionMonoid(Monoid_1.monoidProduct)();
// console.log(
//   showShape2D.show(intersect.concat(disk({ x: -3, y: 0 }, 5), disk({ x: 3, y: 0 }, 5)))
// )
exports.union = Monoid_1.getFunctionMonoid(Monoid_1.monoidAny)();
// OR
// valore neutro: false
// console.log(
//   showShape2D.show(union.concat(disk({ x: -3, y: 0 }, 5), disk({ x: 3, y: 0 }, 5)))
// )
// disk({ x: -3, y: 0 }, 5) >>> Shape2D
// disk({ x: 3, y: 0 }, 5) >>> Shape2D
// (union.concat(disk({ x: -3, y: 0 }, 5), disk({ x: 3, y: 0 }, 5)) >>> Shape2D
exports.ring = function (point, bigRadius, smallRadius) {
    return intersect.concat(disk(point, bigRadius), outside(disk(point, smallRadius)));
};
// console.log(showShape2D.show(ring({ x: 0, y: 0 }, 5, 3)))
exports.shapes = [
    disk({ x: 0, y: 0 }, 5),
    disk({ x: -5, y: 5 }, 3),
    disk({ x: 5, y: 5 }, 3)
];
// mickey mouse
console.log(exports.showShape2D.show(Monoid_1.fold(exports.union)(exports.shapes)));
// funzioni da punto a boolean
