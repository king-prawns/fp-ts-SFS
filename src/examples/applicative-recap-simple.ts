/*
  Problema: (semplificato)
  Dato
  - dato l'id di un utente (il cui record contiene il valore del suo conto corrente in EUR)
  Calcolare
  - il valore del suo conto corrente in una determinata valuta.
  I servizi che restituiscono il record dell'utente e il cambio relativo
  alla valuta sono asincroni
*/

/*
  Prima di tutto iniziamo con il modello
*/
interface User {
  id: string
  name: string
  amount: number // EUR
}

import * as T from 'fp-ts/lib/Task'

interface API {
  fetchUser: (id: string) => T.Task<User>
}

/*
  Se potessi ricavare il valore del conto corrente
  in modo sincrono, il calcolo sarebbe facile
*/

type Fn = (a: number) => number
const getAmountSync: Fn = (amount: number): number => amount * 0.30


/*
  Quello che vorrei è definire la seguente funzione
  const fetchAmount = (
    userId: string
  ): T.Task<number> => ???
/*
  Scriviamo la versione di lift specializzata per Task
*/

export function lift<A, B>(
  f: (a: A) => B
): (fa: T.Task<A>) => T.Task<B> {
  return fa => T.task.map(fa, f)
}

/*
  L'API finale
*/

import { pipe } from 'fp-ts/lib/pipeable'

const getResult = (api: API) => (
  userId: string
): T.Task<number> => {
  const amount = pipe(
    api.fetchUser(userId),
    T.map(user => user.amount)
  )
  const getAmountAsync = lift(getAmountSync)
  return getAmountAsync(amount)
}

/*
  Definiamo una istanza di `API` che simula le chiamate
  per poter testare il programma
*/

const API: API = {
  fetchUser: (id: string): T.Task<User> => () =>
    Promise.resolve({
      id,
      name: 'Foo',
      amount: 100
    })
}

// program: (userId: string) => T.Task<number>
const program = getResult(API)

const result: T.Task<number> = program('42')

// run del programma
result().then(console.log)
// 30
