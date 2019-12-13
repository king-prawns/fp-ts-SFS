import { Eq, eqNumber, contramap, getStructEq } from "fp-ts/lib/Eq";
import { getEq } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";

// const eqNumber: Eq<number> = {
//   equals: (x, y) => x === y
// };

// implementazione di some con equals

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a));
}

const elemResultOK = elem(eqNumber)(1, [1, 2, 3]); // true
console.log("elemResultOK:", elemResultOK);

const elemResultKO = elem(eqNumber)(4, [1, 2, 3]); // false
console.log("elemResultKO:", elemResultKO);

type Point = {
  x: number;
  y: number;
};

const eqPointBasic: Eq<Point> = {
  equals: (p1, p2) => p1 === p2 || (p1.x === p2.x && p1.y === p2.y)
};

const resultEqPointBasic = eqPointBasic.equals(
  {
    x: 10,
    y: 10
  },
  {
    x: 10,
    y: 10
  }
);
console.log("resultEqPointBasic:", resultEqPointBasic);

const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
});

type Vector = {
  from: Point;
  to: Point;
};

const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint
});

const resultEqVector = eqVector.equals(
  {
    from: {
      x: 100,
      y: 100
    },
    to: {
      x: 1000,
      y: 1000
    }
  },
  {
    from: {
      x: 100,
      y: 100
    },
    to: {
      x: 1000,
      y: 1000
    }
  }
);
console.log("resultEqVector:", resultEqVector);

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint);
const resultEqArrayOfPoints = eqArrayOfPoints.equals(
  [
    {
      x: 10,
      y: 20
    },
    {
      x: 30,
      y: 40
    }
  ],
  [
    {
      x: 10,
      y: 20
    },
    {
      x: 30,
      y: 40
    }
  ]
);
console.log("resultEqArrayOfPoints:", resultEqArrayOfPoints);

type User = {
  userId: number;
  name: string;
};

/** two users are equal if their `userId` field is equal */
const eqUser = pipe(
  eqNumber,
  contramap((user: User) => user.userId)
);

// Infine un altro utile combinatore per costruire nuove istanze di Eq è il combinatore contramap: data una istanza di Eq per A e una funzione da B ad A, possiamo derivare una istanza di Eq per B
// User => B
// number => A
// (user: User) => user.userId   B=>A

const eqUserOK = eqUser.equals(
  { userId: 1, name: "Giulio" },
  { userId: 1, name: "Giulio Canti" }
);
console.log("eqUserOK:", eqUserOK);

const eqUserKO = eqUser.equals(
  { userId: 1, name: "Giulio" },
  { userId: 2, name: "Giulio" }
);
console.log("eqUserKO:", eqUserKO);



/** two users are equal if their `user.name` field has same length */
const eqUser2 = pipe(
  eqNumber,
  contramap((user: User) => user.name.length)
);
const eqUser2OK = eqUser2.equals(
  { userId: 1, name: "Marco" },
  { userId: 2, name: "Fabio" }
);
console.log("eqUserKO:", eqUser2OK);