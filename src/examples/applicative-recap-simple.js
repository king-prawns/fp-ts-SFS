"use strict";
/*
  Problema: (semplificato)
  Dato
  - dato l'id di un utente (il cui record contiene il valore del suo conto corrente in EUR)
  Calcolare
  - il valore del suo conto corrente in una determinata valuta.
  I servizi che restituiscono il record dell'utente e il cambio relativo
  alla valuta sono asincroni
*/
exports.__esModule = true;
var T = require("fp-ts/lib/Task");
var getAmountSync = function (amount) { return amount * 0.30; };
/*
  Quello che vorrei è definire la seguente funzione
  const fetchAmount = (
    userId: string
  ): T.Task<number> => ???
/*
  Scriviamo la versione di lift specializzata per Task
*/
function lift(f) {
    return function (fa) { return T.task.map(fa, f); };
}
exports.lift = lift;
/*
  L'API finale
*/
var pipeable_1 = require("fp-ts/lib/pipeable");
var getResult = function (api) { return function (userId) {
    var amount = pipeable_1.pipe(api.fetchUser(userId), T.map(function (user) { return user.amount; }));
    var getAmountAsync = lift(getAmountSync);
    return getAmountAsync(amount);
}; };
/*
  Definiamo una istanza di `API` che simula le chiamate
  per poter testare il programma
*/
var API = {
    fetchUser: function (id) { return function () {
        return Promise.resolve({
            id: id,
            name: 'Foo',
            amount: 100
        });
    }; }
};
// program: (userId: string) => T.Task<number>
var program = getResult(API);
var result = program('42');
// run del programma
result().then(console.log);
// 30
