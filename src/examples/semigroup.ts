// DEFINIZIONE
// Sia A un insieme non vuoto e * un'operazione binaria chiusa su (o interna a) A ovvero *: A × A ⟶ A, allora la coppia (A, *) si chiama MAGMA
// Sia (A, *) un magma, se * è associativa allora è un semigruppo.

import { Predicate } from "fp-ts/lib/function";
import {
  fold,
  Semigroup,
  semigroupSum,
  semigroupAny,
  semigroupString,
  semigroupProduct,
  getFirstSemigroup,
  getStructSemigroup
} from "fp-ts/lib/Semigroup";

const sum = fold(semigroupSum);
const resultSum = sum(0, [1, 2, 3, 4]);
console.log("\nSemigroup Sum [1, 2, 3, 4]");
console.log("Sum: ", resultSum);

// SEMIGROUP CUSTOM

const mySemigroupProduct = {
  concat: (x: number, y: number): number => x * y
};
const product = fold(mySemigroupProduct);
const resultProduct = product(1, [2, 3, 5]);
console.log("\nSemigroup Product [1, 2, 3, 4]");
console.log("Product", resultProduct);

const some = <A>(p: Predicate<A>, as: Array<A>): boolean =>
  fold(semigroupAny)(false, as.map(p));

const semigroupObject: Semigroup<object> = {
  concat: (x, y) => ({ ...x, ...y })
};
const assign = (as: Array<object>): object => fold(semigroupObject)({}, as);
const resultObject = assign([{ key1: "3" }, { key2: "5" }]);
console.log('\nSemigroup Assign { key1: "3" }, { key2: "5" }');
console.log("Assign", resultObject);

// SEMIGRUPPO DUALE
// un semigruppo e' detto "duale" se l'operazione di concat
// torna lo stesso risultato, anche invertendo l'ordine degli elementi
const getDualSemigroup = <A>(S: Semigroup<A>): Semigroup<A> => {
  return {
    concat: (x, y) => S.concat(y, x)
  };
};

const duelSemigroupSum = getDualSemigroup(semigroupString); // non duale
const dualSemigroupProduct = getDualSemigroup(semigroupProduct); // duale
console.log("\nThe semigroupString is NOT dual");
console.log(semigroupString.concat("1", "5")); // 15
console.log(duelSemigroupSum.concat("1", "5")); // 51

console.log("\nThe semigroupProduct is dual");
console.log(semigroupProduct.concat(1, 5)); // 5
console.log(dualSemigroupProduct.concat(1, 5)); // 5

const firstSemigroup = <string>getFirstSemigroup();
const result = firstSemigroup.concat("ciao", "test");
console.log('\nFirstSemigroup ("ciao", "test")');
console.log("First semigroup: ", result);

type Point = {
  x: number;
  y: number;
};

const semigroupPoint: Semigroup<Point> = getStructSemigroup({
  x: semigroupSum,
  y: semigroupSum
});

type Vector = {
  from: Point;
  to: Point;
};

const semigroupVector: Semigroup<Vector> = getStructSemigroup({
  from: semigroupPoint,
  to: semigroupPoint
});

const resultSemigroupVector = semigroupVector.concat(
  {
    from: {
      x: 5,
      y: 10
    },
    to: {
      x: 100,
      y: 200
    }
  },
  {
    from: {
      x: 505,
      y: 510
    },
    to: {
      x: 1000,
      y: 2000
    }
  }
);
console.log("SemigroupVector :", resultSemigroupVector);
