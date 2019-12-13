import {
  fromCompare,
  Ord,
  contramap,
  getDualOrd,
  ordNumber
} from "fp-ts/lib/Ord";
import { pipe } from "fp-ts/lib/pipeable";
import {
  getJoinSemigroup,
  getMeetSemigroup,
  Semigroup
} from "fp-ts/lib/Semigroup";

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

const equalsOrdNumber = ordNumber.equals(5, 5);
const compareOrdNumber = ordNumber.compare(5, 5);
console.log("equalsOrdNumber:", equalsOrdNumber);
console.log("compareOrdNumber:", compareOrdNumber);

function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x);
}

const resultMin = min(ordNumber)(2, 1);
console.log("min:", resultMin);

type User = {
  name: string;
  age: number;
};
const byAgeSimple: Ord<User> = fromCompare((x, y) =>
  ordNumber.compare(x.age, y.age)
);
const resultByAgeSimple = byAgeSimple.compare(
  {
    name: "Bob",
    age: 22
  },
  {
    name: "Carl",
    age: 32
  }
);
console.log("resultByAgeSimple:", resultByAgeSimple);

// Possiamo eliminare un po' di boilerplate usando il combinatore contramap: data una istanza di Ord per A e una funzione da B ad A, possiamo derivare una istanza di Ord per B:

// User => B
// number => A
// (user: User) => user.age   B=>A
const byAge: Ord<User> = pipe(
  ordNumber,
  contramap((user: User) => user.age)
);

const resultByAge = byAge.compare(
  {
    name: "Bob",
    age: 22
  },
  {
    name: "Carl",
    age: 32
  }
);
console.log("resultByAge:", resultByAge);

const getYounger = min(byAge);
const resultGetYounger = getYounger(
  { name: "Guido", age: 48 },
  { name: "Giulio", age: 45 }
);
console.log("resultGetYounger:", resultGetYounger);

function max<A>(O: Ord<A>): (x: A, y: A) => A {
  return min(getDualOrd(O));
}
const getOlder = max(byAge);
const resultGetOlder = getOlder(
  { name: "Guido", age: 48 },
  { name: "Giulio", age: 45 }
);
console.log("resultGetOlder:", resultGetOlder);

/** Takes the minimum of two values */
const semigroupMin: Semigroup<number> = getMeetSemigroup(ordNumber);

/** Takes the maximum of two values  */
const semigroupMax: Semigroup<number> = getJoinSemigroup(ordNumber);

const resultSemigroupMin = semigroupMin.concat(2, 1);
const resultSemigroupMax = semigroupMax.concat(3, 1);

console.log("resultSemigroupMin:", resultSemigroupMin);
console.log("resultSemigroupMax:", resultSemigroupMax);
