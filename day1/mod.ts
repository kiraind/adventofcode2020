const targetSum = 2020

const text = await Deno.readTextFile('input.txt')

const numbers = text.split('\n').map(s => parseInt(s))

numbers.sort((a, b) => a - b)

// task 1
const [ first, second ] = findComplement(numbers, 2020)
if(isFinite(first)) {
  console.log(`#1: first * second = ${first} * ${second} = ${first * second}`)
}

// task 2
for(let i = 0; i < numbers.length && numbers[i] <= targetSum / 2; i += 1) {
  const first = numbers[i]

  const diff = targetSum - first

  const [second, third] = findComplement(
    numbers.slice(i),
    diff
  )

  if(isFinite(second)) {
    console.log(`#2: first * second * third = ${first} * ${second} * ${third} = ${first * second * third}`)
    break
  }
}

function findComplement(arr: Array<number>, targetSum: number): [number, number] {
  for(let i = 0; i < arr.length && arr[i] <= targetSum / 2; i += 1) {
    const first = arr[i]
  
    const diff = targetSum - first
  
    const second = binaryFind(
      arr.slice(i),
      x => diff - x
    )
  
    if(second !== null) {
      return [first, second]
    }
  }

  return [NaN, NaN]
}

/**
 * 
 * @param arr 
 * @param evalFunction should return positive if hit before target,\
 * negative if after target, zero if matched
 */
function binaryFind<T>(arr: Array<T>, evalFunction: (x: T) => number): T | null {
  let left = 0
  let right = arr.length - 1

  while(right - left > 1) {
    const mid = Math.round((left + right) / 2)
    const midVal = arr[mid]

    const order = evalFunction(midVal)

    if(order === 0) {
      return midVal
    } else if(order < 0) {
      right = mid
    } else {
      left = mid
    }
  }

  return null
}
