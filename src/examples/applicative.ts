
import { HKT } from 'fp-ts/lib/HKT'
import { Apply } from 'fp-ts/lib/Apply'
import { URI } from 'fp-ts/lib/Array'

interface Applicative<F> extends Apply<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}

// F = Array
import { flatten } from 'fp-ts/lib/Array'

export const applicativeArray = {
  map: <A, B>(fa: Array<A>, f: (a: A) => B): Array<B> => fa.map(f),
  of: <A>(a: A): Array<A> => [a],
  ap: <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> =>
    flatten(fab.map(f => fa.map(f)))
}

const arrayFn = [(x: number) => x+4, (x: number)=> x*2]
const arrayNumber = [2,4,6]
const resultApApplicativeArray = applicativeArray.ap(arrayFn, arrayNumber)
// [ [ 6, 8, 10 ], [ 4, 8, 12 ] ]] without flatten
console.log('resultApApplicativeArray', resultApApplicativeArray)

// F = Option
import { fold, isNone, map, none, Option, some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export const applicativeOption = {
  map: <A, B>(fa: Option<A>, f: (a: A) => B): Option<B> =>
    isNone(fa) ? none : some(f(fa.value)),
  of: <A>(a: A): Option<A> => some(a),
  ap: <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> =>
    pipe(
      fab,
      fold(
        () => none,
        f =>
          pipe(
            fa,
            map(f)
          )
      )
    )
}

const optionFn = some((x:number):string => x.toString())
const optionNumber = some(40)
const resultApApplicativeOption = applicativeOption.ap(optionFn, optionNumber)
console.log('resultApApplicativeOption', resultApApplicativeOption)

// F = Task
import { Task } from 'fp-ts/lib/Task'

export const applicativeTask = {
  map: <A, B>(fa: Task<A>, f: (a: A) => B): Task<B> => () => fa().then(f),
  of: <A>(a: A): Task<A> => () => Promise.resolve(a),
  ap: <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => () =>
    Promise.all([fab(), fa()]).then(([f, a]) => f(a))
}

const promiseFn = () => Promise.resolve((x: number) => `test${x}`)
const promiseNumber = () => Promise.resolve(5)
const resultApApplicativeTask = applicativeTask.ap(promiseFn, promiseNumber)
resultApApplicativeTask().then(q => console.log('resultApApplicativeTask', q))
