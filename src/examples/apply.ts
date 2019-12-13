// Apply

import { HKT } from 'fp-ts/lib/HKT'
import { Functor } from 'fp-ts/lib/Functor'

//ci permette di spacchettare  F<(c: C) => D>  in  (fc: F<C>) => F<D>
interface Apply<F> extends Functor<F> {
    readonly ap: <C, D>(fcd: HKT<F, (c: C) => D>, fc: HKT<F, C>) => HKT<F, D>
}

// La funzione ap è fondamentalmente unpack con gli argomenti riarrangiati
interface ApUnpackExample<F> {
  unpack: <C, D>(fcd: HKT<F, (c: C) => D>) => ((fc: HKT<F, C>) => HKT<F, D>)
  ap: <C, D>(fcd: HKT<F, (c: C) => D>, fc: HKT<F, C>) => HKT<F, D>
}
// perciò ap può essere derivata da unpack (e viceversa).