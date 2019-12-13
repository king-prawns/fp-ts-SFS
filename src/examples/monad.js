"use strict";
// example 1
exports.__esModule = true;
var Array_1 = require("fp-ts/lib/Array");
var getFollowers = function (user) { return user.followers; };
var user = {
    name: "Marco",
    followers: [
        {
            name: "Giacomo",
            followers: [
                {
                    name: "Carlo",
                    followers: []
                }
            ]
        }
    ]
};
var followersOfFollowers = getFollowers(user).map(getFollowers);
var followersOfFollowers2 = Array_1.flatten(getFollowers(user).map(getFollowers));
console.log("followersOfFollowers2", followersOfFollowers2);
// example 2
var Array_2 = require("fp-ts/lib/Array");
var Option_1 = require("fp-ts/lib/Option");
var inverse = function (n) { return (n === 0 ? Option_1.none : Option_1.some(1 / n)); };
var inverseHead = Option_1.option.map(Array_2.head([1, 2, 3]), inverse);
// const flattenOption = <A>(mma: Option<Option<A>>): Option<A> =>
//   isNone(mma) ? none : mma.value;
var inverseHead2 = Option_1.flatten(Option_1.option.map(Array_2.head([1, 2, 3]), inverse));
console.log("inverseHead2", inverseHead2);
// (1) un type constructor M che ammette una istanza di funtore
// (2) una funzione of con la seguente firma:
// of: <A>(a: A) => HKT<M, A> (dove HKT<M, A> === M<A>)
// (3) una funzione flatMap con la seguente firma:
// flatMap: <A, B>(f: (a: A) => M<B>) => ((ma: M<A>) => M<B>)
// (string => Array<number>)  => (Array<string> => Array<number>)
// flatMap: <A, B>(f: (a: A) => HKT<M, B>) => ((ma: HKT<M, A>) => HKT<M, B>)
// o
// chain:   <A, B>(ma: HKT<M, A>, f: (a: A) => HKT<M, B>) => HKT<M, B>
// const chain = (
//   ma: Array<string>,
//   f: (x: string) => Array<boolean>
// ): Array<boolean> => flatten(ma.map(f));
var followersOfFollowersWithChain = Array_1.array.chain(getFollowers(user), getFollowers);
console.log("followersOfFollowersWithChain", followersOfFollowersWithChain);
var headInverseWithChain = Option_1.option.chain(Array_2.head([1, 2, 3]), inverse);
console.log("headInverseWithChain", headInverseWithChain);
