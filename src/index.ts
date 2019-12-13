import * as t from "io-ts";
import { Either, isRight, either, fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

const User = t.type({
  key1: t.string,
  key2: t.number,
  key3: t.boolean
});
type UserType = t.TypeOf<typeof User>;

const userMockOK = {
  key1: "test_key_1",
  key2: 123,
  key3: false
};

const userMockKO = {
  key1: "test_key_1",
  key2: "123",
  key3: false
};


// HOW TO RETRIEVE VALUE FROM EITHER

// const isValid = (e: Either<t.Errors, UserType>) => isRight(e) ? e.right : new Error('something wrong') 

// pipe(
//   User.decode(userMockOK),
//   isValid,
//   console.log
// );

type GiorgioType = t.Errors | UserType

const onLeft = (error: t.Errors): GiorgioType => error

const onRight = (user: UserType): GiorgioType  => user

pipe(
  User.decode(userMockKO),
  fold(onLeft,onRight),
  console.log
);

// SAME WITHOUT FP-TS

const result = User.decode(userMockOK);
if (result._tag === "Right") {
  console.log(result.right);
} else {
  throw new Error("something wrong");
}
