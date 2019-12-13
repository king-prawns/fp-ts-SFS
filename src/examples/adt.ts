// Una funzione pura: è una procedura che dato lo stesso input restituisce sempre lo stesso output e non ha alcun side effect osservabile.
// Trasparenza referenziale: Una espressione contiene un "side effect" se non gode della trasparenza referenziale.
// Siano f: Y ⟶ Z e g: X ⟶ Y due funzioni, allora la funzione h: X ⟶ Z definita da h(x) = f(g(x))

// ADT: Algebraic Data Types
// In computer programming, especially functional programming and type theory, an algebraic data type is a kind of composite type, i.e., a type formed by combining other types.

// PRODUCT TYPE
// Un product type è una collezione di tipi T inidicizzati da un insieme I
// Ogniqualvolta le sue conponenti sono indipendenti.

// -- TUPLE
type Tuple1 = [string] // I = [0]
type Tuple2 = [string, number] // I = [0, 1]
type Tuple3 = [string, number, boolean] // I = [0, 1, 2]

// Accessing by index
type Fst = Tuple2[0] // string
type Snd = Tuple2[1] // number

// -- STRUCT
// I = {"name", "age"}
interface Person {
  name: string
  age: number
}

// Accessing by label
type Name = Person['name'] // string
type Age = Person['age'] // number

type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Period = 'AM' | 'PM'
type Clock = [Hour, Period]

// SUM TYPES (o tagged union types)
type Action =
  | {
      type: 'ADD_TODO'
      text: string
    }
  | {
      type: 'UPDATE_TODO'
      id: number
      text: string
      completed: boolean
    }
  | {
      type: 'DELETE_TODO'
      id: number
    }

type List<A> = { type: 'Nil' } | { type: 'Cons'; head: A; tail: List<A> }

// Pattern Matching

const customFold = <A, R>(onNil: () => R, onCons: (head: A, tail: List<A>) => R) => (
  fa: List<A>
): R => (fa.type === 'Nil' ? onNil() : onCons(fa.head, fa.tail))
const lengthList: <A>(fa: List<A>) => number = customFold(() => 0, (_, tail) => 1 + lengthList(tail))

//  exhaustive check - tsconfig.json with strict === true
type Fruit = 'banana' | 'orange' // | 'mango'
function makeDessert( fruit: Fruit ): string {
 switch( fruit ) {
   case 'banana': return 'Banana Shake'
   case 'orange': return 'Orange Juice'
 }
}

declare function readFile(
  path: string,
  //         ↓ ---------- ↓ CallbackArgs
  callback: (err?: Error, data?: string) => void
): void

type CallbackArgs = [Error | undefined, string | undefined]

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


import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getApplySemigroup, Option, some, none, getLastMonoid, getOrElse } from 'fp-ts/lib/Option'
import { Monoid, getStructMonoid } from 'fp-ts/lib/Monoid'

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

const fold = <A, R>(onNone: () => R, onSome: (a: A) => R) => (fa: Option<A>): R =>
  fa._tag === 'None' ? onNone() : onSome(fa.value)

//                this is a lie ↓
function head<A>(as: Array<A>): A {
  if (as.length === 0) {
    throw new Error('Empty array')
  }
  return as[0]
}

//                              ↓ the type system "knows" that this computation may fail
function head2<A>(as: Array<A>): Option<A> {
  return as.length === 0 ? none : some(as[0])
}


const S = getApplySemigroup(semigroupSum)

S.concat(some(1), none) // none
S.concat(some(1), some(2)) // some(3)



/** VSCode settings */
interface Settings {
  /** Controls the font family */
  fontFamily: Option<string>
  /** Controls the font size in pixels */
  fontSize: Option<number>
  /** Limit the width of the minimap to render at most a certain number of columns. */
  maxColumn: Option<number>
}

const monoidSettings: Monoid<Settings> = getStructMonoid({
  fontFamily: getLastMonoid<string>(),
  fontSize: getLastMonoid<number>(),
  maxColumn: getLastMonoid<number>()
})

const workspaceSettings: Settings = {
  fontFamily: some('Courier'),
  fontSize: none,
  maxColumn: some(80)
}

const userSettings: Settings = {
  fontFamily: some('Fira Code'),
  fontSize: some(12),
  maxColumn: none
}

/** userSettings overrides workspaceSettings */
const resultMonoidSettings = monoidSettings.concat(workspaceSettings, userSettings)
/*
{ fontFamily: some("Fira Code"),
  fontSize: some(12),
  maxColumn: some(80) }
*/
console.log('resultMonoidSettings', resultMonoidSettings)