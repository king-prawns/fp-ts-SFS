import { getMonoid } from "fp-ts/lib/Array";
import { contramap, ordNumber, ordString } from "fp-ts/lib/Ord";
import { pipe } from "fp-ts/lib/pipeable";
import {
  getJoinSemigroup,
  getMeetSemigroup,
  getStructSemigroup,
  Semigroup,
  semigroupAny
} from "fp-ts/lib/Semigroup";

interface Customer {
  name: string;
  favouriteThings: Array<string>;
  registeredAt: number; // since epoch
  lastUpdatedAt: number; // since epoch
  hasMadePurchase: boolean;
}

const semigroupCustomer: Semigroup<Customer> = getStructSemigroup({
  // keep the longer name
  name: getJoinSemigroup(
    pipe(
      ordNumber,
      contramap((s: string) => s.length)
    )
    // ordString
  ),
  // accumulate things
  favouriteThings: getMonoid<string>(),
  // keep the least recent date
  registeredAt: getMeetSemigroup(ordNumber),
  // keep the most recent date
  lastUpdatedAt: getJoinSemigroup(ordNumber),
  // boolean semigroup under disjunction (or ||)
  hasMadePurchase: semigroupAny
});

const resultSemigroupCustomer = semigroupCustomer.concat(
  {
    name: "Giulio",
    favouriteThings: ["math", "climbing"],
    registeredAt: new Date(2018, 1, 20).getTime(),
    lastUpdatedAt: new Date(2018, 2, 18).getTime(),
    hasMadePurchase: false
  },
  {
    name: "Giulio Canti",
    favouriteThings: ["functional programming"],
    registeredAt: new Date(2018, 1, 22).getTime(),
    lastUpdatedAt: new Date(2018, 2, 9).getTime(),
    hasMadePurchase: true
  }
);
console.log("resultSemigroupCustomer:", resultSemigroupCustomer);
/*
{ name: 'Giulio Canti',
  favouriteThings: [ 'math', 'climbing', 'functional programming' ],
  registeredAt: 1519081200000, // new Date(2018, 1, 20).getTime()
  lastUpdatedAt: 1521327600000, // new Date(2018, 2, 18).getTime()
  hasMadePurchase: true }
*/
