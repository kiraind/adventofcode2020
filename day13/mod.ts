const text = (await Deno.readTextFile('input.txt')).trim()

const [ earliestLine, busesLine ] = text.split('\n')

const earliest = parseInt(earliestLine)
const buses = busesLine.split(',')
  .filter(bus => bus !== 'x')  
  .map(bus => parseInt(bus))

const nextDepartures = buses.map(interval => {
  const period = Math.floor(earliest / interval) + 1

  return period * interval
})

let minId = buses[0]
let minDeparture = nextDepartures[0]

for(let i = 0; i < buses.length; i += 1) {
  if(nextDepartures[i] < minDeparture) {
    minDeparture = nextDepartures[i] 
    minId = buses[i]
  }
}


console.log(`#1 earliest ID * timer = ${minId * (minDeparture - earliest)}`)

// task 2

const busPairs = busesLine.split(',')  
  .map((bus, i) => ({ shift: BigInt(i), n: parseInt(bus) }))
  .filter(bus => isFinite(bus.n))
  .map(bus => ({ ...bus, n: BigInt(bus.n) }))

// let x = 1n\

const [ x ] = busPairs.reduce(([x, passedProd], { shift, n }) => {
  let a = 0n

  while( (x + a * passedProd + shift) % n !== 0n ) {
    a += 1n
  }

  return [
    x + a * passedProd,
    passedProd * n
  ]
}, [1n, 1n])

console.log(`#2 Earliest timestamp: ${x}`)

// left some trials code

// function gcd2(a: number, b: number): number {
//   // Greatest common divisor of 2 integers
//   if(!b) return b===0 ? a : NaN
//   return gcd2(b, a%b)
// }
// function gcd(array: number[]) {
//   // Greatest common divisor of a list of integers
//   let n = 0
//   for(let i=0; i<array.length; i += 1)
//     n = gcd2(array[i], n)
//   return n
// }
// function lcm2(a: number, b: number) {
//   // Least common multiple of 2 integers
//   return a*b / gcd2(a, b)
// }
// function lcm(array: number[]) {
//   // Least common multiple of a list of integers
//   let n = 1
//   for(let i=0; i < array.length; i += 1)
//     n = lcm2(array[i], n)
//   return n
// }

// const busesIds = busesLine.split(',')
//   .filter(bus => bus !== 'x')  
//   .map(bus => parseInt(bus))

// const busPairs = busesLine.split(',')  
//   .map((bus, i) => ({ shift: i, n: parseInt(bus) }))
//   .filter(bus => isFinite(bus.n))
  

// console.log(busPairs)
// console.log(busesIds.reduce((prod, curr) => prod * curr))

// // let tPowN = 1
// // for(let)


// console.log(
//   busPairs.map((pair, i) => `(${pair.n}*x${i} - ${pair.shift})`).join(' = ')
// )
// (7*x0 - 0) = (13*x1 - 1) = (59*x2 - 4) = (31*x3 - 6) = (19*x4 - 7)
// -> Wolfram ->
// x0 = 451763 n + 152683, x1 = 243257 n + 82214, x2 = 53599 n + 18115, x3 = 102011 n + 34477, x4 = 166439 n + 56252, n element Z
// x0 = 451763 n + 152683 = 152683 -> t = 152683 * 7 = 1068781

// system of equasions

// console.log(
//   busPairs.map(
//     (pair, i) => `${busPairs.map(
//       (_, j) => i !== j
//         ? `0*x${i}`
//         : `${pair.n}*x${i}`
//     ).join(' + ')
//     } - x5 = ${pair.shift}`
//   ).join('\n')
// )

// matrix

// const matrix = busPairs.map(
//   (pair, i) => busPairs.map(
//     (_, j) => i !== j
//       ? 0
//       : pair.n
//   )
// ).map(row => [...row, -1]) // add -t = -x[n+1]
// matrix.push(
//   matrix[0].map((r1, i) => r1 + matrix[matrix.length - 1][i])
// )
// matrix.push(new Array(busPairs.length + 1).fill(0))

// console.log(matrix)

// const biases = busPairs.map(bp => bp.shift)
// biases.push(0)

// console.log(biases)

// const inverted = invert(matrix)

// console.log(inverted)

// console.log(
//   apply(
//     inverted,
//     biases
//   )
  
// )

// console.log(lcm(busesIds))
// console.log('-----------------')
