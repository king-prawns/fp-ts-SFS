"use strict";
// Una categoria è una coppia (Objects, Morphisms)
// Objects è una collezione di oggetti
// Morphisms è una collezione di morfismi (dette anche "frecce") tra oggetti
// Ogni morfismo f possiede un oggetto sorgente A e un oggetto target B, dove sia A che B sono contenuti in Objects.
// Scriviamo f: A ⟼ B e diciamo che "f è un morfismo da A a B"
// Una categoria può essere interpretata come un modello semplificato di un typed programming language
// A = string
// B = number
// C = boolean
// f = string => number
// g = number => boolean
// g ∘ f = string => boolean
function f(s) {
    return s.length;
}
function g(n) {
    return n > 2;
}
// h = g ∘ f
function h(s) {
    return g(f(s)); // isValidLength(getWordLength(s))
}
// f: A ⟼ B e g: B ⟼ C
function compose(g, f) {
    return function (a) { return g(f(a)); };
}
console.log('composition', h('ciao'));
