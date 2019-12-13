import { Apply, Apply1 } from 'fp-ts/lib/Apply'
import { HKT, Kind, URIS } from 'fp-ts/lib/HKT'
import { array } from 'fp-ts/lib/Array'

type Curried2<B, C, D> = (b: B) => (c: C) => D // carrying

function liftA2<F extends URIS>(
  F: Apply1<F>
): <A, B, C>(g: Curried2<A, B, C>) => Curried2<Kind<F, A>, Kind<F, B>, Kind<F, C>>
function liftA2<F>(
  AF: Apply<F> // methods: ap & map 
): <B, C, D>(g: Curried2<B, C, D>) => Curried2<HKT<F, B>, HKT<F, C>, HKT<F, D>> {
  return g => fb => fc => AF.ap(AF.map(fb, g), fc)
}

type Curried3<B, C, D, E> = (b: B) => (c: C) => (d: D) => E

function liftA3<F>(
  F: Apply<F>
): <B, C, D, E>(
  g: Curried3<B, C, D, E>
) => Curried3<HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>> {
  return g => fb => fc => fd => F.ap(F.ap(F.map(fb, g), fc), fd)
}

// monomorphic functions...
const add = (a: number) => (b: number) => a + b

// ...are ok, liftedAdd: (fa: O.Array<number>) => (fb: O.Array<number>) => O.Array<number>
const liftedAdd = liftA2(array)(add)
const resultLiftedAdd = liftedAdd([3,4,5])([6,7,8])
console.log('resultLiftedAdd', resultLiftedAdd)