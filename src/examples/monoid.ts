// Se aggiungiamo una condizione in più alla definizione di un semigruppo (A, *), ovvero che esista un elemento u in A tale che per ogni elemento a in A vale:
// u * a = a * u = a
// allora la terna (A, *, u) viene detta monoide e l'elemento u viene detto unità (sinonimi: elemento neutro, elemento identità).

import { Semigroup } from 'fp-ts/lib/Semigroup'
import {
  getStructMonoid,
  Monoid,
  monoidSum,
  fold,
  monoidAll,
  monoidAny,
  monoidProduct,
  monoidString
} from 'fp-ts/lib/Monoid'

// interface Monoid<A> extends Semigroup<A> {
//   readonly empty: A
// }

/** number `Monoid` under addition */
// const monoidSum: Monoid<number> = {
//   concat: (x, y) => x + y,
//   empty: 0
// }

type Endomorphism<A> = (a: A) => A

function identity<A>(a: A): A {
  return a
}

function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>> {
  return {
    concat: (x, y) => a => x(y(a)),
    empty: identity
  }
}

// Se il tipo M ammette una istanza di monoide allora il tipo (a: A) => M ammette una istanza di monoide per ogni tipo A
function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M> {
  return () => ({
    concat: (f, g) => a => M.concat(f(a), g(a)),
    empty: () => M.empty
  })
}

// esempio combinazione getEndomorphismMonoid + getFunctionMonoid
type Reducer<S, A> = (a: A) => (s: S) => S

function getReducerMonoid<S, A>(): Monoid<Reducer<S, A>> {
  return getFunctionMonoid(getEndomorphismMonoid<S>())<A>()
}

// non tutti i semigruppi sono un monoide
// qui non trovo un elemento empty
const semigroupSpace: Semigroup<string> = {
  concat: (x, y) => x + ' ' + y
}

type Point = {
  x: number
  y: number
}

const monoidPoint: Monoid<Point> = getStructMonoid({
  x: monoidSum,
  y: monoidSum
})

type Vector = {
  from: Point
  to: Point
}

const monoidVector: Monoid<Vector> = getStructMonoid({
  from: monoidPoint,
  to: monoidPoint
})

const resultMonoidVector = monoidVector.concat(
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
console.log("ResultMonoidVector :", resultMonoidVector);

// Fold su monoid - non serve elemento di partenza
fold(monoidSum)([1, 2, 3, 4]) // 10
fold(monoidProduct)([1, 2, 3, 4]) // 24
fold(monoidString)(['a', 'b', 'c']) // 'abc'
fold(monoidAll)([true, false, true]) // false
fold(monoidAny)([true, false, true]) // true