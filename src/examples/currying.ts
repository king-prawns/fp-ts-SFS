// g: (args: [B, C]) => D
const sum = (args: [number, number ]): number  => {
    return args[0] + args[1]
}
const resultSum = sum([3,4])
console.log('resultSum', resultSum)

// currying
// g:(b: B) => (c: C) => D
type G = (b: number) => (c: number) => number
const sumCurrying: G = (n) => (x) => n + x
const resultCurrying = sumCurrying(3)(4)
console.log('resultCurrying', resultCurrying)
