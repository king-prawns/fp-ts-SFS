// Un funtore è una coppia (F, lift) ove
// - F è un type constructor n-ario (n >= 1) che mappa ogni tipo X in un tipo F<X> (mappa tra oggetti)
// - lift è una fn che mappa ciascuna funzione f: (a: A) => B in una funzione lift(f): (fa: F<A>) => F<B>

// Come è possibile modellare un programma che produce side effect con una funzione pura?
// La risposta è modellare i side effect tramite effetti, ovvero tipi che rappresentano i side effect

// definire un DSL (domain specific language) per gli effetti
const a = 'test'
const b = 'test2'
function log(message: string): void {
  console.log(a, b) // side effect
}


type DSL = any // sum type di tutti i possibili effetti gestiti dal sistema
function logDSL(message: string): DSL {
  return {
    type: "log",
    message
  }
}

// usare i thunk
interface IO<A> {
  (): A
}

function logThunk(message: string): IO<void> {
  return () => {
    console.log(message)
  }
}

const read = (name: string): IO<string | null> =>
  () => localStorage.getItem(name)

const write = (name: string, value: string): IO<void> =>
  () => localStorage.setItem(name, value)

// programma puro
// (a: A) => B

// programma con effetti
// (a: A) => F<B>


// Se 
// f: A ⟼ B e g: C ⟼ D:
// dove B !==C
// allora deve essere vero B = F<C>
// Quindi possiamo scrivere
// f: A ⟼ F<B> (programma con effetti)
// g: B ⟼ C (programma pure)

// litfing trasformo g: B ⟼ C in g: F<B> ⟼ F<C> quindi posso fare f ∘ g

// F = Array
function liftArray<B, C>(g: (b: B) => C): (fb: Array<B>) => Array<C> {
  return fb => fb.map(g)
}

// F = Option
import { isNone, none, Option, some } from 'fp-ts/lib/Option'
function liftOption<B, C>(g: (b: B) => C): (fb: Option<B>) => Option<C> {
  return fb => (isNone(fb) ? none : some(g(fb.value)))
}

// F = Task
// interface Task<A> extends IO<Promise<A>> {}
import { Task } from 'fp-ts/lib/Task'
function liftTask<B, C>(g: (b: B) => C): (fb: Task<B>) => Task<C> {
  return fb => () => fb().then(g)
}

// Devono valere le seguenti proprietà:

// lift(1X) = 1F(X) (le identità vanno in identità)
// lift(g ∘ f) = lift(g) ∘ lift(f) (l'immagine di una composizione è la composizione delle immagini)
// La funzione lift è anche conosciuta sottoforma di una sua variante chiamata map, che è essenzialmente lift ma con gli argomenti riarrangiati:

// lift: <A, B>(f: (a: A) => B) => ((fa: F<A>) => F<B>)
// map:  <A, B>(fa: F<A>, f: (a: A) => B) => F<B>
// Notate che map può essere derivata da lift (e viceversa).


// Funtori in fp-ts
import { Functor1 } from 'fp-ts/lib/Functor'

export const URI = 'Response'

export type URI = typeof URI // non è di tipo stringa perchè URI è una const


// Response è un type constructor dato che F cioè prende come argomento zero o n tipi e restituisce un tipo 
interface Response<A> {
  url: string
  status: number
  headers: Record<string, string>
  body: A
}

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Response: Response<A>
  }
}

function map<A, B>(fa: Response<A>, f: (a: A) => B): Response<B> {
  return { ...fa, body: f(fa.body) }
}

// functor instance for `Response`
export const functorResponse: Functor1<URI> = {
  URI,
  map
}

console.log('functorResponse', functorResponse)

// Composizione di funtori
import { array } from 'fp-ts/lib/Array'
import { getFunctorComposition } from 'fp-ts/lib/Functor'
import { option } from 'fp-ts/lib/Option'

export const functorArrayOption = getFunctorComposition(array, option)

console.log('functorArrayOption', functorArrayOption)

// Funtori controvarianti
// rispetto a quelli precedenti (covarianti), hanno la funzione contramap
import { HKT } from 'fp-ts/lib/HKT'

// funtore covariante
export interface Functor<F> {
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

// funtore controvariante
export interface Contravariant<F> {
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}

// HKT<F, X> = F<X>

const fa: Array<number> = [4,6,7,8,10]

const f = (b: number) : string => {
  return b.toString();
}
const mapExample = (fa: Array<number>, f: (b: number) => string): Array<string> => {
  return fa.map(f)
}
const resultMapExample = mapExample(fa, f)
console.log('mapExample', resultMapExample)


// abbiamo lift(g): (fb: F<B>) => F<(c: C) => D>
// sappiamo che liftA2(g): (fb: F<B>) => (fc: F<C>) => F<D> (by curryng)
// quindi ci serve sapere come arrivare da F<(c: C) => D> a (fc: F<C>) => F<D>
// usiamo unpack di Apply
