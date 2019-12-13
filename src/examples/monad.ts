// example 1

import { array, flatten } from "fp-ts/lib/Array";

interface User {
  name: string;
  followers: Array<User>;
}

const getFollowers = (user: User): Array<User> => user.followers;

const user: User = {
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

const followersOfFollowers: Array<Array<User>> = getFollowers(user).map(
  getFollowers
);

const followersOfFollowers2: Array<User> = flatten(
  getFollowers(user).map(getFollowers)
);

console.log("followersOfFollowers2", followersOfFollowers2);

// example 2

import { head } from "fp-ts/lib/Array";
import {
  isNone,
  none,
  Option,
  option,
  some,
  flatten as flattenOption
} from "fp-ts/lib/Option";

const inverse = (n: number): Option<number> => (n === 0 ? none : some(1 / n));

const inverseHead: Option<Option<number>> = option.map(
  head([1, 2, 3]),
  inverse
);

// const flattenOption = <A>(mma: Option<Option<A>>): Option<A> =>
//   isNone(mma) ? none : mma.value;

const inverseHead2: Option<number> = flattenOption(
  option.map(head([1, 2, 3]), inverse)
);

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

const followersOfFollowersWithChain: Array<User> = array.chain(
  getFollowers(user),
  getFollowers
);
console.log("followersOfFollowersWithChain", followersOfFollowersWithChain);

const headInverseWithChain: Option<number> = option.chain(
  head([1, 2, 3]),
  inverse
);
console.log("headInverseWithChain", headInverseWithChain);
