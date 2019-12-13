"use strict";
/*
  Problema:
  Dato
  - dato l'id di un utente (il cui record contiene il valore del suo conto corrente in EUR)
  - e il codice di una valuta
  Calcolare
  - il valore del suo conto corrente in quella valuta.
  I servizi che restituiscono il record dell'utente e il cambio relativo
  alla valuta sono asincroni
*/
exports.__esModule = true;
var T = require("fp-ts/lib/Task");
var getAmountSync = function (amount) { return function (rate) { return amount * rate; }; };
/*
  Quello che vorrei è definire la seguente funzione
  const fetchAmount = (
    userId: string,
    currency: Currency
  ): T.Task<number> => ???
/*
  Scriviamo la versione di liftA2 specializzata per Task
*/
function liftA2(f) {
    return function (fa) { return function (fb) { return T.task.ap(T.task.map(fa, f), fb); }; };
}
exports.liftA2 = liftA2;
/*
  L'API finale
*/
var pipeable_1 = require("fp-ts/lib/pipeable");
var getResult = function (api) { return function (userId, currency) {
    var amount = pipeable_1.pipe(api.fetchUser(userId), T.map(function (user) { return user.amount; }));
    var rate = api.fetchRate(currency);
    var getAmountAsync = liftA2(getAmountSync);
    return getAmountAsync(amount)(rate);
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
    }; },
    fetchRate: function (_) { return function () {
        return Promise.resolve(0.12);
    }; }
};
// program: (userId: string, currency: Currency) => T.Task<number>
var program = getResult(API);
var result = program('42', 'USD');
// run del programma
result().then(console.log);
// 12
// See also: `sequenceT`, `sequenceS` in `fp-ts/lib/Apply`
