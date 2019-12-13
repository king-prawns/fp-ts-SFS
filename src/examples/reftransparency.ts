import { log } from "fp-ts/lib/Console";
import { IO, chain, map } from "fp-ts/lib/IO";
import { pipe } from "fp-ts/lib/pipeable";
import * as fs from "fs";

//
// funzioni di libreria
//

const readFile = (filename: string): IO<string> => () =>
  fs.readFileSync(filename, "utf-8");

const writeFile = (filename: string, data: string): IO<void> => () =>
  fs.writeFileSync(filename, data, { encoding: "utf-8" });

//
// programma
//

const read = pipe(readFile("file.txt"), chain(log));

const program = pipe(
  read,
  chain(() => writeFile("./src/examples/file.txt", "hello")),
  chain(() => read)
);

program();

//
// programma 2
//

// function interleave<A, B>(a: IO<A>, b: IO<B>): IO<A> {
//   return pipe(
//     a,
//     chain(() => b),
//     chain(() => a)
//   );
// }

// const program2 = interleave(read, writeFile("./src/examples/file.txt", "foo"));
